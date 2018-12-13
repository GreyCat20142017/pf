import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { wasError: false };
	}

  componentDidCatch () {
    this.setState({ wasError: true });
  }

  render () {
  	if (this.state.wasError) {
  		return (
  			<div className='alert alert-primary'>
  				<h4>В Портфолио произошла неизвестная ошибка...</h4>  			
  				<p>Часть функциональности отключена. Статическую версию сайта можно найти 
  					<a href={this.props.pfstatic} title="Переход по ссылке на статическую версию портфолио"> здесь...</a>
  				</p>
  			</div>	
  			)	
  	} else {
  		return (this.props.children)
  	}
  }

}
 
export default ErrorBoundary; 