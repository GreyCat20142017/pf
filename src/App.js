import React, {Component} from 'react';

import pfdata from './pfdata';
import personal from './personal';
import {getOrderById, isMatch, createFilterPositionByData, getCurrentFilterState} from './functions';
import {sprite} from './sprite';

import Header from './components/header/Header';
import Filter from './components/filter/Filter';
import ProjectList from './components/projectlist/ProjectList';
import Footer from './components/footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.min.css';
import {FILTER_OPERATIONS, FILTER_RESET_ON} from './constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.projects = pfdata.slice().filter(item => !item.hidden).sort((left, right) => getOrderById(left, right));
    this.filterPositions = createFilterPositionByData(this.projects, 'details');
    this.state = {
      filterStates: this.filterPositions.map(item => false),
      filterOperation: FILTER_OPERATIONS.ONLY
    };
  }

  toggle = (ind) => () => {
    const {filterStates} = this.state;
    let newStates = [...filterStates];
    if (this.state.filterOperation === FILTER_RESET_ON) {
      newStates = filterStates.map(item => false);
      newStates[ind] = !filterStates[ind];
    } else {
      newStates[ind] = !newStates[ind];
    }
    this.setState({filterStates: newStates});
  };

  resetFilter = () => {
    const newStates = this.state.filterStates.map(item => false);
    this.setState({filterStates: newStates});
  };

  changeOperation = (operation) => {
    this.setState({filterOperation: operation});
  };

  render() {
    const {filterStates, filterOperation} = this.state;
    const currentFilter = getCurrentFilterState(this.filterPositions, filterStates);
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
            filterPositions={this.filterPositions}
            filterStates={filterStates}
            filterOperation={filterOperation}
            toggle={this.toggle}
            changeCondition={this.changeCondition}
            resetFilter={this.resetFilter}
            changeOperation={this.changeOperation}
          />
          <ProjectList projects={projects}/>
        </ErrorBoundary>

        <Footer contacts={personal.contacts} nickname={personal.nickname}/>

        <a className='btn-warning shadow fab fab--up' href='#header' title='К заголовку'>
          {sprite('up', 40, 40, 'darkgrey')}
        </a>
        <a className='btn-warning shadow fab fab--down' href='#footer' title='К подвалу'>
          {sprite('down', 40, 40, 'darkgrey')}
        </a>
      </div>
    );
  }
}

export default App;
