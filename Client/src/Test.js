import React from "react";
import ReactDOM from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import "./styles.css";

const products = [
  { id: 1, name: "Item 1", price: 100 },
  { id: 2, name: "Item 2", price: 102 }
];

const Test = props => {
  const columns = [
    {
      dataField: "id",
      text: "Product ID"
    },
    {
      dataField: "name",
      text: "Product Name"
    },
    {
      dataField: "price",
      text: "Product Price"
    }
  ];
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="h2">Products</h1>
      <BootstrapTable keyField="id" data={products} columns={columns} />
    </div>
  );
};
export default Test;