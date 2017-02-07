import React from 'react';

import {connect} from 'react-redux';


// Components
import Timer from './Timer';
import User from './User';
import Login from './Login';
import Settings from './Settings';
import Graph from './Graph';

import Weather from './Weather';
import SettingsModal from './SettingsModal';



import { setRoute } from '../reducers/route';

var classNames = require('classnames');

let backgrounds = [
'http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDtpPU-Jo2Nvl9lVaS4j0qRQ82q5kL1Roa-4bsHYwtvmBf1TaLvoL-guKdPSILAsJJWk3CGENHMSEAmQKsbDwxmRn98bBK8cNnD7NKEuhc9W_BCQ-1NG7YzNqpoTqOAbnGEH3AfDuO199qqfgEdjhSpER1wk03C_WGGB3OQo3x2eYdc/',
'http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDq4xaPjRt6MhR-QZuor0ljnOd8-x3bTl2nqqGNDUEKccW0Mj_bGwul5-8amW1Hc84hSDmkX6GS9jQnFz-FKoSKLK04bdo4Kle0QFDl_ZiEfvxcHimtJRjLmS1NMTLlDs2vm8uxhc54eTSyneZQ2l5LeesJgxTPHI95v5X8/',
'http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDtq6oibmAGcieRzf2aITr2KNy8yRYdxH9_dmAsSvs-7M7oWQ83Q_IZsi5qTy2bZ5P0QqlGBcAQ9KZ5qjASvHlg8vByHPhlDKiVjnBOi1KkAQqT-LidRqVVHiKROBwO1RIHGj7AA0Wt39ljXrw1bzUkGG9AU8LeDZenZXhibu6jR/',
'http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDtrDlaSXc-WuXMVJ1Ayd9kY1GqfjO_BEx8J4z7-cTCBxVqMg_d_4VmznHpEGuMBDklnEcTSxmhe3vPjJVhpDN6O6J4Ge9RTU9ZSmZGX7p_OdOZxu5IYsbQtcVRPZmVfTM1tLPUawfkTxvDeRwKa6fV8ncmUcXuenZpMWK-AqnCy/',
'http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDq1TcjiOTaVEh4l4Pvu3jnZruwXSzI1_m9rvHSZ51-s8TbmpLkgP66luWLm7tXVO7BwPC0Q8C4nzIbDe9EaJ9As1lKRdLWhC2xAYVynU9rFkfSwziskcp1Z_UtLnUBlO-iRM_aBU6BInpecUGksTIIojY-wmYj_e4VmR-cFATCS9F8/',
'http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDUeiYPqvbGMYZmP0y_a5Mcd4FgZJ5xseOvM5xkIQNGPLX_BZjTmQIhiG6VOR2LJ99mjPIvjgRJbJg5XyGUdvR5lNw_8NiL9hk2tExDO9wGQEaZ0Tnw2i9TbxV40KosECu1q_9Z4eFcjOhgqXQFNjK2bkcQXUSze9tPut8u8QQ/'
]
const random = Math.floor(Math.random() * (backgrounds.length - 1)) + 1;

const BackgroundCheck = require('../controllers/backgroundCheck');

class Main extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      bgPositionX: 0,
      bgPositionY: 0,
      width:0,
      height:0,
      src: '',
      modal: null
    }
    this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.getMeta = this.getMeta.bind(this)
    this.canvas = null
  }

  componentWillMount() {
    this.setBackground(backgrounds[random]);
  }
  componentDidMount() {
    BackgroundCheck.init({
      targets: '.bg-check',
      images: '.fullsizeBg'
    });
    var elements = document.getElementsByClassName('bg-check');
    Array.prototype.forEach.call(elements, (el) => {
        // Do stuff here
        BackgroundCheck.refresh(el);
    });
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
      width:width,
      height:height
    })
  }



  render(){
    const { status, settings, weather, auth, route, db } = this.props;
    // let user = null; // for test
    let child;
    if (!this.props.route){
      child = (<Timer status={status} />);
    } else if (this.props.route === "settings"){
      child = (<Settings {...this.props}/>);
    } else if (this.props.route === "chart"){
      child = (<Graph {...this.props}/>);
    }

    return (
      <div id="main"
        className="fullsizeBg"
        style={{
          background: `url("${this.state.src}")`,
          backgroundPosition: `${this.state.bgPositionX}px ${this.state.bgPositionY}px`
        }}
        onMouseMove={this.handleMouseMove}>
        <img src={this.state.src} onLoad={this.onImageLoad.bind(this)} style={{display: 'none'}}/>

        <User {...this.props} />
        <Weather weather={weather} />

        <div id="settings" className="icon bottom-left bg-check">
          <i className="fa fa-cog" onClick={(e)=>{this.props.setRoute('settings')}}></i>
        </div>

        <div id="chart" className="icon bottom-right bg-check">
          <i className="fa fa-bar-chart" onClick={(e)=>{this.props.setRoute('chart')}}></i>
        </div>

        <div className="flex-center">
          <div id="wrapper" className={this.props.route ? this.props.route : null}>
          {
            !auth ?
            // !user ? // for test
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
