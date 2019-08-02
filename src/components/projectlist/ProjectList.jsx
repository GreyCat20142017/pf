import React, {Component} from 'react';
import Project from '../project/Project';
import Navigation from './Navigation';
import Pagination from './Pagination';

import {getCurrentProjectClass, getIsIECheckResult} from '../../functions';
import {PROJECTS_PER_PAGE} from '../../constants';

const isIE = getIsIECheckResult();

const ProjectListContent = ({projects}) => (
  <div className='projects__list'>
    <Navigation projects={projects}/>
    <ul className='projects__items row d-flex justify-content-start mx-auto list-unstyled'>
      {projects.map(item =>
        <li key={item.id}
            className={'project__item d-flex justify-content-center ' + getCurrentProjectClass(item.isCurrentProject)}>
          <Project project={item} isIE={isIE}/>
        </li>)}
    </ul>
  </div>
);

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: Math.ceil(this.props.projects.length / PROJECTS_PER_PAGE)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: 1,
      totalPages: Math.ceil(nextProps.projects.length / PROJECTS_PER_PAGE)
    });
  }

  prevPage = (evt) => {
    evt.preventDefault();
    if (this.state.currentPage > 1) {
      const newCurrent = this.state.currentPage - 1;
      this.setState({currentPage: newCurrent});
    }
  };

  nextPage = (evt) => {
    evt.preventDefault();
    if (this.state.currentPage < this.state.totalPages) {
      const newCurrent = this.state.currentPage + 1;
      this.setState({currentPage: newCurrent});
    }
  };

  render() {
    const {currentPage, totalPages} = this.state;
    const projects = this.props.projects.length > PROJECTS_PER_PAGE ?
      this.props.projects.slice((currentPage - 1) * PROJECTS_PER_PAGE, (currentPage - 1) * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE) :
      this.props.projects;

    return (
      (projects.length === 0) ?
        <p className='text-center mt-3'>Ничего не найдено. Вероятно, нужно проверить условия фильтра...</p>
        :
        <React.Fragment>
          <Pagination totalPages={totalPages} currentPage={currentPage} nextPage={this.nextPage}
                      prevPage={this.prevPage}/>
          <ProjectListContent projects={projects}/>
          <Pagination totalPages={totalPages} currentPage={currentPage} nextPage={this.nextPage}
                      prevPage={this.prevPage}/>
        </React.Fragment>
    );
  }
}
