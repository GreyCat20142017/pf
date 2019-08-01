import React, {Component} from 'react';
import {getLastChain} from '../functions';

class GitComplexButton extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggleContainer = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler = () => {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  };

  onClickOutsideHandler = (event) => {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({isOpen: false});
    }
  };

  render() {
    const {project} = this.props;
    const dropOpenedClass = this.state.isOpen ? ' show ' : '';


    return (
      <div className='dropdown mt-1' ref={this.toggleContainer}>
        <button className='project__button btn btn-outline-secondary btn-block dropdown-toggle' type='button'
                id={project.id + '-git'}
                data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onClick={this.onClickHandler}>
          Код на Github
        </button>
        <div className={'dropdown-menu w-100 ' + dropOpenedClass} aria-labelledby={project.id + '-git'}>
          {project.git.map((link, ind) =>
            (<a className='project__button w-100 btn btn-secondary btn-block'
                href={link} onClick={this.onClickHandler}
                key={'sub-' + project.id + '-' + ind}>
              {'Код на GitHub (' + getLastChain(link) + ')'}
            </a>)
          )}
        </div>
      </div>
    );

  }
}

export default GitComplexButton;
