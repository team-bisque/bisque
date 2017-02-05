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
    saveEditUrl,
    currentUrl
  } = props;
  return (
    <div>
      <center>
        <Row>
            <Form inline>
            <Row>
              <FormGroup>
                <FormControl key={'add'} type="text" value={currentUrl} onChange={newUrlHandleChange} />
              <Button onClick={saveNewUrl}><span className="glyphicon glyphicon-plus"></span></Button>
              </FormGroup>
              </Row>
          {urlList.map((url, index) => {
            return (
                    <Row>
              <FormGroup key={index}>
                <FormControl key={index} index={index} type="text" value={url} onChange={editUrlHandleChange} />
                <Button onClick={(url, index) => saveEditUrl(url, index)}><span className="glyphicon glyphicon-plus"></span></Button>
              </FormGroup>
              </Row>
            )
          }).reverse()}
          </Form>
          </Row>
      </center>
    </div>)
}

export default SettingsGreylistTab;


/*


<Button onClick={addUrl}>
  <span className="glyphicon glyphicon-plus"></span>
</Button>


<Button onClick={addUrl}>
  <span className="glyphicon glyphicon-plus"></span>
</Button>
*/
