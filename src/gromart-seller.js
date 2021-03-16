import React, { Component } from "react";
import Header from "./template/header/header";
import { Col, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { BuyerList, SalesOrderList } from "./page/Seller";
import Product from "./page/Seller/product";
import HomeSeller from "./page/Seller/homepage/HomeSeller";
import SideBar from "./template/sidebar/sidebar";
import "./App.css";
import Profile from "./page/profile/profile";

class GromartSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.match.path,
    };
  }
  render() {
    console.log("path :", this.state.path);
    return (
      <div>
        <Row noGutters>
          <Col xs={2} noGutters>
            <SideBar path={this.state.path} />
          </Col>
          <Col xs={10} noGutters>
            <Header path={this.state.path} />
            <Switch>
              <Route
                exact
                path={this.props.match.path}
                component={HomeSeller}
              />
              <Route
                exact
                path={`${this.props.match.path}/profile`}
                component={Profile}
              />
              <Route
                path={`${this.props.match.path}/product`}
                component={Product}
              />
              <Route
                path={`${this.props.match.path}/buyer`}
                component={BuyerList}
              />
              <Route
                path={`${this.props.match.path}/salesorder`}
                component={SalesOrderList}
              ></Route>
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GromartSeller;
