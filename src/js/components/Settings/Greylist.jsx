import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

import {
  tabRemoveGreylist,
  tabEditGreylist,
  tabAddGreylist,
  setAllLockAlias
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
      this.props.tabEditGreylist(
        {
          url: value,
          isBlocked: e.target.getAttribute('data-blocked')
        }, +e.target.getAttribute('data-id')
      );
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
      this.props.tabAddGreylist({
        url: this.state.url,
        isBlocked: false
      });
      this.setState({url: ''});
    }

  }

  remove(e) {
    this.props.tabRemoveGreylist(parseInt(e.target.getAttribute('data-id')));
  }

  lockGreylist(e){
    let { name } = e.target;
    // console.log(name, e.target)
    if (e.target.getAttribute('data-action') === 'bulk') {
      this.props.setAllLockAlias(true);
    } else {
      let index = e.target.getAttribute('data-id');
      console.log(index, this.props.greylist[index].url)
      this.props.tabEditGreylist(
        {
          url: this.props.greylist[index].url,
          isBlocked: true
        }, parseInt(index)
      );
    }
  }

  unlockGreylist(e){
    let { name } = e.target;

    if (e.target.getAttribute('data-action') === 'bulk') {
      this.props.setAllLockAlias(false);
    } else {
      let index = e.target.getAttribute('data-id');
      console.log(index, this.props.greylist[index].url)
      this.props.tabEditGreylist(
        {
          url: this.props.greylist[index].url,
          isBlocked: false
        }, parseInt(index)
      );
    }
  }

  keyValidation(e){
    // let {value} = e.target;
    // const key = 'GO NUCLEAR';
    // const substring = key.substring(0, value.length);

    // if (value === substring) this.setState({nuclear: value});
    if (e.target.value === this.state.key) this.setState({validated: true});
  }

  // setKey(){
  //   this.setState({key: "UNLOCK ME"});
  // }

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
      <fieldset className="addNew">
          <legend>Add new url</legend>
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

        </fieldset>
        <fieldset>
          <legend>List</legend>
          <ul className="greylistURLs">

            { //greylist should be an object
              greylist && greylist.length ? greylist.map((item, index) => {
              return (
                <li key={index}>
                  <div>
                    <FormControl
                      type="text"
                      value={item.url}
                      onChange={this.onChangeURL.bind(this)}
                      data-id={index}
                      data-blocked={item.isBlocked}
                      name="greylist-url"
                      className={this.validateUrl(item.url) ? "inline" : "inline warning"}
                    />
                    <div className="icon">
                      <i className="fa fa-times pull-right" data-id={index} onClick={this.remove.bind(this)}></i>
                    </div>
                    {
                      item.isBlocked ?
                      <div className="icon" onClick={this.unlockGreylist.bind(this)}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="unlock-tooltip">Unlock this url</Tooltip>}>
                          <i className="fa fa-unlock" data-id={index} ></i>
                        </OverlayTrigger>
                      </div> :
                      <div className="icon" onClick={this.lockGreylist.bind(this)}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="lock-tooltip">Block this url</Tooltip>}>
                          <i className="fa fa-lock" data-id={index} ></i>
                        </OverlayTrigger>
                      </div>
                    }
                  </div>
                </li>
              );
            }).reverse() : null}
          </ul>
        </fieldset>
        <fieldset className="bulk-actions">
          <div>
            <div className="icon" onClick={this.unlockGreylist.bind(this)}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="unlock-tooltip">Unlock all url</Tooltip>}>
                <i className="fa fa-unlock" data-action="bulk"></i>
              </OverlayTrigger>
            </div>
            <div className="icon" onClick={this.lockGreylist.bind(this)}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="lock-tooltip">Block all url</Tooltip>}>
                <i className="fa fa-lock" data-action="bulk"></i>
              </OverlayTrigger>
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}

const mapState = ({ status, greylist }) => ({ status, greylist });
const mapDispatch = {
  tabAddGreylist,
  tabEditGreylist,
  tabRemoveGreylist,
  setAllLockAlias
};

export default connect(mapState, mapDispatch)(Greylist);

export {Greylist as TestableGreylist};
