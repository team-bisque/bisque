import React from 'react';

import {
  Button,
  Row,
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
    removeUrl
  } = props;
  return (
    <div>
      <center>
        <Row>
            <Form inline>
            <Row>
              <FormGroup>
                <FormControl
                  key={'add'}
                  type="text"
                  value={urlList[urlList.length-1]}
                  onChange={newUrlHandleChange}
                />
              <Button onClick={saveNewUrl}><span className="glyphicon glyphicon-plus"></span></Button>
              </FormGroup>
              </Row>
          {urlList.slice(1, urlList.length).map((url, index) => {
            const sliceAdjustedIndex = index + 1;
            return (
              <Row key={sliceAdjustedIndex}>
                <FormGroup>
                  <FormControl
                    type="text"
                    value={url}
                    onChange={(event) => editUrlHandleChange(event, sliceAdjustedIndex)}
                  />
                </FormGroup>
                <Button onClick={(event) => removeUrl(event, index)}><span className="glyphicon glyphicon-minus"></span></Button>
              </Row>
            )
          }).reverse()}
          </Form>
          </Row>
      </center>
    </div>)
}

export default SettingsGreylistTab;
