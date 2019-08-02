import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import About from './About';
import Timeline from './timeline/Timeline';
import Modal from './Modal';
import Info from './Info';

import {DROPDOWN_DELAY, KEY_CODES} from '../../constants';

import './Header.css';

const Title = (props) => (Title && <h4>{props.children}</h4>);
const Subtitle = (props) => (Subtitle && <p><small className='header__prolog'>{props.children}</small></p>);

export default class Header extends Component {
  static Title = Title;
  static Subtitle = Subtitle;

  static defaultProps = {
    aboutIsCollapsed: true,
    allIsCollapsed: true
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
    this.selectRef = node;
  };

  switchDropdown = () => {
    this.setState({dropIsOpen: !this.state.dropIsOpen});
  };

  blurDropdown = (evt) => {
    setTimeout(() => this.setState({dropIsOpen: false}), DROPDOWN_DELAY);
  };

  switchModal = () => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});

  };

  onDropEscEvent = (evt) => {
    if (evt.keyCode === KEY_CODES.Esc && this.state.dropIsOpen) {
      evt.preventDefault();
      this.setState({dropIsOpen: false});
    }
  };

  onModalEscEvent = (evt) => {
    if (evt.keyCode === KEY_CODES.Esc && this.state.modalIsOpen) {
      this.setState({modalIsOpen: false});
    }
  };

  onAllButtonClick = () => {
    this.setState({allIsCollapsed: !this.state.allIsCollapsed});
  };

  render() {
    const {title, subtitle, about, name, nickname, contacts, timeline} = this.props.data;
    const {allIsCollapsed, dropIsOpen, modalIsOpen} = this.state;
    const headerSwitcherStyle = 'header__switcher btn btn-warning btn-sm ' + (allIsCollapsed ? 'btn-block' : 'p-2');

    return (
      <header className='header shadow-sm px-2' id='header' onKeyDown={this.onDropEscEvent}>
        <h4 className='header__title text-center my-3'>{title}</h4>
        <div className='header__wrapper py-1 my-1'>
          <button
            className={headerSwitcherStyle}
            onClick={this.onAllButtonClick}
            title={allIsCollapsed ? 'Развернуть весь заголовок...' : 'Свернуть весь заголовок...'}>
            {allIsCollapsed ? 'Развернуть скрытый заголовок портфолио...' : ''}
          </button>

          <div className={'header__content ' + (allIsCollapsed ? 'collapse' : ' d-flex')}>
            <Info
              name={name}
              nickname={nickname}
              contacts={contacts}
              isOpen={dropIsOpen}
              switchDropdown={this.switchDropdown}
              blurDropdown={this.blurDropdown}
              switchModal={this.switchModal}/>

            <div className='header__info ml-3 w-auto'>
              <Subtitle>{subtitle}</Subtitle>
              <About about={about}/>
              <Timeline timeline={timeline}/>
            </div>

          </div>
        </div>

        <Modal modalIsOpen={modalIsOpen} contacts={contacts} switchModal={this.switchModal}
               onModalEscEvent={this.onModalEscEvent} rr={this.getRef}/>
      </header>
    );
  }
}
