import React from 'react';
import FilterCategories from './FilterCategories';
import FilterControls from './FilterControls';

const Filter = ({filterPositions, filterStates, filterOperation, toggle, resetFilter, changeOperation}) => (

  <div className='filter py-2 py-md-3 my-2 my-md-1'>

    <FilterCategories filterPositions={filterPositions} filterStates={filterStates} toggle={toggle}/>
    <FilterControls filterOperation={filterOperation} onChangeOperation={changeOperation} resetFilter={resetFilter}/>

  </div>
);

export default Filter;
