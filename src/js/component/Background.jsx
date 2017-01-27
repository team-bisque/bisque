import React from 'react';

export default function Background (props) {
  console.log('Background rendering with props', props);

  const style = {
  	background: {
  		width: 100+'%',
  		height: 100+'vh',
  		backgroundColor: 'black',
  		display: 'flex',
  		flexDirection: 'column',
			justifyContent: 'space-between'
  	}
  };
  return (
    <div style={style.background}>    	
    	<div>
    	row
    	</div>
    	<div>
    	throws
    	</div>
    	<div>
    	what
    	</div>
    </div>
  );
};
