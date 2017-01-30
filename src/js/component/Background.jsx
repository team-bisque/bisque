import React from 'react';
import Timer from './Timer';
import Settings from './Settings';
export default function Background (props) {
  console.log('Background rendering with props', props);

  const style = {
  	background: {
  		width: 100+'%',
  		height: 100+'vh',
  		backgroundColor: 'black',
  		display: 'flex',
  		flexDirection: 'column',
			justifyContent: 'space-between',
			color: 'white'
  	}
  };

  let OPTIONS = { prefix: 'seconds elapsed!', delay: props.workDuration}
  return (
    <div style={style.background}>
    	<div>
    	row
    	</div>
    	<div>
    	<Timer options={OPTIONS}/>
    	</div>
    	<div>
    	what
    	</div>
    </div>
  );
};

/*


<Settings />

*/
