import React, {Component} from 'react'
import {getProjectOpenButtonClass} from '../functions';
import './Project.css';

const CARD_WIDTH = 310;
const CARD_HEADER_HEIGHT = 48;
const CARD_REVERT_HEIGHT = 258;

const OpenLink = (props) => {
  const {project, isIE} = props;
  return  ((!project.IESupport && isIE) || project.link === '') ?
    (<button className={'project__button ' + getProjectOpenButtonClass(project.isCurrentProject)} type='button' disabled>
      {project.link === '' ? 'Не опубликован' : 'Не поддерживается в IE'}
    </button>)
  :
    (<a
      className={'project__button ' + getProjectOpenButtonClass(project.isCurrentProject)}
      href={project.link}
      id={project.id + '-open'}>
      {project.inDev ? 'Полуфабрикат' : 'Открыть'}
    </a>
  )
};


export default class Project extends Component {
  static OpenLink = OpenLink;

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
    const {project, isIE} = this.props;
    const details = project.details.join(', ');
    const isForcedOpen = this.state.isForcedOpen;
    const revertStyle = {height: CARD_REVERT_HEIGHT + 'px'};

    return  (
      <div className='project card border-secondary h-100 shadow-lg' tab-index='0' style={{width: CARD_WIDTH + 'px'}}>
        <h2 className='project__name card-header text-center bg-light' title={project.description + ', '+project.details}>
          <small>{project.name}</small>
        </h2>

        <div className={'project__body card-body h-100' + (isForcedOpen ? '' : ' d-none d-md-block')}>
          <p className='project__description text-center card-text font-weight-bold' style={{minHeight: CARD_HEADER_HEIGHT + 'px'}}>
            {project.description}
          </p>
          <a className='project__more justify-content-center' href={'#'+project.id+'-open'} style={revertStyle}>

           <picture className='project__picture'>
            <source srcSet={'./img/webp/' + project.shortName + '@1x.webp 1x, ./img/webp/' + project.shortName + '@2x.webp 2x'} type='image/webp'/>
            <img
              className='project__frontside card-img-top img-thumbnail shadow-sm mb-3'
              src={'./img/' + project.shortName + '@1x.jpg'}
              srcSet={'./img/' + project.shortName + '@2x.jpg'}
              alt={project.name}
              style={revertStyle}/>
            </picture>

            <div className='project__backside shadow-sm mb-3' style={revertStyle}>
                <p>{project.info}</p>
                <p className='project__specific font-weight-bold border'>{'Поддержка IE-11: '+ (project.IESupport ? 'да' : 'нет')}</p>
                <p className='project__specific font-weight-bold border'>{'Адаптивность: '+ (project.adaptive ? 'да' : 'нет')}</p>
            </div>
          </a>
          <h6 className='project__details card-header my-2 badge'> {details} </h6>
          <p className='project__description text-center card-text my-0'> {project.about} </p>
        </div>

        <div className='project__buttons card-footer bg-transparent'>
          <OpenLink project={project} isIE={isIE}/>
          <a
            className='project__button btn btn-outline-secondary btn-block'
            href={project.git}
            id={project.id+'-git'}>
            {'Код на GitHub'}
          </a>
          <button
            className='project__button btn btn-outline-secondary btn-block text-centerd-flex d-md-none'
            type='button'
            onClick={this.switchOpenState}
            title = {(isForcedOpen ? 'Свернуть' : 'Развернуть') + ' блок с подробной информацией и скриншотом'}>
            {isForcedOpen ? 'Свернуть' : 'Развернуть'}
           </button>
        </div>
      </div>
      )
  }
}
