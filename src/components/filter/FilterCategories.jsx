import {getToggledButtonClass} from '../../functions';
import React from 'react';

const FilterCategories = ({filterPositions, filterStates, toggle}) => (
  <div className='filter__category row justify-content-center flex-wrap'>
    {filterPositions.map((item, ind) =>
      <button
        className={getToggledButtonClass(filterStates[ind])}
        type='button'
        key={item}
        id={ind}
        onClick={toggle(ind)}>
        {item}
      </button>
    )}
  </div>
);

export default FilterCategories;
