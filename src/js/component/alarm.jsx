import React from "react";
import { callBackground } from '../utils';

class Alarm extends React.Component {
	constructor(props, context) {
    console.log('Alarm constructor', props, context)
    super(props, context);
  }
	componentWillMount() {
    // let self = this;
    // callBackground('sync').then(data => {
    //   console.log(data);      
    // });
  }

  formatDate(x) {
    if(!x.enable && x.repeat)
      return 'After ' + x.after + 'min';
    let d = new Date(x.when);
    return d.toLocaleString('es-US',{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',hour12:false});
  }


  render () {
  	console.log('Alarm', this.props)
  	const { duration } = this.props;
    return <p>{duration}</p>;
  }
};

const mapState = ({alarm}) => ({alarm})
const mapDispatch = {}
export default connect(mapState, mapDispatch)(Alarm)
