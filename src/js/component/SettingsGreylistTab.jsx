import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  Button,
  Row,
  Grid,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

import {updateUrlListInDb, updateUrlList} from '../action-creators/settings';
import store from '../store';

class SettingsGreylistTab extends Component {
  constructor(props) {
    super(props);
    this.addNewUrl();
    this.addNewUrl = this.addNewUrl.bind(this);
    this.removeUrl = this.removeUrl.bind(this);
    this.newUrlHandleChange = this.newUrlHandleChange.bind(this);
    this.editUrlHandleChange = this.editUrlHandleChange.bind(this);
  }

  addNewUrl() {
    let {urlList} = this.props;
    urlList = urlList.filter(url => url !== '');
    urlList.unshift('');
    console.log('URLLIST AFTER ADDNEWURL', urlList);
    store.dispatch(updateUrlListInDb(urlList));
  }

  removeUrl(urlIndex) {
    let {urlList} = this.props;
    urlList = urlList.filter((url, index) => index !== urlIndex);
    store.dispatch(updateUrlListInDb(urlList));
  }

  newUrlHandleChange(event) {
    const {value} = event.target;
    const {urlList} = this.props;
    console.log(this.props);
    urlList[0] = value;
    console.log('URLLIST AFTER NEWURLHANDLECHANGE', urlList);
    store.dispatch(updateUrlListInDb(urlList));
  }

  editUrlHandleChange(event, urlIndex) {
    const {urlList} = this.props;
    const {value} = event.target;
    urlList[urlIndex] = value;
    console.log('URLLIST AFTER EDITURLHANDLECHANGE', urlList);
    store.dispatch(updateUrlListInDb(urlList));
  }

  render() {
    const {urlList} = this.props;
    console.log(this.props);
    const {
      addNewUrl,
      removeUrl,
      newUrlHandleChange,
      editUrlHandleChange,
    } = this;
    return (
      <div>
        <Grid fluid={true} className="survey-wrapper">
          <Row>
              <center>
                <form>
                {urlList && (<Row>
                    <input
                      className="greylist-url"
                      key={0}
                      type="text"
                      value={urlList[0]}
                      onChange={newUrlHandleChange}
                    />
                  <Button onClick={addNewUrl}><span className="glyphicon glyphicon-plus"></span></Button>
                </Row>)}
              {urlList.slice(1, urlList.length).map((url, index) => {
                console.log("urlList in urlList map", urlList);
                const sliceAdjustedIndex = index + 1;
                return (
                  <Row key={sliceAdjustedIndex}>
                      <input
                        className="greylist-url"
                        type="text"
                        value={url}
                        onChange={(event) => editUrlHandleChange(event, sliceAdjustedIndex)}
                      />
                    <Button onClick={(index) => removeUrl(index)
                    }><span className="glyphicon glyphicon-minus"></span></Button>
                  </Row>
                )
              })}
              </form>
              </center>
          </Row>
        </Grid>
      </div>)
  }
}

const mapState = ({settings}) => (settings);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsGreylistTab);
