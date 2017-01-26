import React from 'react';

export default function Header (props) {
  const status = props.status;
  return (
    status.work
      ? <h1>Work, damn you!</h1>
      : <h1>Go Outside!</h1>
  );
}
