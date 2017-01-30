import React from 'react';

export default function Header (props) {
  const status = props.status;
  return (
    status && status.isWorking
      ? <h1 id="status">Work, damn you!</h1>
    : <h1 id="status">Go Outside!</h1>
  );
}
