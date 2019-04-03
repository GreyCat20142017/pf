import React, {Component} from 'react'
import Project from './Project'
import {getCurrentProjectClass, getDropdownDelay, getKeyCodes, getIsIECheckResult} from '../functions';

const isIE = getIsIECheckResult();
const getHref = (id, isCurrentProject, IESupport) => ('#' + id + ((isCurrentProject || !IESupport) ? '-git' : '-open'));
const projectsPerPage = 6;


const firstLastLinks = (firstLink, lastLink) => (
  <ul className='nav nav-pills nav-pills-warning m-1'>
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

const Navigation = (props) => (
  <div className='row justify-content-center flex-wrap'>
    <div className='dropdown m-1'>
      <button type='button' className='btn btn-warning dropdown-toggle' data-toggle='dropdown'
              onClick={props.switchDropdown} onBlur={props.blurDropdown} title='Быстрый переход'>
        Перейти к проекту из текущего списка ...
      </button>
      <div className={'dropdown-menu col-10 col-md-6 col-lg-4 mx-auto pt-4 shadow-lg ' + (props.isOpen ? 'show' : '')}>
        {props.projects.map(item =>
          <a className='dropdown-item' key={item.id}
             href={getHref(item.id, item.isCurrentProject, item.IESupport)}> {item.name} </a>
        )}
      </div>
    </div>
    {(props.projects.length >= 2) ?
      firstLastLinks(props.projects[0], props.projects[props.projects.length - 1]) : null}
  </div>
);

const Pagination = ({currentPage, totalPages, prevPage, nextPage}) => (
  <ul className='pagination pagination-sm justify-content-center'>
    <li className={'page-item ' + (currentPage === 1 ? 'disabled' : '')}>
      <button className='page-link mx-1' type='button' onClick={prevPage} title='Предыдущая страница'>Предыдущие</button>
    </li>
    <li className={'page-item ' + (currentPage === totalPages ? 'disabled' : '')}>
      <button className='page-link mx-1' type='button' onClick={nextPage} title='Следующая страница'>Следующие</button>
    </li>
  </ul>
);

export default class ProjectList extends Component {
  static Navigation = Navigation;
  static Pagination = Pagination;

  constructor (props) {
    super(props);
    this.state = {
      dropIsOpen: false,
      currentPage: 1,
      totalPages: Math.ceil(this.props.projects.length / projectsPerPage)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      dropIsOpen: false,
      currentPage: 1,
      totalPages: Math.ceil(nextProps.projects.length / projectsPerPage)
    });
  }

  switchDropdown = () => {
    this.setState({dropIsOpen: !this.state.dropIsOpen});
  }


  prevPage = (evt) => {
    evt.preventDefault();
    if (this.state.currentPage > 1) {
      const newCurrent = this.state.currentPage - 1;
      this.setState({currentPage: newCurrent});
    }
  }

  nextPage = (evt) => {
    evt.preventDefault();
    if (this.state.currentPage < this.state.totalPages) {
      const newCurrent = this.state.currentPage + 1;
      this.setState({currentPage: newCurrent});
    }
  }


  onDropEscEvent = (evt) => {
    if (evt.keyCode === getKeyCodes().Esc && this.state.dropIsOpen) {
      evt.preventDefault();
      this.setState({dropIsOpen: false});
    }
  }

  blurDropdown = (evt) => {
    setTimeout(() => this.setState({dropIsOpen: false}), getDropdownDelay());
  }

  render () {
    const {currentPage, totalPages} = this.state;
    const projects = this.props.projects.length > projectsPerPage ?
      this.props.projects.slice((currentPage - 1) * projectsPerPage, (currentPage - 1) * projectsPerPage + projectsPerPage) :
      this.props.projects;
    const content =
      <div className='projects__list' onKeyDown={this.onDropEscEvent}>
        <Navigation projects={projects} isOpen={this.state.dropIsOpen}
                    switchDropdown={this.switchDropdown} blurDropdown={this.blurDropdown}/>
        <ul className='projects__items row d-flex justify-content-start mx-auto list-unstyled'>
          {projects.map(item =>
            <li key={item.id}
                className={'project__item d-flex justify-content-center ' + getCurrentProjectClass(item.isCurrentProject)}>
              <Project project={item} isIE={isIE}/>
            </li>)}
        </ul>
      </div>
    return (<div>
      {totalPages > 1 ? <Pagination totalPages={totalPages} currentPage={currentPage} nextPage={this.nextPage}
                                    prevPage={this.prevPage}/> : null}
      {(projects.length === 0) ?
        <p className='text-center mt-3'>Ничего не найдено. Вероятно, нужно проверить условия фильтра...</p> : content}
      {totalPages > 1 ? <Pagination totalPages={totalPages} currentPage={currentPage} nextPage={this.nextPage}
                                    prevPage={this.prevPage}/> : null}
    </div>)
  }
}
