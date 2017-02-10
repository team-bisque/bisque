'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import {
  receiveTasks
} from '../action-creators/tasks';

const dummyData = [
  { title: 'Update my resume', complete: false },
  { title: 'Update linkedin', complete: false },
  { title: 'Job research', complete: false },
  { title: 'Clean up the desk', complete: true }
];

class Tasks extends React.Component{
  constructor(props) {
    super(props);    
  }

  onChangeTask(e){

  }

  onKeypressEnter(e){

  }

  toggleTask(e){

  }

  addNew(e){

  }

  remove(e){

  }

  render(){
    const tasks = dummyData;
    return (
      <div id="task-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Tasks</div>
          <div>
            <i className="fa fa-times" onClick={(e) => this.props.setRoute(null)}></i>
          </div>
        </div>
        <div>
          <p>
            This is tasks placeholder
          </p>
          <div className="addNew">
            <FormControl
              id="addNew-input"
              type="text"
              onChange={this.onChangeTask.bind(this)}
              onKeyPress={this.onKeypressEnter.bind(this)}
              name="add-new"
              className="inline"
                />
            <div className="icon" onClick={this.addNew.bind(this)}><i className="fa fa-plus pull-right"></i></div>
          </div>  
          <ul className="tasks-list">
            { //greylist should be an object
              tasks && tasks.length ? tasks.map((task, index) => {
              return (
                <li key={index}>
                  <div>
                    {
                      task.complete ? 
                      <div className="icon checkbox">
                        <i className="fa fa-check-square-o" data-id={index} onClick={this.toggleTask.bind(this)}></i>
                      </div> :
                      <div className="icon checkbox">
                        <i className="fa fa-square-o" data-id={index} onClick={this.toggleTask.bind(this)}></i>
                      </div>
                    }                    
                    <FormControl
                      type="text"
                      value={task.title}
                      onChange={this.onChangeTask.bind(this)}
                      data-id={index}
                      name="subject"
                      className="inline md"
                    />
                    <div className="icon">
                      <i className="fa fa-times pull-right" data-id={index} onClick={this.remove.bind(this)}></i>
                    </div>
                  </div>

                </li>
              );
            }) : null}
          </ul>
        </div>
      </div>
    );
  }
}
const mapState = null;
const mapDispatch = null;
export default connect(mapState, mapDispatch)(Tasks);