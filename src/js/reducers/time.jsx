// constance
const WORK_DURATION = 'WORK_DURATION';
const BREAK_DURATION = 'BREAK_DURATION';
const EAT_DURATION = 'EAT_DURATION';
const START_TIME = 'START_TIME';

// action creators
const set_work_duration = workDuration => ({
	type: WORK_DURATION, workDuration
});

const set_break_duration = breakDuration => ({
	type: BREAK_DURATION, breakDuration
});

const set_eat_duration = eatDuration => ({
	type: EAT_DURATION, eatDuration
});

const initialState = {
  workDuration: (1000 * 10),
  breakDuration: (1000 * 10),
  eatDuration: (1000 * 10),
  startTime: 0
};

// reducer
export default (app=initialState, action) => {
	let newState = Object.assign({}, app)

	switch(action.type){
		case WORK_DURATION:
			newState.workDuration = action.workDuration;			
			break;
		case BREAK_DURATION:
			newState.breakDuration = action.breakDuration;			
			break;
		case EAT_DURATION:
			newState.eatDuration = action.eatDuration;			
			break;
		case START_TIME:
			newState.startTime = action.startTime;			
			break;		
	}
	return newState;
}

// dispatchs
export const setWorkDuration = workDuration => dispatch => {
	dispatch(set_work_duration(workDuration))
};
export const setBreakDuration = breakDuration => dispatch => {
	dispatch(set_break_duration(breakDuration))
};
export const setEatDuration = eatDuration => dispatch => {
	dispatch(set_eat_duration(eatDuration))
};