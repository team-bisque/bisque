import React from 'react';

import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

const SettingsGreylistTab = (props) => {
  const {
    urlList,
    newUrlHandleChange,
    editUrlHandleChange,
    saveNewUrl,
    removeUrl,
    currentUrl
  } = props;
  return (
    <div>
      <p>
        Add greylists site you want to be away from during your work time. e.g) buzzfeed.com
      </p>
      <div className="addNew">
        <FormControl
          key={'add'}
          type="text"
          value={currentUrl}
          onChange={newUrlHandleChange}
          className="inline"
            />  
        <div className="icon"><i className="fa fa-plus pull-right" onClick={saveNewUrl}></i></div>
      </div>
      <ul className="greylistURLs">
        {urlList.map((url, index) => {
          return (
            <li key={index}>
              
              <div>              
                <FormControl
                  type="text"
                  value={url}
                  onChange={editUrlHandleChange}
                  className="inline"
                />
                <div className="icon"><i className="fa fa-times pull-right" onClick={(event) => removeUrl(event, index)}></i></div>                
                </div>
              
            </li>
          )
        }).reverse()}
      </ul>
    </div>
   )
}

export default SettingsGreylistTab;


 // <Grid fluid={true}>      
 //      <Row>
 //        <Col xs={12} md={10} mdOffset={1}>
 //          <Form inline>
 //            <FormGroup>
 //              <FormControl
 //                key={'add'}
 //                type="text"
 //                value={currentUrl}
 //                onChange={newUrlHandleChange}
 //              />            
 //            </FormGroup>
 //            <Button onClick={saveNewUrl}><span className="glyphicon glyphicon-plus"></span></Button>
 //          </Form>
 //        </Col>
 //      </Row>
 //      {urlList.map((url, index) => {
 //        return (
 //          <Row key={index}>
 //            <Col xs={12} md={10} mdOffset={1}>
 //              <Form>
 //                <FormGroup>
 //                  <FormControl
 //                    type="text"
 //                    value={url}
 //                    onChange={(event) => editUrlHandleChange(event, index)}
 //                  />
 //                </FormGroup>
 //                <Button onClick={(event) => removeUrl(event, index)}><span className="glyphicon glyphicon-minus"></span></Button>
 //              </Form>
 //            </Col>
 //          </Row>
 //        )
 //      }).reverse()}
 //    </Grid>