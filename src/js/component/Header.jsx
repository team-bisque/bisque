import React from 'react';

export default function Header (props) {
  const {work} = props.status;
  return (
    work
      ? <h1>Work, damn you!</h1>
      : <h1>Go Outside!</h1>
  );
}
