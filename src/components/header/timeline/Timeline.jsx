import React from 'react'

import './Timeline.css'

class Timeline extends React.Component {

  constructor (props) {
    super(props);
    this.state = {isOpen: false};
  }

  onSwitcherClick = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  render () {
    const isOpen = this.state.isOpen
    const timeline = this.props.timeline;
    return (
      <div className='about__timeline'>
        <button
          className='timeline__switcher btn btn-sm btn-outline-secondary badge mt-2'
          onClick={this.onSwitcherClick}
          title={isOpen ? 'Свернуть' : 'Осторожно! Баловство под названием таймлайн в развернутом виде занимает много места!'}>
          {isOpen ? `Свернуть таймлайн` : `Таймлайн...`}
        </button>
        <section className={'timeline ' + (isOpen ? '' : 'collapse')}>
          <h2 className='timeline__title visually-hidden'>Таймлайн</h2>
          <ul className='timeline__row row list-unstyled'>
            {timeline.map((item, ind) =>
              (<li className='timeline__wrapper' key={ind}>
                <div className='timeline__item'>
                  <span className='timeline__item-section'>{item.section}</span>
                  <span className='timeline__item-date'>{item.date}</span>
                  <span className='timeline__item-header'>{item.header}</span>
                  <span className='timeline__item-description'>{item.description}</span>
                  <span className='timeline__item-link'>
									{item.linkHref === '' ? <span title='Проект не опубликован'> {item.linkText} </span>
                    :
                    <a href={item.linkHref} title='Открыть опубликованный проект'>{item.linkText}</a>
                  }
					      </span>
                </div>
              </li>)
            )}
          </ul>
        </section>
      </div>
    )
  }
}

export default Timeline;
