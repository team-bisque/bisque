import React 				from 'react';
import { connect }  from 'react-redux';
const moment = require('moment');

/*
 * Core Component
 * ===============
 * get user setting
 * identify current time 
 *  
 *
 */

 function getCurrentTime(){
 	return new Date.now()
 }

class Core extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: '',
			workStartTime: 9:00AM
  		workEndTime: 6:30PM
  		numberOfBreaks: 5
  		lunchBreaks: 3
  		lunchDuration: 1hr 30min

		}
	}

	componentDidMount() {
		console.log(new Date.now())
	}

	render(){
		return (
	    <div>
	    	

	    </div>
	  )
	}
}

const mapState = ({ status, time }) => ({ status, time });
const mapDispatch = { toggleWork };

export default connect(mapState, mapDispatch)(Core);