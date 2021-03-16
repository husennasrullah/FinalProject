import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";
import { Route, Switch } from "react-router";
import Cart from "./page/buyer/cart/Cart";
import HomeBuyer from "./page/buyer/homepage/homebuyer";
import OrderList from "./page/buyer/orderlist/orderlist";
import Header from "./template/header/header";
import SideBar from "./template/sidebar/sidebar";
import SidebarBuyer from "./template/sidebar/sidebar2";

class GromartBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.match.path,
    };
  }
  render() {
    return (
      <div>
        <Row noGutters>
          <Col xs={2} noGutters>
            <SidebarBuyer path={this.state.path} />
          </Col>
          <Col xs={10} noGutters>
            <Header path={this.state.path} />
            <Switch>
              <Route exact path={this.props.match.path} component={HomeBuyer} />
              <Route
                path={`${this.props.match.path}/orderlist`}
                component={OrderList}
              />
              <Route
                path={`${this.props.match.path}/cart`}
                component={Cart}
              ></Route>
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GromartBuyer;
