'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { FormControl, ButtonGroup, Button } from 'react-bootstrap';
import { tabAddTask, tabRemoveTask, tabCompleteTask } from '../../action-creators/tasks';

class Tasks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      title: ''
    }

    this.toggleList = this.toggleList.bind(this);
    this.addNewTaskChange = this.addNewTaskChange.bind(this);
    this.addNewTaskEnter = this.addNewTaskEnter.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      selectedList: nextProps && nextProps.tasks.filter(list => list.id === this.state.selectedList.id)[0]
    })
  }

  addNewTaskChange (e) {
    this.setState({ title: e.target.value })
  }

  onKeyPressEnter(e) {
    if (e.key === 'Enter'){
      this.addNewTaskEnter(e);
    }
  }

  addNewTaskEnter (e) {
    const { title } = this.state
    e.preventDefault();
    this.props.tabAddTask({ title }, this.state.selectedList.id);
    this.setState({ title: '' });
  }

  toggleTaskComplete (e) {
    // Mark a task as completed
    const taskToUpdate = this.state.selectedList.data.filter(task => task.id === e.target.dataset.id)[0];
    taskToUpdate.status = 'completed';
    this.props.tabCompleteTask(taskToUpdate, this.state.selectedList.id)
  }

  removeTask (e) {
    // Remove a task from the list
    this.props.tabRemoveTask(e.target.dataset.id, this.state.selectedList.id);
  }

  toggleList (e) {
    // Show the tasks from a selected task list
    const newSelectedList = this.props.tasks.filter(taskList => taskList.title === e.target.textContent)[0];
    this.setState({
      selectedList: newSelectedList
    })
  }

  render(){
    const tasks = this.props.tasks;
    const selectedList = this.state.selectedList;

    return (
      <div id="task-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Tasks</div>
          <div>
            <i className="fa fa-times" onClick={(e) => this.props.setRoute(null)}></i>
          </div>
        </div>
        <div>
          <p>Task Lists</p>
          <ButtonGroup>
            {
              tasks && tasks.length ? tasks.map((list, idx) => {
                return (
                  <Button
                    id={idx}
                    key={list.id}
                    className="list-title"
                    onClick={this.toggleList}
                  >
                  {list.title}
                  </Button>)
              }) : null
            }
          </ButtonGroup>
          <div className="addNew">
            <p>Add a New Task</p>
            <FormControl
              id="addNew-input"
              type="text"
              value={this.state.title}
              onChange={this.addNewTaskChange}
              onKeyPress={this.onKeyPressEnter.bind(this)}
              onSubmit={this.addNewTaskEnter}
              name="add-new"
              className="inline"
                />
            <div className="icon" onClick={this.addNewTaskEnter}><i className="fa fa-plus pull-right"></i></div>
          </div>
          <ul className="tasks-list">
            <p>Task List</p>
            {
              selectedList && selectedList.data ? selectedList.data.map((task, index) => {
                return (
                  <li key={task.id}>
                    <div>
                      {
                        task.status === 'completed' ?
                        <div className="icon checkbox">
                          <i className="fa fa-check-square-o" data-id={task.id}></i>
                        </div> :
                        <div className="icon checkbox">
                          <i className="fa fa-square-o" data-id={task.id} onClick={this.toggleTaskComplete.bind(this)}></i>
                        </div>
                      }
                      <FormControl
                        readOnly
                        type="text"
                        value={task.title}
                        data-id={index}
                        name="subject"
                        className="inline md"
                      />
                      <div className="icon">
                        <i className="fa fa-times pull-right" data-id={task.id} onClick={this.removeTask.bind(this)}></i>
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

const mapState = ({ tasks }) => ({ tasks });
const mapDispatch = dispatch => ({
  tabAddTask: (task, taskList) => dispatch(tabAddTask(task, taskList)),
  tabRemoveTask: (task, taskList) => dispatch(tabRemoveTask(task, taskList)),
  tabCompleteTask: (task, taskList) => dispatch(tabCompleteTask(task, taskList))
});

export default connect(mapState, mapDispatch)(Tasks);
