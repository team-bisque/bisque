// constance
const LOCKEDTAB = 'LOCKEDTAB';
const LOCKEDWINDOW = 'LOCKEDWINDOW';

// action creators
const lock_tab = lockedTab => ({ type:LOCKEDTAB, lockedTab });

const lock_window = lockedWindow => ({ type:LOCKEDWINDOW, lockedWindow });

const initialState = {
  lockedTab: {},
  lockedWindow: {}
};

// reducer
export default (browser=initialState, action) => {
	let newState = Object.assign({}, initialState)
	switch(action.type){
		case LOCKEDTAB:
			console.log(action)
			newState.lockedTab = action.lockedTab;
			break;

		
	};
	return newState;
};

// dispatchs
export const lockTab = lockedTab => dispatch => {
	dispatch(lock_tab(lockedTab));
};
export const lockWindow = lockedWindow => dispatch => {
	dispatch(lock_window(lockedWindow));
};