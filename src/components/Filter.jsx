import React, {Component} from 'react';
import {getToggledButtonClass} from '../functions';

export default class Filter extends Component {	

	render () {
		const {filterPositions, filterStates, isFilterConjunction} = this.props;

		return (
		
			<div className='row mx-auto'>
				<div className='btn-group' data-toggle='buttons'>
					{filterPositions.map((item, ind) =>
						<button className={getToggledButtonClass(filterStates[ind])} type="button" autoComplete="off" key={item} id={ind} onClick={this.props.toggle(ind)}>
							{item}
						</button>
					)}	
				</div> 		
	

				<button className='btn btn-warning ml-2' type="button" autoComplete="off"  onClick={this.props.changeCondition()}>
					{isFilterConjunction ?  'И' : 'ИЛИ'}
				</button>
				<button className='btn btn-secondary ml-2' type="button" autoComplete="off"  onClick={this.props.resetFilter()}>
					Сбросить
				</button>

			</div>

		)
	}
}