// constance
const TOGGLE = 'TOGGLE';
const WORKING = 'WORKING';
const WORK_DURATION = 'WORK_DURATION';
const BREAK_DURATION = 'BREAK_DURATION';
const EAT_DURATION = 'EAT_DURATION';

// action creators
const set_toggle = toggle => ({ type:TOGGLE, toggle });

const set_working = isWorking => ({ type:WORKING, isWorking });

const set_work_duration = workDuration => ({
	type:WORK_DURATION, workDuration
});

const set_break_duration = breakDuration => ({
	type:BREAK_DURATION, breakDuration
});

const set_eat_duration = eatDuration => ({
	type:EAT_DURATION, eatDuration
});

const initialState = {
  toggle: false,
  isWorking: false,
  workDuration: (1000 * 10),
  breakDuration: (1000 * 10),
  eatDuration: (1000 * 10)
};

// reducer
export default (app=initialState, action) => {
	let newState = Object.assign({}, app)

	console.log(newState)
	switch(action.type){
		case TOGGLE:
			newState.toggle = action.toggle;			
			break;

		
	}
	return newState;
}

// dispatchs
export const setToggle = toggle => dispatch => {
	dispatch(set_toggle(toggle))
};
export const setWorking = isWorking => dispatch => {
	dispatch(set_working(isWorking))
};
export const setWorkDuration = workDuration => dispatch => {
	dispatch(set_work_duration(workDuration))
};
export const setBreakDuration = breakDuration => dispatch => {
	dispatch(set_break_duration(breakDuration))
};
export const setEatDuration = eatDuration => dispatch => {
	dispatch(set_eat_duration(eatDuration))
};