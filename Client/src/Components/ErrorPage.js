/**
 * Error Number List
 * Err 100: upload by http communication fail
 */

import React from 'react';
import { Button } from 'react-bootstrap';
import '../css/errPage.css'

const ErrorPage = (props) => {
  let errNum = props.match.params.errNum;
  let errPage = props.match.params.errPage;
  let errMsg;

  if (errNum === '100') {
    errMsg = 'Error Number 100: Download by HTTP communication Fail';
  }
  else if (errNum === '101') {
    errMsg = 'Error Number 101: Upload by HTTP communication Fail';
  }
  console.log(errNum);


  return (
    <div>
      <h1>Error</h1>
      <h2>Please Post this error to the Community post</h2>
      <h4>Error Description: </h4>
      <h5 className="errMsg"> {errMsg}</h5>
      <h5 className="errPage"> Location: {errPage}</h5>
      <Button variant="outline-danger" href='/home'>Back Home</Button>{' '}
    </div>
  );
};

export default ErrorPage;