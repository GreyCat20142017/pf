import React from 'react';

import GitComplexButton from './GitComplexButton';
import GitSimpleButton from './GitSimpleButton';

const GitButton = ({project}) => (
  (Array.isArray(project.git)) ?
    <GitComplexButton project={project}/> :
    <GitSimpleButton project={project}/>
);

export default GitButton;
