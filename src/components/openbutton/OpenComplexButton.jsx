import React from 'react';
import {getLastChain} from '../../functions';
import DropDown from '../dropdown/DropDown';

const getSubProject = (text) => (`${getLastChain(text.slice(0, -1))}`);

const OpenComplexButton = ({project}) => (
  <DropDown data={project.link.map((item, ind) => ({href: item, text: getSubProject(item), id: ind}))}
            ariaInfo={project.id + '-open'} togglerText={'Открыть'}
            css={{
              togglerCss: 'project__button btn btn-outline-secondary btn-block dropdown-toggle',
              linkCss: 'project__button w-100 btn btn-link'
            }}
  />
);

export default OpenComplexButton;
