import React from 'react'
import Project from './Project'
import {getCurrentProjectClass} from '../functions';

export default function ProjectList({ projects }) {	
	return (
		<ul className = 'projects__items card-deck justify-content-center row no-gutters' style = {{listStyle: 'none'}}>
			{projects.map(item => <li key={item.id} className={getCurrentProjectClass(item.isCurrentProject)}><Project project = {item}/> </li>)}
		</ul>)   
}


