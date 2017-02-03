import React from 'react';

import {
  Row,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

const SettingsGreylistTab = (props) => {
  const {
    urlList,
    newUrlHandleChange,
    editUrlHandleChange
  } = props;
  return (
    <div>
      <Form inline>
        <center>
          <Row>
            <FormControl key={'add'} type="text" value={''} onChange={newUrlHandleChange} />
            {urlList.map((url, index) => {
              return (
                <FormControl key={index} type="text" value={url} onChange={(url, index) => editUrlHandleChange(url, index)} />
              )
            }).reverse()}
          </Row>
        </center>
      </Form>
    </div>)
}

export default SettingsGreylistTab;
