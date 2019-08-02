import React from 'react';

const Pagination = ({currentPage, totalPages, prevPage, nextPage}) => (
  totalPages > 1 ?
  <ul className='pagination pagination-sm justify-content-center'>
    <li className={'page-item ' + (currentPage === 1 ? 'disabled' : '')}>
      <button className='page-link mx-1 py-1 btn-outline-secondary' type='button' onClick={prevPage} title='Предыдущая страница'>Предыдущие</button>
    </li>
    <li className={'page-item ' + (currentPage === totalPages ? 'disabled' : '')}>
      <button className='page-link mx-1 py-1  btn-outline-secondary' type='button' onClick={nextPage} title='Следующая страница'>Следующие</button>
    </li>
  </ul> :
    null
);

export default Pagination;
