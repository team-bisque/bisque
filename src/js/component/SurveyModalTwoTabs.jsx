import {connect} from 'react-redux';

import React from 'react';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';

require('../../css/survey-modal.css')

export default class SurveyModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      modalShowing: true,
      modalOptions: {
        progress: 25 + '%'
      }
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount () {
    this.showModal()
  }

  showModal () {
    if (!this.props.status.isWorking) this.setState({modalShowing: true})
  }

  hideModal () {
    this.setState({modalShowing: false})
  }

  render () {
    return (
      <Modal
        className="survey"
        show={this.state.modalShowing}
        onHide={this.hideModal}
        container={this}
      >
        <Modal.Header closeButton>
          <Modal.Title>Time for a Break!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid={true} className="survey-wrapper">
            <Row className="statistics">
              <h4 className="summary-title row">Work Block Complete!</h4>
              <Col xs={12} md={6} className="label-wrapper">
                <div>Time Begun:</div>
                <span>12:10pm</span>
              </Col>
              <Col xs={12} md={6} className="label-wrapper">
                <div>Time Completed:</div>
                <span>01:10pm</span>
              </Col>
              <Col xs={12} md={6} className="label-wrapper">
                <div>Words Written:</div>
                <span>262</span>
              </Col>
              <Col xs={12} md={6} className="label-wrapper">
                <div>Words Per Minute:</div>
                <span>6.0</span>
              </Col>
            </Row>
            <Row className="progress-row">
              <h4 className="progress-checkup-title row">Progress Checkup!</h4>
              <Col xs={12} md={6}>
                <div>Progress to Goal:</div>
              </Col>
              <Col xs={12} md={6}>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{width: this.state.modalOptions.progress}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
              </Col>
            </Row>
            <Row className="checkin">
              <Row className="first-question">
                <h4 className="progress-checkup-title row">Productivity Check-in</h4>
                <Col xs={12} md={5}>
                  <p className="quick-survey-question">I feel that my output this block was of high quality</p>
                </Col>
                <Col xs={12} md={7}>
                  <div className="quality-indicators">
                    <p className="quick-survey-quality-indicator">low</p>
                    <p className="quick-survey-quality-indicator">high</p>
                  </div>
                  <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default">1</button>
                    <button type="button" className="btn btn-default">2</button>
                    <button type="button" className="btn btn-default">3</button>
                    <button type="button" className="btn btn-default">4</button>
                    <button type="button" className="btn btn-default">5</button>
                  </div>
                </Col>
              </Row>
              <Row className="second-question">
                <Col xs={12} md={5}>
                  <p className="quick-survey-question">I am feeling happy and healthy for the next block</p>
                </Col>
                <Col xs={12} md={7}>
                  <div className="quality-indicators">
                    <p className="quick-survey-quality-indicator">low</p>
                    <p className="quick-survey-quality-indicator">high</p>
                  </div>
                  <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default">1</button>
                    <button type="button" className="btn btn-default">2</button>
                    <button type="button" className="btn btn-default">3</button>
                    <button type="button" className="btn btn-default">4</button>
                    <button type="button" className="btn btn-default">5</button>
                  </div>
                </Col>
              </Row>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideModal}>Finish!</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
