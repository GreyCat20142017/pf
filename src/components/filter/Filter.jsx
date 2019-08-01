import React, {Component} from 'react';
import {getToggledButtonClass, filterOperations, getArrayFromObject} from '../../functions';
import FilterCategories from './FilterCategories';
import FilterControls from './FilterControls';

export default class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {isDropOpen: false};
  }

  switchDrop = () => {
    this.setState({isDropOpen: !this.state.isDropOpen});
  };

  onChangeOperation = (operation) => {
    this.setState((state) => ({isDropOpen: false}));
    this.props.changeOperation(operation);
  };

  render() {
    const {filterPositions, filterStates, filterOperation, toggle, resetFilters} = this.props;
    const dropOpenedClass = this.state.isDropOpen ? ' show ' : '';
    const operations = getArrayFromObject(filterOperations);

    return (
      <div className='filter py-2 py-md-3 my-2 my-md-1'>

        <FilterCategories filterPositions={filterPositions} filterStates={filterStates} toggle={toggle}/>

        <FilterControls filterOperation={filterOperation} operations={operations} dropOpenedClass={dropOpenedClass}
                        onChangeOperation={this.onChangeOperation} resetFilters={resetFilters}
                        switchDrop={this.switchDrop}/>
      </div>
    );
  }
}
