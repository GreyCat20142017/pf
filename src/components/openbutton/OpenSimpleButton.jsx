import React from 'react';
import OpenLink from './OpenLink';

const OpenSimpleButton = ({project, isIE}) => (
  <OpenLink {...project} linkref={project.link} isIE={isIE}/>
);

export default OpenSimpleButton;
