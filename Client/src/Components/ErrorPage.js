import React from 'react';
import {Button} from 'react-bootstrap';

const ErrorPage = (props) => {
  return (
    <div>
      <h1>Error</h1>
      <h2>Please Post this error to the Community post</h2>
      <Button variant="outline-danger" href='/home'>Back Home</Button>{' '}
    </div>
  );
};

export default ErrorPage;