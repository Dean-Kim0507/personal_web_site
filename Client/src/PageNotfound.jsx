import React from 'react';
import{Button} from 'react-bootstrap';
import './css/PageNotFound.css';

const PageNotFound = (props) => {
	return (
	  <div className="notfound">
		<h1>404 Page NOT FOUND</h1>
		<br></br>
		<Button variant="outline-danger" href='/home'>Back Home</Button>{' '}
	  </div>
	);
  };
  
  export default PageNotFound;