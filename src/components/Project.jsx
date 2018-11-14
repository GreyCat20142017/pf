import React, {Component} from 'react'
import {getProjectOpenButtonClass} from '../functions';
import './Project.css';

export default class Project extends Component {

  render() {
    const {project} = this.props;
    const details = project.details.join(', ');
    const revertHeight = 258;
    return  (
      <div className='project card border-secondary h-100 shadow-lg' tab-index='0' style={{maxWidth: '310px'}}>
        <h2 className='project__name card-header text-center bg-light'>{project.name}</h2>

        <div className='project__body card-body h-100'>
          <p className='project__description text-center card-text font-weight-bold'>{project.description}</p>
          <a className='project__more justify-content-center' href='#' style={{height: revertHeight + 'px'}}>
            <img className='project__frontside card-img-top img-thumbnail shadow-sm mb-3' src={'./img/' + project.shortName + '@1x.jpg'} alt={project.name} style={{height: revertHeight + 'px'}}/>
            <div className='project__backside shadow-sm mb-3' style={{height: revertHeight + 'px'}}>
                <p>{project.info}</p>
                <p className='font-weight-bold'>{'Поддержка IE-11: '+ (project.IE ? 'да' : 'нет')}</p>
                <p className='font-weight-bold'>{'Адаптивность: '+ (project.adaptive ? 'да' : 'нет')}</p>
            </div>
          </a>
          <h6 className='project__details text-center card-header my-2'> {details} </h6>
          <p className='project__description text-center card-text my-0'> {project.about} </p>
        </div>

        <div className='project__buttons card-footer bg-transparent'>
          <a className={getProjectOpenButtonClass(project.isCurrentProject)} href={project.link}>Открыть</a>
          <a className='btn btn-outline-secondary btn-block' href={project.git}>Код на GitHub</a>
        </div>
      </div>
      )
  }
}