import React from 'react';

class About extends React.Component {

	constructor(props) {
		super(props);
		this.state = { aboutStates: this.props.about.map(item => true)}
	}

	onAboutButtonClick = (ind) => {
		const aboutStates = this.state.aboutStates.map((item, idx) => {
			if (idx === ind) {
				item = !item;
			}
			return item;
		}); 
		this.setState({ aboutStates: aboutStates });
	}

	render() {
		const {about} = this.props;
		const aboutStates = this.state.aboutStates;
		return (
			<section className='about'>
				<h2 className='about__title visually-hidden'>О портфолио, проектах и о себе</h2>
				<ul className='about__list list-unstyled'>					
				 {about.map(
				 	(item, ind) =>
				 		(<li className='about__text text-muted mt-3' key={ind}>
							<small className={'about__subject ' + (aboutStates[ind] ? 'collapse' : '')}>{item.content} &nbsp;</small>						
							<button 
								className='about__switcher btn btn-sm btn-outline-secondary badge' 
								onClick={() => this.onAboutButtonClick(ind)} 
								title={'Свернуть/развернуть ' + item.title}>
								{ aboutStates[ind]  ? `${item.title}...` : `Свернуть '${item.title}'`}
							</button>
				 		</li>)
				 	)}			
				</ul>		
				
			</section>
			)					
	}
}

export default About;