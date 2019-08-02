import cn from 'classnames';
import {FILTER_OPERATIONS} from './constants';

const stripId = (id) => (id.replace('id-', ''));

export const getOrderById = (left, right) => ( parseInt(stripId(right.id), 10) - parseInt(stripId(left.id), 10));

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

export const isMatch = (currentFilter, projectDetails, filterOperation) => {
  return filterOperation === FILTER_OPERATIONS.AND ?
    currentFilter.every(item => projectDetails.indexOf(item) >= 0) :
    currentFilter.some(item => projectDetails.indexOf(item) >= 0);
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

export const getIsIECheckResult = () => {
	const userAgent = window.navigator.userAgent;
  return (userAgent.indexOf('Trident') !== -1) || (userAgent.indexOf('MSIE') !== -1);
};

export const getLastChain = (link) => {
  const arr = link.split('/');
  return arr.length > 0 ? arr[arr.length -1] : '';
}
