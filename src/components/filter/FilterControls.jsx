import React from 'react';

const FilterControls = ({operations, filterOperation, dropOpenedClass,
                          resetFilters, switchDrop, onChangeOperation}) => (
  <div className='filter__controls row justify-content-center flex-wrap pt-2'>
    <button
      className='filter__reset btn btn-sm btn-warning ml-2 mt-1'
      type='button'
      onClick={resetFilters}>
      {'Сбросить'}
    </button>

    <div className='dropdown mt-1'>
      <button className='btn btn-secondary dropdown-toggle btn-sm ml-2' type='button' id='dropdowOperation'
              data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onClick={switchDrop}>
        {filterOperation}
      </button>
      <div className={'dropdown-menu' + dropOpenedClass} aria-labelledby='dropdowOperation'>
        {operations.map((operation, ind) =>
          (<button className='dropdown-item' type='button' key={ind}
                   onClick={() => onChangeOperation(operation)}>
            {operation}
          </button>)
        )}
      </div>
    </div>
  </div>
);

export default FilterControls;
