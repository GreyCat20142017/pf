import React from 'react';

import OpenComplexButton from './OpenComplexButton';
import OpenSimpleButton from './OpenSimpleButton';

const OpenButton = (props) => (
  (Array.isArray(props.project.link)) ?
    <OpenComplexButton {...props}/> :
    <OpenSimpleButton {...props}/>
);

export default OpenButton;
