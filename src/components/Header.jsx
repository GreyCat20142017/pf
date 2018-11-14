import React, {Component} from 'react';

const Title = (props) => (Title &&  <h4>{props.children}</h4>);
const Subtitle = (props) => (Subtitle &&  <small>{props.children}</small>);
const About = (props) => (About && 
	<div className ='col-4 col-sm-4 col-md-2'>
		<div className='card w-100'>	
			<div className='card-header text-right p-1'><small>{props.nickname}</small></div>
			<img className='card-img-top img-thumbnail img-responsive' src={'./img/ava.jpg'} alt='Аватарка'/>			
			<div className='card-footer text-right p-1'><small>{props.name}</small></div>
		</div>				
	</div>
);

export default class Header extends Component {	
	static Title = Title;
	static Subtitle = Subtitle;
	static About = About;
	
	render () {
		const {title, subtitle, about, name, nickname} = this.props.data;
		return (
		<div className='page-header p-3'>
			<div className='row text-align-center'>
				<About name={name} nickname={nickname}/>	
				<div className='col-8 col-sm-8 col-md-10'>	
					<h4>{title}</h4>
					<Subtitle>{subtitle}</Subtitle>
					<div className="">
						<p className='text-muted mt-3'><small>{about}</small></p>
					</div>		
				</div>
			</div> 
		</div>  
		)
	}
}

