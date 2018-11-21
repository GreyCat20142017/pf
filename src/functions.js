import cn from 'classnames';

const dropdownDelay = 444;

const keyCodes = {Esc: 27, Enter: 13}; 

export const getKeyCodes = () => keyCodes; 

export const getOrderById = (left, right) => {
	if (left.id > right.id) {
		return -1;
	} else if (left.id < right.id) {
		return 1;
	} else {
		return 0;
	}
}; 

export const getDropdownDelay = () => dropdownDelay;

export const getCurrentProjectClass = () => 'col-10 col-md-6 col-lg-4 mx-auto pt-4';

export const getProjectOpenButtonClass = (isCurrent) => {             
	return cn({      
		'btn btn-outline-secondary btn-block': true,               
		'disabled': isCurrent,
		'invisible': isCurrent
	});    
};

export const getToggledButtonClass = (stateByInd) => {             
  return cn({      
    'btn btn-outline-secondary btn-sm mx-1 my-1': true,        
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


	export const getArrayFromObject = function (obj) {
		return Object.keys(obj).map(function (key) {
			return obj[key];
		});
	};

