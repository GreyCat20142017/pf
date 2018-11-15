import cn from 'classnames';

export const getOrderById = (left, right) => {
	if (left.id > right.id) {
		return -1;
	} else if (left.id < right.id) {
		return 1;
	} else {
		return 0;
	}
}; 

export const getCurrentProjectClass = (isCurrent) => {             
	return cn({      		
		['col-10 col-md-6 col-lg-4 mx-auto pt-4'+ (isCurrent ? ' order-last' : '' )] : true             				
	});    
};

export const getProjectOpenButtonClass = (isCurrent) => {             
	return cn({      
		'btn btn-outline-secondary btn-block': true,               
		'disabled': isCurrent,
		'invisible': isCurrent
	});    
};

export const getToggledButtonClass = (stateByInd) => {             
      return cn({      
        'btn btn-outline-secondary mx-1 my-1': true,        
        'active': stateByInd      
      });    
    };

export const isMatch = (currentFilter, projectDetails, isConjunction) => {             
	return isConjunction ? 
		currentFilter.every(item => projectDetails.indexOf(item) >=0 ) : 
		currentFilter.some(item => projectDetails.indexOf(item) >=0 );
};

export const createFilterPositionByData = (records, fieldName) => {  
	let temporaryArray = [];
	records.forEach(record => {
		let factDataArray = record[fieldName];
		if (Array.isArray(factDataArray)) {
			factDataArray.forEach(item => {
				if (temporaryArray.indexOf(item) < 0) {
					temporaryArray.push(item) 
				}})
		}
	});				
	return temporaryArray.sort(); 
};

export const getCurrentFilterState = (positions, states)  => {
	let temporaryArray = [];
	if (Array.isArray(positions) && Array.isArray(states) && (positions.length === states.length)) {	
		positions.forEach((item, ind) => {
			if (states[ind]) {
				temporaryArray.push(item);
			}
		});}
		return temporaryArray;		
	};