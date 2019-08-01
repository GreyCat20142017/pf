import React from 'react';

const GitSimpleButton = ({project}) => (
  <a className='project__button btn btn-outline-secondary btn-block'
     href={project.git}
     id={project.id + '-git'}>
    {'Код на GitHub'}
  </a>);

export default GitSimpleButton;
