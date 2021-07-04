import React from "react";
import ReactDOM from "react-dom";
// import Head from "./Head";
import Body from "./Body";
import Head from "./Head";
// import Footer from "./Footer";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
	<div className="body">
		<Provider store={store}>
			<Head />
			<Body />
			{/* <Footer /> */}
		</Provider>
	</div>,
	document.querySelector("#container")
);