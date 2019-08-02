import React from 'react';
import DropDown from '../dropdown/DropDown';

const getHref = (id, isCurrentProject, IESupport) => ('#' + id + ((isCurrentProject || !IESupport) ? '-git' : '-open'));

const getLinksInfo = (projects) => (
  projects.map((project, ind) => ({
    href: getHref(project.id, project.isCurrentProject, project.IESupport),
    text: project.name.trim(),
    id: project.id
  })));

const firstLastLinks = (firstLink, lastLink) => (
  <ul className='nav nav-pills nav-pills-warning mt-1 p-1'>
    <li className='nav-item mr-1'>
      <a className='btn btn-warning'
         href={getHref(firstLink.id, firstLink.isCurrentProject, firstLink.IESupport)}>Первый</a>
    </li>
    <li className='nav-item'>
      <a className='btn btn-warning'
         href={getHref(lastLink.id, lastLink.isCurrentProject, lastLink.IESupport)}>Последний</a>
    </li>
  </ul>
);

const Navigation = ({projects}) => (
  <div className='row justify-content-center flex-wrap'>
    <DropDown data={getLinksInfo(projects)}
              ariaInfo={'project-dropdown'}
              togglerText={'Перейти к проекту из текущего списка ...'}
              css={{
                togglerCss: 'btn btn-warning dropdown-toggle',
                linkCss: 'dropdown-item w-100'
              }}/>
    {(projects.length >= 2) ?
      firstLastLinks(projects[0], projects[projects.length - 1]) : null}
  </div>
);

export default Navigation;
