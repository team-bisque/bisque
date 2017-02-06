import React from 'react';

import {
  Button,
  Row,
  Grid,
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
      <Grid fluid={true} className="survey-wrapper">
        <Row>
          <Form inline>
            <center>
              <Row>
                <FormGroup>
                  <FormControl
                    key={'add'}
                    type="text"
                    value={currentUrl}
                    onChange={newUrlHandleChange}
                  />
                <Button onClick={saveNewUrl}><span className="glyphicon glyphicon-plus"></span></Button>
                </FormGroup>
              </Row>
            {urlList && urlList.map((url, index) => {
              return (
                <Row key={index}>
                  <FormGroup>
                    <FormControl
                      type="text"
                      value={url}
                      onChange={(event) => editUrlHandleChange(event, index)}
                    />
                  </FormGroup>
                  <Button onClick={(event) => removeUrl(event, index)}><span className="glyphicon glyphicon-minus"></span></Button>
                </Row>
              )
            }).reverse()}
            </center>
          </Form>
        </Row>
      </Grid>
    </div>)
}

export default SettingsGreylistTab;
