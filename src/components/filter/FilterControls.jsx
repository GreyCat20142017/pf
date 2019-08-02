import React from 'react';
import DropDown from '../dropdown/DropDown';
import {FILTER_OPERATIONS} from '../../constants';

const getOperationInfo = (operations) =>  {
   const keys = [...Object.keys(operations)];
    return keys.map(key => ({
      key: key,
      text: operations[key],
      link: key
    }));
  };

const FilterControls = ({filterOperation,  resetFilter,  onChangeOperation}) => (
  <div className='filter__controls row justify-content-center  align-items-center flex-wrap pt-2'>
    <button className='filter__reset btn btn-warning mt-2'
      type='button' onClick={resetFilter}>
      {'Сбросить'}
    </button>

    <div className='dropdown mt-1'>
      <DropDown data={getOperationInfo(FILTER_OPERATIONS)}
                ariaInfo={'operation-dropdown'}
                togglerText={filterOperation} callback={onChangeOperation}
                css={{
                  togglerCss: 'btn btn-warning dropdown-toggle',
                  linkCss: 'dropdown-item w-100'
                }}/>
    </div>
  </div>
);

export default FilterControls;
