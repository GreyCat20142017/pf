import React, {Component} from 'react'
import Project from './Project'
import {getCurrentProjectClass} from '../functions';

const dropdownDelay = 444;

const Navigation = (props) => (
	 <div className='row justify-content-center flex-wrap'>
			<div className='dropdown'>
			  <button type='button' className='btn btn-warning dropdown-toggle' data-toggle='dropdown' onClick={props.switchDropdown} onBlur={props.onBlur} title='Быстрый переход'>
			    Перейти к проекту из текущего списка ... 
			  </button>
			  <div className={'dropdown-menu ' + (props.isOpen ? 'show' : '')}>
			   	{props.projects.map(item => 
			   		<a key={item.id} className='dropdown-item' href={'#'+ item.id + (item.isCurrentProject ? '-git' : '-open')}> {item.name} </a>
			   	)}		   
			  </div>
			</div>
		</div>
);

export default class ProjectList extends Component {	
 static Navigation = Navigation;

	constructor(props) {
		super(props);
		this.state = {dropIsOpen: false, singleOne: null};
	}

	switchDropdown = () => {
		this.setState({dropIsOpen: !this.state.dropIsOpen});
	}

	blurDropdown = (evt) => {		
		setTimeout(() => this.setState({dropIsOpen: false}), dropdownDelay);				
	}

	render() {
		const projects = this.state.singleOne ? this.props.projects.filter(item => item.name === this.state.singleOne) : this.props.projects;	
		const content =
			<div className='projects__list'> 
				<Navigation projects={projects} isOpen={this.state.dropIsOpen} 
					switchDropdown={this.switchDropdown} onBlur={this.blurDropdown} bred={this.bred}/>
				<ul className = 'projects__items row d-flex justify-content-center justify-content-md-start' style = {{listStyle: 'none'}}>
					{projects.map(item => 
						<li key={item.id} className={'project__item '+getCurrentProjectClass(item.isCurrentProject)}>
							<Project project={item}/> 
						</li>)}
				</ul>;	
			</div>	
		return (<div>			
				{(projects.length === 0) ? <p className='text-center mt-3'>Ничего не найдено. Возможно, стоит проверить условия фильтра...</p> : content}
			</div>)  
	}		 
}
