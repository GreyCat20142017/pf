import React, {Component} from 'react'
import {getProjectOpenButtonClass} from '../functions';
import './Project.css';

export default class Project extends Component {

  static defaultProps = {
    isForcedOpen: false      
  };

  constructor(props) {
    super(props);
    this.state = {isForcedOpen: this.props.isForcedOpen};
  }

  switchOpenState = () => {
    this.setState({isForcedOpen: !this.state.isForcedOpen});
  }

  render() {
    const {project} = this.props;
    const details = project.details.join(', ');
    const revertHeight = 258;
    const isForcedOpen = this.state.isForcedOpen;
 
    return  (
      <div className='project card border-secondary h-100 shadow-lg' tab-index='0' style={{maxWidth: '310px'}}>
        <h2 className='project__name card-header text-center bg-light' title={project.description + ', '+project.details}>{project.name}</h2>

        <div className={'project__body card-body h-100' + (isForcedOpen ? '' : ' d-none d-md-block')}>
          <p className='project__description text-center card-text font-weight-bold'>{project.description}</p>
          <a className='project__more justify-content-center' href={'#'+project.id+'-open'} style={{height: revertHeight + 'px'}}>
            <img className='project__frontside card-img-top img-thumbnail shadow-sm mb-3' src={'./img/' + project.shortName + '@1x.jpg'} alt={project.name} style={{height: revertHeight + 'px'}}/>
            <div className='project__backside shadow-sm mb-3' style={{height: revertHeight + 'px'}}>
                <p>{project.info}</p>
                <p className='font-weight-bold border'>{'Поддержка IE-11: '+ (project.IE ? 'да' : 'нет')}</p>
                <p className='font-weight-bold border'>{'Адаптивность: '+ (project.adaptive ? 'да' : 'нет')}</p>
            </div>
          </a>
          <h6 className='project__details card-header my-2 badge'> {details} </h6>
          <p className='project__description text-center card-text my-0'> {project.about} </p>
        </div>

        <div className='project__buttons card-footer bg-transparent'>
          <a className={getProjectOpenButtonClass(project.isCurrentProject)} href={project.link} id={project.id+'-open'}>Открыть</a>
          <a className='btn btn-outline-secondary btn-block' href={project.git} id={project.id+'-git'}>Код на GitHub</a>
          <button className='btn btn-outline-secondary btn-block text-centerd-flex d-md-none' type='button' onClick={this.switchOpenState}
          title = {(isForcedOpen ? 'Свернуть' : 'Развернуть') + ' блок с подробной информацией и скриншотом'}>
          {isForcedOpen ? 'Свернуть' : 'Развернуть'}</button>
        </div>
      </div>
      )
  }
}