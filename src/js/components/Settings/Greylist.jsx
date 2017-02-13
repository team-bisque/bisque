import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

import {
  tabRemoveGreylist,
  tabEditGreylist,
  tabAddGreylist
} from '../../action-creators/greylist';

class Greylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  validateUrl(str){
    var pattern = new RegExp('^(https?:\\/\\/)?'+//protocol
        '((([a-z\\d]([a-z\\d]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // or ip address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query String
        '(\\#[a-z\\d_]*)?$','i' //fragment locatoer
        );

    if(!pattern.test(str)) return false;
    else return true;
  }

  onChangeURL(e) {
    let {name, value} = e.target;
    //validate if it is url
    if (name === 'add-new') this.setState({url: value});
    if(this.validateUrl(value)){
      this.props.tabEditGreylist(value, +e.target.getAttribute('data-id'));
    }
  }

  onKeyPressEnter(e) {
    if (e.key === 'Enter'){
      this.addNew(e)
    }
  }

  addNew(e) {
    e.preventDefault();
    if(this.validateUrl(this.state.url)){
      this.props.tabAddGreylist(this.state.url);
      this.setState({url: ''});
    }

  }

  remove(e) {
    this.props.tabRemoveGreylist(parseInt(e.target.getAttribute('data-id')));
  }



  render() {
    const { status, greylist } = this.props


    const popover = (
      <Popover
        id="popover-positioned-right popover-trigger-click"
        title="Durations">
        Add distracting websites you want to stay away from during your work periods, e.g. “facebook.com”. Bisque does not bar you from visiting these sites, but it will keep track of how often you visit them.
      </Popover>
    );

    return (
      <div>

        <div className="addNew">
          <FormControl
            id="addNew-input"
            type="text"
            value={this.state.url}
            onChange={this.onChangeURL.bind(this)}
            onKeyPress={this.onKeyPressEnter.bind(this)}
            name="add-new"
            className={this.validateUrl(this.state.url) ? "inline" : "inline warning"}
              />
          <div className="icon" onClick={this.addNew.bind(this)}><i className="fa fa-plus pull-right"></i></div>
        </div>
        <ul className="greylistURLs">
          { //greylist should be an object
            greylist && greylist.length ? greylist.map((url, index) => {
            return (
              <li key={index}>
                <div>
                  <FormControl
                    type="text"
                    value={url}
                    onChange={this.onChangeURL.bind(this)}
                    data-id={index}
                    name="greylist-url"
                    className={this.validateUrl(url) ? "inline" : "inline warning"}
                  />
                  <div className="icon">
                    <i className="fa fa-times pull-right" data-id={index} onClick={this.remove.bind(this)}></i>
                  </div>
                </div>

              </li>
            );
          }).reverse() : null}
        </ul>
      </div>
    );
  }
}

const mapState = ({ status, greylist }) => ({ status, greylist });
const mapDispatch = dispatch => ({
  tabAddGreylist: url        => (dispatch(tabAddGreylist(url))),
  tabEditGreylist: (url, id) => (dispatch(tabEditGreylist(url, id))),
  tabRemoveGreylist: id      => (dispatch(tabRemoveGreylist(id)))
});

export default connect(mapState, mapDispatch)(Greylist);

export {Greylist as TestableGreylist};
