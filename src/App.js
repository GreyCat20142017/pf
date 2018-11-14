import React, { Component } from 'react';
import pfdata from './pfdata';
import personal from './personal';
import {getOrderById, isMatch, createFilterPositionByData, getCurrentFilterState} from './functions';
import ProjectList from './components/ProjectList';
import Header from './components/Header';
import Filter from './components/Filter';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.projects = pfdata.slice().sort((left, right) => getOrderById(left, right));
    this.filterPositions = createFilterPositionByData(this.projects, 'details');
    this.state = {filterStates: this.filterPositions.map(item => false), isFilterConjunction: false};
  }

  toggle = (ind) => (e) =>  {
    e.preventDefault();
    const newStates = this.state.filterStates.slice();
    newStates[ind] = !newStates[ind];
    this.setState({ filterStates: newStates});
  };

  changeCondition = () => (e) =>  {
    e.preventDefault();  
    this.setState({ isFilterConjunction: !this.state.isFilterConjunction});
  };

  resetFilter = () => (e) =>  {
    e.preventDefault();  
    const newStates = this.state.filterStates.map(item => false);
    this.setState({filterStates: newStates, isFilterConjunction: false});
  };

  render() {
   const currentFilter = getCurrentFilterState(this.filterPositions, this.state.filterStates); 
   const projects = this.projects.filter(project => (currentFilter.length === 0 ? true : isMatch(currentFilter, project.details, this.state.isFilterConjunction)));   

    return (     
      <div className="container">
        <Header data={personal}/>
        <Filter filterPositions = {this.filterPositions} filterStates = {this.state.filterStates}  isFilterConjunction = {this.state.isFilterConjunction}
          toggle = {this.toggle} changeCondition = {this.changeCondition} resetFilter = {this.resetFilter}/>
        }
        <ProjectList projects={projects}/>       
      </div>
      )
  }
}

export default App;
