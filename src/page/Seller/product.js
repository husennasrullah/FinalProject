import React, { Component } from "react";
import ProductList from "./product/productList";
import CreateProduct from "./product/createProduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.match.path,
    };
  }
  render() {
    console.log("path :", this.state.path);
    return (
      <>
        <Route exact path={this.props.match.path} component={ProductList} />
        <Route
          path={`${this.props.match.path}/:id`}
          component={CreateProduct}
        />
      </>
    );
  }
}

export default Product;
