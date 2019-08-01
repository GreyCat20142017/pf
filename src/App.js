import React, { Component } from 'react';

import pfdata from './pfdata';
import personal from './personal';
import {getOrderById, isMatch, createFilterPositionByData, getCurrentFilterState, filterOperations, fliterResetOn} from './functions';

import Header from './components/header/Header';
import Filter from './components/filter/Filter';
import ProjectList from './components/ProjectList';
import Footer from './components/footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.projects = pfdata.slice().filter(item => !item.hidden).sort((left, right) => getOrderById(left, right));
    this.filterPositions = createFilterPositionByData(this.projects, 'details');
    this.state = {
      filterStates: this.filterPositions.map(item => false),
      filterOperation : filterOperations.ONLY
    };
  }

  toggle = (ind) => (e) =>  {
    const {filterStates} = this.state;
    let newStates = [...filterStates];
    e.preventDefault();
    if (this.state.filterOperation === fliterResetOn) {
      newStates = filterStates.map((item, index) => (index === ind));
    } else {
      newStates[ind] = !newStates[ind];
    };
    this.setState({ filterStates: newStates});
  }

  resetFilter = () => (e) =>  {
    e.preventDefault();
    const newStates = this.state.filterStates.map(item => false);
    this.setState({filterStates: newStates});
  }

  changeOperation = (operation) => {
    this.setState({filterOperation : operation});
  }

  render() {
     const currentFilter = getCurrentFilterState(this.filterPositions, this.state.filterStates);
     const {filterStates, filterOperation} = this.state;
     const projects = this.projects.filter(
      project => (currentFilter.length === 0 ? true : isMatch(currentFilter, project.details, filterOperation))
     );

      return (
        <div className='container w-100'>

          <ErrorBoundary pfstatic={personal.pfstatic}>
            <Header data={personal}/>
          </ErrorBoundary>

          <ErrorBoundary pfstatic={personal.pfstatic}>
            <Filter
              filterPositions = {this.filterPositions}
              filterStates = {filterStates}
              filterOperation = {filterOperation}
              toggle = {this.toggle}
              changeCondition = {this.changeCondition}
              resetFilter = {this.resetFilter}
              changeOperation = {this.changeOperation}
              />
            <ProjectList projects={projects}/>
          </ErrorBoundary>

          <Footer contacts={personal.contacts} nickname={personal.nickname}/>
        </div>
      )
  }

}

export default App;
