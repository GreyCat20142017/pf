import React from 'react';
import {getLastChain} from '../../functions';
import DropDown from '../dropdown/DropDown';

const itemsWrapper = (text) => (`Код на Github (${getLastChain(text)})`);

const GitComplexButton = ({project}) => (
  <DropDown data={project.git.map((item, ind) => ({href: item, text: itemsWrapper(item), id: ind}))}
            ariaInfo={project.id + '-git'} togglerText={'Код на Github'}
            css={{
              togglerCss: 'project__button btn btn-outline-secondary btn-block dropdown-toggle',
              linkCss: 'project__button w-100 btn btn-link'
            }}
  />
);

export default GitComplexButton;
