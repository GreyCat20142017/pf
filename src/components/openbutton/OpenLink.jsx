import React from 'react';
import {getProjectOpenButtonClass} from '../../functions';

const OpenLink = ({id, isCurrentProject, linkref, inDev, IESupport, isIE}) => {
  return ((!IESupport && isIE) || linkref === '') ?
    (<button className={'project__button ' + getProjectOpenButtonClass(isCurrentProject)} type='button'
             disabled>
      {linkref === '' ? 'Не опубликован' : 'Не поддерживается в IE'}
    </button>)
    :
    (<a
        className={'project__button ' + getProjectOpenButtonClass(isCurrentProject)}
        href={linkref}
        id={id + '-open'}>
        {inDev ? 'Полуфабрикат' : 'Открыть'}
      </a>
    );
};

export default OpenLink;
