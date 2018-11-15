import React, {Component} from 'react';
import {getToggledButtonClass} from '../functions';

export default class Filter extends Component {	

	render () {
		const {filterPositions, filterStates, isFilterConjunction} = this.props;

		return (
			<div className='filter'>
			<div className='filter__category row justify-content-center flex-wrap mt-2'>						
					{filterPositions.map((item, ind) =>
						<button className={getToggledButtonClass(filterStates[ind])} type="button" autoComplete="off" key={item} id={ind} onClick={this.props.toggle(ind)}>
							{item}
						</button>
					)}					
			</div>

			<div className='filter__controls row justify-content-center flex-wrap mt-2'>
				<button className='filter__reset btn btn-warning  mx-1 my-1' type="button" autoComplete="off"  onClick={this.props.resetFilter()}>
					Сбросить
				</button>
				<button className='filter__operation btn btn-warning  mx-1 my-1' type="button" autoComplete="off"  onClick={this.props.changeCondition()}>
					{isFilterConjunction ?  'И' : 'ИЛИ'}
				</button>
			</div>	

			</div>

		)
	}
}