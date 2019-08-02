import React from 'react';
import {getArrayFromObject} from '../../functions';

const ContactList = (props) => {
  const items = Array.isArray(props.items) ? this.props.items : getArrayFromObject(props.items);
  return (
    <ul className='list-group'>
      {items.map((item, ind) =>
        <li className='list-group-item list-group-item-light d-flex justify-content-between' key={ind}>
          <span>{item.type + ': '}</span>
          <a href={item.link} onKeyDown={props.onModalEscEvent}>
            {item.name}
          </a>
        </li>)}
    </ul>);
};

const Modal = (props) => (Modal &&
  <div className='modal '
       style={{'display': (props.modalIsOpen ? 'block' : 'none'), 'backgroundColor': 'rgba(0, 0, 0, 0.7)'}}
       onKeyDown={props.onModalEscEvent}>
    <div className='modal-dialog' role='document'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-title'>Контактные данные</div>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={props.switchModal}>
            <span aria-hidden='true'>×</span>
          </button>
        </div>
        <div className='modal-body'>
          <ContactList items={props.contacts} onModalEscEvent={props.onModalEscEvent}/>
        </div>
        <p className='modal-footer'>
          <button className='modal-close-button btn btn-secondary' onClick={props.switchModal} ref={props.rr}>Закрыть
          </button>
        </p>
      </div>
    </div>
  </div>);

export default Modal;
