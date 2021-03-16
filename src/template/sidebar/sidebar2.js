import {
  faBriefcase,
  faCartArrowDown,
  faCartPlus,
  faHome,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class SidebarBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="sidebar">
        <Nav className="flex-column pt-2">
          <Navbar.Brand href="#home" style={{ textAlign: "center" }}>
            <img
              src="https://i.ibb.co/d5q6VxJ/logo.png"
              style={{ width: "60%" }}
            />
          </Navbar.Brand>
          <br />

          <Nav.Item className="active">
            <Link to={this.props.path}>
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Home
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/orderlist`}>
              <FontAwesomeIcon icon={faListUl} className="mr-3" />
              OrderList
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/cart`}>
              <FontAwesomeIcon icon={faCartPlus} className="mr-3" />
              Cart
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SidebarBuyer;
