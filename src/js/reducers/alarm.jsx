import { callBackground } from '../utils';

const initialState = {
  duration: 10
};

export default (alarm=initialState, action) => {
	let newState = Object.assign({}, initialState)
	switch(action.type){
		case SAVE:
			// callBackground('save', alarms).then(newValue => {
			// 	let index = newState.alarms.findIndex(a => a.name === newValue.name);


			// 	if(index > -1){
			// 		newState.alarms.splice(index, 1, newValue);
			// 	} else {
			// 		newState.alarms.push(newValue)
			// 	}				
			// })
			break;

		return newState;
	}
}