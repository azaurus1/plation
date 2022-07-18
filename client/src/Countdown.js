import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

export default function CountdownTimer(props) {
  return (
    <React.Fragment>
        <Countdown date={Date.now() + 86400000}/>
    </React.Fragment>
  );
}