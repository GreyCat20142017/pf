import React, {Component} from 'react';

const Title = (props) => (Title && 
  <div className="jumbotron">
  <div className="container text-align-center">
    <h1>{props.children}</h1>
    <Subtitle>Затрудняюсь классифицировать себя как-либо, но некоторыми вещами из набора инструментов начинающего фронтендера 
    до некоторой степени пользоваться научилась... Если бы нашлась удаленная работа - было бы отлично :-)</Subtitle>
   </div> 
  </div>  
  );

const Subtitle = (props) => (Subtitle &&  <p className="lead">{props.children}</p>);

export default class Header extends Component {	
	static Title = Title;
	static Subtitle = Title;
	
	render () {
		return (
			<Title>{this.props.children}</Title>
			)
	}
}