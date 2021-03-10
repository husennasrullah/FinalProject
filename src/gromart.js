import React, { Component } from "react";
import Header from "../src/template/header/header";
import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BuyerList, ProductList, SalesOrderList } from "./page/Seller";
import Product from "./page/Seller/product";
import HomeSeller from "./page/Seller/homepage/HomeSeller";
import Profile from "./page/profile/profile";
import HomeBuyer from "./page/buyer/homepage/homebuyer";
import Cart from "./page/buyer/cart/Cart";
import { Row, Col } from "react-bootstrap";

class Gromart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="containerName">
          <div>
            <Header />
          </div>
          <div className="containerDown">
            <div className="sideMenu">
              <ul>
                <li>
                  <Link to="/profile">profile</Link>
                </li>
                <li>
                  <Link to="/home">HomeSeller</Link>
                </li>
                <li>
                  <Link to="/product">Product</Link>
                </li>
                <li>
                  <Link to="/buyer">Buyer</Link>
                </li>
                <li>
                  <Link to="/salesorder">Sales Order</Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to="/homee">Home Buyer</Link>
                </li>
                <li>
                  <Link to="/orderlist">Order-List</Link>
                </li>
                <li>
                  <Link to="/Cart">Cart</Link>
                </li>
              </ul>
            </div>

            <div className="contentBody">
              <Switch>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/home" component={HomeSeller}></Route>
                <Route path="/product" component={Product}></Route>
                <Route path="/buyer" component={BuyerList}></Route>
                <Route path="/salesorder" component={SalesOrderList}></Route>

                <Route path="/homee" component={HomeBuyer}></Route>
                {/* <Route path="/orderlist" component={OrderList}></Route> */}
                <Route path="/cart" component={Cart}></Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Gromart;
