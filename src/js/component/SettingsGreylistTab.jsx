import React from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addUrl, removeUrl, editUrl } from '../action-creators/settings';


class SettingsGreylistTab extends React.Component {
  constructor(props){
    super(props)
    this.url = '';    
  }

  onChangeURL(e) {    
    if(e.target.name === 'add-new') this.url = e.target.value;
    else this.props.editUrl(e.target.value, parseInt(e.target.getAttribute('data-id')));
  }
  onKeypressEnter(e){
    console.log(e.key)
    if (e.key == 'Enter'){
      this.props.addUrl(this.url)
    }
  }

  addNew(e) {
    e.preventDefault();
    this.props.addUrl(this.url)
  }

  remove(e) {
    this.props.removeUrl(parseInt(e.target.getAttribute('data-id')));
  }

  render(){
    const { settings } = this.props
    return (
      <div>
        <p>
          Add greylists site you want to be away from during your work time. e.g) buzzfeed.com
        </p>
        <div className="addNew">
          <FormControl
            type="text"
            onChange={this.onChangeURL.bind(this)}
            onKeyPress={this.onKeypressEnter.bind(this)}
            name="add-new"
            className="inline"
              />  
          <div className="icon" onClick={this.addNew.bind(this)}><i className="fa fa-plus pull-right"></i></div>
        </div>
        <ul className="greylistURLs">
          {settings.greylist.length ? settings.greylist.map((url, index) => {
            return (
              <li key={index}>
                
                <div>              
                  <FormControl
                    type="text"
                    value={url}
                    onChange={this.onChangeURL.bind(this)}
                    data-id={index}
                    name="greylist-url"
                    className="inline"
                  />
                  <div className="icon">
                    <i className="fa fa-times pull-right" data-id={index} onClick={this.remove.bind(this)}></i>
                  </div>                
                </div>
                
              </li>
            )
          }).reverse() : null}
        </ul>
      </div>
     )
  }
  
}

const mapState = ({ settings }) => ({ settings });
const mapDispatch = dispatch => ({
  addUrl: url         => (dispatch(addUrl(url))),
  editUrl: (url, id)  => (dispatch(editUrl(url, id))),
  removeUrl: id       => (dispatch(removeUrl(id)))
});

export default connect(mapState, mapDispatch)(SettingsGreylistTab);