import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getDropdownDelay, getKeyCodes, getArrayFromObject} from '../functions';
import './Header.css';
import {sprite} from '../sprite'

const Title = (props) => (Title &&  <h4>{props.children}</h4>);
const Subtitle = (props) => (Subtitle &&  <p><small className='header__prolog'>{props.children}</small></p>);
const Info = (props) =>  (Info && 
	<div className ='header__person col-4 col-sm-4 col-md-2'>
		<div className='header__ava-wrapper card w-100 bg-light'>	
			<div className='header__nickname card-text text-right p-1'><small>{props.nickname}</small></div>
				<img className='header__ava card-img-top img-thumbnail img-responsive' src={'./img/ava.jpg'} alt='Аватарка'/>			
			
				<div className='header__name dropdown card-text text-right text-wrap p-1'>
			  <button className='btn btn-light btn-outline-warning text-secondary dropdown-toggle w-100' type='button' data-toggle='dropdown' 
			  	 onClick={props.switchDropdown} onBlur={props.blurDropdown} title='Контакты'>
			    {props.name}
			  </button>
			  <div className={'dropdown-menu shadow-lg ' + (props.isOpen ? 'show' : '')}>
			  		{getArrayFromObject(props.contacts).map(item => 
			  		 <a className='dropdown-item align-items-baseline' href={item.link} title={item.link} key={item.name}>
				  		<span>{sprite(item.icon, 14)}</span><span className='ml-2'>{item.name}</span>
				  	</a>)}				  
				  	<div className='dropdown-divider'></div>
				  	<button className='dropdown-item modal-open-button font-weight-italic' title='Открыть модальное окно с контактными данными' onClick={props.switchModal}>Все данные</button>
			  </div>	
		  </div>
		</div>				
	</div>
);

const ContactList = (props) => {
	const items = Array.isArray(props.items) ? this.props.items : getArrayFromObject(props.items);
	return (
		<ul className='list-group'>
			{items.map((item, ind) => 
			<li className='list-group-item list-group-item-light d-flex justify-content-between' key={ind}>
				<span>{item.type+': '}</span>
				<a href={item.link}  onKeyDown={props.onModalEscEvent}>			
					{item.name}
				</a>
			</li>)}
		</ul>);
}

const Modal = (props) =>  (Modal && 
<div className='modal ' style={{'display': (props.modalIsOpen ? 'block' : 'none'), 'backgroundColor': 'rgba(0, 0, 0, 0.7)'}}  
	onKeyDown={props.onModalEscEvent}>
  <div className='modal-dialog' role='document'>
    <div className='modal-content'>
      <div className='modal-header'>
        <div className='modal-title'>Контактные данные</div>
        <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={props.switchModal}>
          <span aria-hidden='true'>×</span>
        </button>
      </div>
      <div className='modal-body'>
      	<ContactList items={props.contacts} onModalEscEvent={props.onModalEscEvent}/>
      </div>
      <p className='modal-footer'>
        <button className='modal-close-button btn btn-secondary' onClick={props.switchModal} ref={props.rr}>Закрыть</button>
      </p>
    </div>
  </div>
</div>);

export default class Header extends Component {	
	static Title = Title;
	static Subtitle = Subtitle;
	static Info = Info;
	static Modal = Modal;

	static defaultProps = {
    aboutIsCollapsed: true,
    allIsCollapsed: false
  };

	constructor(props) {
		super(props);
		this.state = {aboutIsCollapsed: this.props.aboutIsCollapsed, allIsCollapsed: this.props.allIsCollapsed, dropIsOpen: false, modalIsOpen: false};	
		this.selectRef = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if (this.state.modalIsOpen) {			
			ReactDOM.findDOMNode(this.selectRef).focus();
		}
	}

	getRef = (node) => {
		this.selectRef = node
	}
	
	switchDropdown = () => {
		this.setState({dropIsOpen: !this.state.dropIsOpen});
	}

	blurDropdown = (evt) => {		
		setTimeout(() => this.setState({dropIsOpen: false}), getDropdownDelay());				
	}

	switchModal = () => {
		this.setState({modalIsOpen: !this.state.modalIsOpen});

	}

	onDropEscEvent = (evt) => {		
  	if (evt.keyCode === getKeyCodes().Esc && this.state.dropIsOpen) {
  		evt.preventDefault();
		  this.setState({dropIsOpen: false});
		}  
	}

	onModalEscEvent = (evt) => {				
  	if (evt.keyCode === getKeyCodes().Esc && this.state.modalIsOpen) {  		
		  this.setState({modalIsOpen: false});
		}  
	}

	onAboutButtonClick = () => {
		this.setState({aboutIsCollapsed: !this.state.aboutIsCollapsed});
	}

	onAllButtonClick = () => {
		this.setState({allIsCollapsed: !this.state.allIsCollapsed});
	}

	render () {
		const {title, subtitle, about, name, nickname, contacts} = this.props.data;
		const {allIsCollapsed, aboutIsCollapsed, dropIsOpen, modalIsOpen} = this.state;
		const aboutSwitcherText = aboutIsCollapsed ? 'Развернуть подробности...' : 'Свернуть подробности...';
		const headerSwitcherStyle = 'header__switcher btn btn-warning btn-sm ' + (allIsCollapsed ? 'btn-block' : 'p-2');
		return (
		<header className='header bg-light shadow-sm px-2' onKeyDown={this.onDropEscEvent}>			
			<h4 className='header__title text-center'>{title}</h4>
			<div className='header__wrapper py-1 my-1'>
			<button className={headerSwitcherStyle} onClick={this.onAllButtonClick} 
				title={allIsCollapsed ? 'Развернуть весь заголовок...' : 'Свернуть весь заголовок...'}>
			  {allIsCollapsed ? 'Развернуть весь скрытый заголовок портфолио...' : ''}
			</button>
			<div className={'header__ content row text-align-center ' + (allIsCollapsed ? 'collapse' : '')}>
				<Info name={name} nickname={nickname} contacts={contacts} isOpen={dropIsOpen} 
					switchDropdown={this.switchDropdown} blurDropdown={this.blurDropdown} switchModal={this.switchModal}/>	
				<div className='header__info col-8 col-sm-8 col-md-10'>						
					<Subtitle>{subtitle}</Subtitle>
					<p className='header__text text-muted mt-3'>					
						<small className={'header__about '+(aboutIsCollapsed ? 'collapse' : '')} id='collapse'>{about}</small>						
						<button className='header__about-switcher btn btn-sm btn-outline-secondary' 
							onClick={this.onAboutButtonClick} title={aboutSwitcherText}>{aboutSwitcherText}
						</button>
					</p>		
				</div>
				</div>
			</div> 
			<Modal modalIsOpen={modalIsOpen} contacts={contacts} switchModal={this.switchModal}  onModalEscEvent={this.onModalEscEvent} rr={this.getRef}/>
		</header>  
		)
	}
}
