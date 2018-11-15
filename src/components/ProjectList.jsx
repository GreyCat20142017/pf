import React from 'react'
import Project from './Project'
import {getCurrentProjectClass} from '../functions';

export default function ProjectList({ projects }) {	
	return (projects.length === 0 ? <p className='text-center mt-3'>Ничего не найдено. Возможно, стоит проверить условия фильтра...</p> :
		<ul className = 'projects__items row d-flex justify-content-center justify-content-sm-start' style = {{listStyle: 'none'}}>
			{projects.map(item => <li key={item.id} className={'project__item '+getCurrentProjectClass(item.isCurrentProject)}><Project project = {item}/> </li>)}
		</ul>)   
}


