import {
  faBriefcase,
  faCartArrowDown,
  faCartPlus,
  faHome,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

import { Nav, Navbar, Form } from "react-bootstrap";
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
              <Form.Label
                style={{ color: "white", fontSize: "18px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faHome} className="mr-3" />
                Home
              </Form.Label>
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/orderlist`}>
              <Form.Label
                style={{ color: "white", fontSize: "18px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faListUl} className="mr-3" />
                OrderList
              </Form.Label>
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/cart`}>
              <Form.Label
                style={{ color: "white", fontSize: "18px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faCartPlus} className="mr-3" />
                Cart
              </Form.Label>
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SidebarBuyer;
