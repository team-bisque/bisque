import React from 'react';

export default function Header (props) {
  const working = props.working;
  return (
    working
      ? <h1>Work, damn you!</h1>
      : <h1>Go Outside!</h1>
  );
}
