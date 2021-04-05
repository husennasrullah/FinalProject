import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Cart from "./page/buyer/cart/Cart";
import HomeBuyer from "./page/buyer/homepage/homebuyer";
import Invoice from "./page/buyer/orderlist/Invoice";
import Order from "./page/buyer/orderlist/order";
import OrderList from "./page/buyer/orderlist/orderlist";
import profile from "./page/profile/profile";
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
    if (!this.props.statusLogin) {
      return <Redirect to="/login" />;
    } else {
      if (this.props.dataUser.userId.includes("Seller")) {
        return <Redirect to="/gromart" />;
      }
    }
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
                exact
                path={`${this.props.match.path}/profile`}
                component={profile}
              />
              <Route
                path={`${this.props.match.path}/orderlist`}
                component={Order}
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

const mapStateToProps = (state) => {
  return {
    statusLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

export default connect(mapStateToProps)(GromartBuyer);

//export default GromartBuyer;
