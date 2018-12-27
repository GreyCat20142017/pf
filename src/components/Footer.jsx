import React from 'react';

import {sprite} from '../sprite';
import {getArrayFromObject} from '../functions';

const Footer = ({nickname, contacts}) => (
  <footer className='footer row d-flex flex-wrap justify-content-center pt-4 pb-2'>
      <ul className='footer__contacts justify-content-center d-flex flex-wrap list-unstyled' >
        {getArrayFromObject(contacts).map(item => (
          <li className='footer__contact' style={{margin: '0 2px'}} key={item.name}>
           <a className='footer__link btn btn-secondary'
              style={{borderRadius: '50%', padding: '4px 9px 6px'}}
              href={item.link} title={item.link}          >
                <span className='footer__icon'>{sprite(item.icon, 16, 'white')}</span>
                <span className='footer__type visually-hidden'>{item.type}</span>
            </a>
            </li>))}
      </ul>
  </footer>
)

export default Footer;
