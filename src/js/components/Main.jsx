import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// Components
import Graph from './Graph';
import Login from './Login';
import Settings from './Settings';
import Timer from './Timer';
import User from './User';
import Weather from './Weather';
import Tasks from './Tasks';

import { setRoute } from '../action-creators/route';
import { tabReceiveHistory } from '../action-creators/history';

let backgrounds = [
'http://i.imgur.com/cAkrTyU.jpg',
'http://i.imgur.com/kvhSMjC.jpg',
'http://i.imgur.com/KBWmaas.jpg',
'http://i.imgur.com/976n77H.jpg',
'http://i.imgur.com/H1Lb2Xv.jpg',
'http://i.imgur.com/CA9gCNx.jpg',
'http://i.imgur.com/aVcP3fF.jpg',
'http://i.imgur.com/Jnh77yl.jpg'
];

const random = Math.floor(Math.random() * (backgrounds.length - 1)) + 1;
const BackgroundCheck = require('../controllers/backgroundCheck');
const classNames = require('classnames');

class Main extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      bgPositionX: 0,
      bgPositionY: 0,
      width: 0,
      height: 0,
      src: '',
      initialized: false,
      modal: false
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.canvas = null;
  }

  componentWillMount() {
    this.setBackground(backgrounds[random]);
  }

// <<<<<<< HEAD
//   componentWillReceiveProps(nextProps) {
//     if(this.props.route !== nextProps.route) this.setState({modal: nextProps.route})
//   }
// =======
// >>>>>>> master
  componentDidMount() {
    // BackgroundCheck.init({
    //   targets: '.bg-check',
    //   images: '.fullsizeBg'
    // });
    // var elements = document.getElementsByClassName('bg-check');
    // Array.prototype.forEach.call(elements, (el) => {
    //     // Do stuff here
    //     BackgroundCheck.refresh(el);
    // });
  }

  handleMouseMove(e) {
    let mouseStrength = 25,
        viewportHeight = document.documentElement.clientHeight,
        viewportWidth = document.documentElement.clientWidth,
        pageX = e.pageX - (window.innerWidth / 2),
        pageY = e.pageY - (window.innerHeight / 2);
    this.setState({
      bgPositionX: (mouseStrength / viewportWidth) * pageX * -1 - 25,
      bgPositionY: (mouseStrength / viewportHeight) * pageY * -1 - 50,
    })
  }

  setBackground(url){
    this.setState({ src: url });
  }

  onImageLoad(e){
    let width = e.target.naturalWidth,
        height = e.target.naturalHeight;

    this.setState({
      width: width,
      height: height
    })
  }

  render(){
    const { status, weather, auth, route, history, greylist } = this.props;

    let child;
    if (!route || route.includes('alarm')){
      child = (<Timer status={status} />);
    } else if (route === "settings"){
      child = (<Settings {...this.props} />);
    } else if (route === "chart"){
      child = (<Graph {...this.props} />);
    } else if (route === "tasks"){
      child = (<Tasks {...this.props} />);
    }

    const tooltip = {
      settings: (<Tooltip id="settings-tooltip">Settings</Tooltip>),
      graph: (<Tooltip id="graph-tooltip">Graphs</Tooltip>),
      tasks: (<Tooltip id="task-tooltip">Tasks</Tooltip>)
    }

    return (
      <div id="main"
        className="fullsizeBg"
        style={{
          background: `url("${this.state.src}")`,
          backgroundPosition: `${this.state.bgPositionX}px ${this.state.bgPositionY}px`
        }}
        onMouseMove={this.handleMouseMove}>
        <img src={this.state.src} onLoad={this.onImageLoad.bind(this)} style={{display: 'none'}} />

        {
          auth ? (
            <div>
              {
                !this.props.route ? 
                <User {...this.props} /> : null
              }              
              <div id="tasks" className="icon top-left bg-check">
                <OverlayTrigger placement="bottom" overlay={tooltip.tasks}>
                  <i className="fa fa-calendar-check-o" onClick={(e)=>{this.props.setRoute('tasks')}}></i>
                </OverlayTrigger>
              </div>

              <Weather weather={weather} />

              <div id="settings" className="icon bottom-left bg-check">
                <OverlayTrigger placement="top" overlay={tooltip.settings}>
                  <i className="fa fa-cog" onClick={(e)=>{this.props.setRoute('settings')}}></i>
                </OverlayTrigger>
              </div>

              <div id="chart" className="icon bottom-right bg-check">
                <OverlayTrigger placement="top" overlay={tooltip.graph}>
                  <i className="fa fa-bar-chart" onClick={(e)=>{this.props.setRoute('chart')}}></i>
                </OverlayTrigger>
              </div>
            </div>
            ) : null
        }


        <div className="flex-center">
          <div id="wrapper" className={route ? route : null}>
          {
            !auth ?
            <Login /> : child
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => (state);
const mapDispatch = dispatch => ({
  setRoute: route => dispatch(setRoute(route))
});

export default connect(mapState, mapDispatch)(Main);
