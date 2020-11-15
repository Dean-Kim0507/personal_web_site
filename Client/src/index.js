import React from "react";
import ReactDOM from "react-dom";
// import Head from "./Head";
import Body from "./Body";
import Head from "./Head";
// import Footer from "./Footer";
import Test from './Test.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';


ReactDOM.render(
	<div className="body">
		<Head/>
		<Body/>
		{/* <Test/> */}
		{/* <Footer/> */}
	</div>,
	document.querySelector("#container")
);