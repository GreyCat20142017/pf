import React, {Component} from 'react';
import './Header.css';

const Title = (props) => (Title &&  <h4>{props.children}</h4>);
const Subtitle = (props) => (Subtitle &&  <small className='header__prolog'>{props.children}</small>);
const Ava = (props) => (Ava && 
	<div className ='header__person col-4 col-sm-4 col-md-2'>
		<div className='header__ava-wrapper card w-100'>	
			<div className='header__nickname card-header text-right p-1'><small>{props.nickname}</small></div>
			<img className='header__ava card-img-top img-thumbnail img-responsive' src={'./img/ava.jpg'} alt='Аватарка'/>			
			<div className='header__name card-footer text-right p-1'><small>{props.name}</small></div>
		</div>				
	</div>
);

export default class Header extends Component {	
	static Title = Title;
	static Subtitle = Subtitle;
	static Ava = Ava;

	static defaultProps = {
    aboutIsCollapsed: true,
    allIsCollapsed: false
  };

	constructor(props) {
		super(props);
		this.state = {aboutIsCollapsed: this.props.aboutIsCollapsed, allIsCollapsed: this.props.allIsCollapsed};
	}
	
	onAboutButtonClick = () => {
		this.setState({aboutIsCollapsed: !this.state.aboutIsCollapsed});
	}

	onAllButtonClick = () => {
		this.setState({allIsCollapsed: !this.state.allIsCollapsed});
	}

	render () {
		const {title, subtitle, about, name, nickname} = this.props.data;
		const {allIsCollapsed, aboutIsCollapsed} = this.state;
		const aboutSwitcherText = aboutIsCollapsed ? 'Развернуть подробности...' : 'Свернуть подробности...';
		const headerSwitcherStyle = 'header__switcher btn btn-warning btn-sm ' + (allIsCollapsed ? 'btn-block' : 'p-2');
		return (
		<div className='header'>			
			<h4 className='header__title text-center'>{title}</h4>
			<div className='header__wrapper py-1 my-1'>
			<button className={headerSwitcherStyle} onClick={this.onAllButtonClick} 
				title={allIsCollapsed ? 'Развернуть весь заголовок...' : 'Свернуть весь заголовок...'}>
			  {allIsCollapsed ? 'Развернуть весь скрытый заголовок портфолио...' : ''}
			</button>
			<div className={'header__ content row text-align-center ' + (allIsCollapsed ? 'collapse' : '')}>
				<Ava name={name} nickname={nickname}/>	
				<div className='header__info col-8 col-sm-8 col-md-10'>	
					
					<Subtitle>{subtitle}</Subtitle>
					<p className='header__text text-muted mt-3'>					
						<small className={'header__about '+(aboutIsCollapsed ? 'collapse' : '')} id='collapse'>{about}</small>						
						<button className='header__about-switcher btn btn-sm btn-outline-secondary' onClick={this.onAboutButtonClick} title={aboutSwitcherText}>{aboutSwitcherText}</button>
					</p>		
				</div>
				</div>
			</div> 
		</div>  
		)
	}
}

