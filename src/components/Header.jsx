import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getDropdownDelay, getKeyCodes, getArrayFromObject} from '../functions';

import {sprite} from '../sprite'

import About from './About'
import './Header.css';

const Title = (props) => (Title &&  <h4>{props.children}</h4>);
const Subtitle = (props) => (Subtitle &&  <p><small className='header__prolog'>{props.children}</small></p>);
const Info = (props) =>  (Info && 
	<div className ='header__person col-4 col-md-3 col-lg-2'>
		<div className='header__ava-wrapper card w-100 bg-transparent'>	
			<div className='header__nickname card-text text-center p-1'><small>{props.nickname}</small></div>
				<img className='header__ava card-img-top img-thumbnail img-responsive bg-transparent' width="90" height="100" src={'./img/svg/ava.svg'} alt='Аватарка'/>			
			
				<div className='header__name dropdown card-text text-center text-wrap p-1'>
				  <button className='header__toggle btn btn-outline-warning text-secondary dropdown-toggle w-100' type='button' data-toggle='dropdown' 
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
		this.state = {allIsCollapsed: this.props.allIsCollapsed, dropIsOpen: false, modalIsOpen: false};	
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

	onAllButtonClick = () => {
		this.setState({allIsCollapsed: !this.state.allIsCollapsed});
	}

	render () {
		const {title, subtitle, about, name, nickname, contacts} = this.props.data;
		const {allIsCollapsed, dropIsOpen, modalIsOpen} = this.state;		
		const headerSwitcherStyle = 'header__switcher btn btn-warning btn-sm ' + (allIsCollapsed ? 'btn-block' : 'p-2');	

		return (
		<header className='header shadow-sm px-2' onKeyDown={this.onDropEscEvent}>			
			<h4 className='header__title text-center my-3'>{title}</h4>
			<div className='header__wrapper py-1 my-1'>
			<button 
				className={headerSwitcherStyle} 
				onClick={this.onAllButtonClick} 
				title={allIsCollapsed ? 'Развернуть весь заголовок...' : 'Свернуть весь заголовок...'}>
			  {allIsCollapsed ? 'Развернуть весь скрытый заголовок портфолио...' : ''}
			</button>

			<div className={'header__content row text-align-center ' + (allIsCollapsed ? 'collapse' : '')}>
				<Info 
					name={name} 
					nickname={nickname} 
					contacts={contacts} 
					isOpen={dropIsOpen} 
					switchDropdown={this.switchDropdown} 
					blurDropdown={this.blurDropdown} 
					switchModal={this.switchModal}/>	

				<div className='header__info col-8 col-md-7 col-lg-10'>						
					<Subtitle>{subtitle}</Subtitle>
					<About about={about}/>	
				</div>

				</div>
			</div> 

			<Modal modalIsOpen={modalIsOpen} contacts={contacts} switchModal={this.switchModal}  onModalEscEvent={this.onModalEscEvent} rr={this.getRef}/>
		</header>  
		)
	}
}
