import React, {Component} from 'react'
import {getProjectOpenButtonClass} from '../functions';

export default class Project extends Component {
  render() {
    const {project} = this.props;
    const details = project.details.join(', ');
    return  (
      <div className='project card border-secondary h-100 shadow-lg' tab-index="0" style={{maxWidth: '300px'}}>
        <h2 className='project__name card-header text-center bg-light'>{project.name}</h2>

        <div className='project__buttons card-body h-100'>
          <p className='project__description text-center card-text py-2 px-2'> {project.description}</p>
          <a className='project__more' href='#' style={{minHeight: '258px'}}>
            <img className='project__frontside card-img-top shadow-sm' src={'./img/' + project.short_name + '@1x.jpg'} alt={project.name}/>
            <div className='project__backside'></div>
          </a>
          <p className='project__details text-center card-text py-3 px-2'> {details} </p>
          <p className='project__description text-center card-text py-0 px-2'> {project.about} </p>
        </div>

        <div className='project__buttons card-footer bg-transparent'>
          <a className={getProjectOpenButtonClass(project.isCurrentProject)} href={project.link}>Открыть</a>
          <a className='btn btn-outline-secondary btn-block' href={project.git}>Код на GitHub</a>
        </div>
      </div>
      )
  }
}