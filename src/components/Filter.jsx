import React, {Component} from 'react';
import {getToggledButtonClass} from '../functions';

export default class Filter extends Component {	

	render () {
		const {filterPositions, filterStates, isFilterConjunction} = this.props;
		
		return (
			<div className='filter py-2 py-md-3 my-2 my-md-1'>

				<div className='filter__category row justify-content-center flex-wrap'>						
						{filterPositions.map((item, ind) =>
							<button 
								className={getToggledButtonClass(filterStates[ind])} 
								type="button" 								
								key={item} 
								id={ind} 
								onClick={this.props.toggle(ind)}>
								{item}
							</button>
						)}					
				</div>

				<div className='filter__controls row justify-content-center flex-wrap pt-2'>

					<button 
						className='filter__reset btn btn-sm btn-warning ml-2 mt-1' 
						type="button" 						
						onClick={this.props.resetFilter()}>
						{'Сбросить'}
					</button>

					<button 
						className='filter__operation btn btn-sm btn-secondary ml-2 mt-1' 
						type="button" 					
						onClick={this.props.changeCondition()}>
						{isFilterConjunction ?  'И' : 'ИЛИ'}
					</button>

				</div>	
			</div>

		)
	}
}