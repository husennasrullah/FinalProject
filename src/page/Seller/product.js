import React, { Component } from "react";
import ProductList from "./product/productList";
import CreateProduct from "./product/createProduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailProduct from "./product/detailProduct";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={ProductList}></Route>
            <Route path="/product" component={ProductList}></Route>
            <Route path="/add-product/:id" component={CreateProduct}></Route>
            <Route path="/detail-product/:id" component={DetailProduct}></Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default Product;
