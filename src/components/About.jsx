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
		const about = this.props.about;
		const aboutStates = this.state.aboutStates;
		return (
			<ul className='list-unstyled'>					
			 {about.map(
			 	(item, ind) =>
			 		(<li className='header__text text-muted mt-3' key={ind}>
						<small className={'header__about ' + (aboutStates[ind] ? 'collapse' : '')} id='collapse'>{item.content} &nbsp;</small>						
						<button 
							className='header__about-switcher btn btn-sm btn-outline-secondary badge' 
							onClick={() => this.onAboutButtonClick(ind)} 
							title={'Свернуть/развернуть ' + item.title}>
							{ aboutStates[ind]  ? `${item.title}...` : `Свернуть '${item.title}'`}
						</button>
			 		</li>)
			 	)}			
			</ul>		
			)					
	}
}


export default About;