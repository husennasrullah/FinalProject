import React, { Component } from "react";
import Header from "./template/header/header";
import { Col, Row } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import { BuyerList, SalesOrderList } from "./page/Seller";
import Product from "./page/Seller/product";
import HomeSeller from "./page/Seller/homepage/HomeSeller";
import SideBar from "./template/sidebar/sidebar";
import "./App.css";
import Profile from "./page/profile/profile";
import { connect } from "react-redux";

class GromartSeller extends Component {
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
      if (this.props.dataUser === "") {
        return <Redirect to="/login" />;
      }
      if (this.props.dataUser.userId.includes("Buyer")) {
        return <Redirect to="/gromart-buyer" />;
      }
    }
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

const mapStateToProps = (state) => {
  return {
    statusLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

export default connect(mapStateToProps)(GromartSeller);

//export default GromartSeller;
