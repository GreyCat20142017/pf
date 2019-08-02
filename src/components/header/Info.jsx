import React from 'react';
import {getArrayFromObject} from '../../functions';
import {sprite} from '../../sprite';

const Info = (props) => (Info &&
  <div className='header__person' style={{width: '120px', flexShrink: '0'}}>
    <div className='header__ava-wrapper card w-100 bg-transparent'>
      <div className='header__nickname card-text text-center p-1'><small>{props.nickname}</small></div>

      <img className='header__ava card-img-center img-thumbnail bg-transparent mx-auto' width="100" height="100"
           src={'./img/svg/ava.svg'} alt='Аватарка'/>

      <div className='header__name dropdown card-text text-center text-wrap p-1'>

        <button className='header__toggle btn btn-outline-warning text-secondary dropdown-toggle w-100' type='button'
                data-toggle='dropdown'
                onClick={props.switchDropdown} onBlur={props.blurDropdown} title='Контакты'>
          <small>{props.name}</small>
        </button>

        <div className={'header__contacts dropdown-menu shadow-lg ' + (props.isOpen ? 'show' : '')}>
          {getArrayFromObject(props.contacts).map(item =>
            <a className='header__contact dropdown-item align-items-baseline' href={item.link} title={item.link}
               key={item.name}>
              <span className='header__icon'>{sprite(item.icon, 14)}</span><span className='ml-2'>{item.name}</span>
            </a>)}
          <div className='header__divider dropdown-divider'></div>
          <button className='header__modal-opener dropdown-item modal-open-button font-weight-italic'
                  title='Открыть модальное окно с контактными данными' onClick={props.switchModal}>Все данные
          </button>
        </div>

      </div>
    </div>
  </div>
);

export default Info;
