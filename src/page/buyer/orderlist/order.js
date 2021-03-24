import React, { Component } from "react";
import { Route } from "react-router";
import Invoice from "./Invoice";
import orderlist from "./orderlist";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Route exact path={this.props.match.path} component={orderlist} />
        <Route path={`${this.props.match.path}/:id`} component={Invoice} />
      </>
    );
  }
}

export default Order;
