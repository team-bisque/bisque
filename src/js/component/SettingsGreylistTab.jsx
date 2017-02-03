import React from 'react';

const SettingsGreylistTab = (props) => {
  const {listUrls} = props;
  return (
    <div>
      <ul>
        {listUrls.map((url, index) => {
          return (
            <li key={index}>{url}</li>
          )
        })}
      </ul>
    </div>)
}

export default SettingsGreylistTab;
