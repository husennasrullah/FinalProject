import React, { Component } from "react";
import "./style.css";
import { Nav, Navbar } from "react-bootstrap";
import {
  faHome,
  faBriefcase,
  faMoneyBill,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class SideBar extends Component {
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
            <Link to={`${this.props.path}/product`}>
              <FontAwesomeIcon icon={faBriefcase} className="mr-3" />
              Product
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/buyer`}>
              <FontAwesomeIcon icon={faListUl} className="mr-3" />
              List of Buyer
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/salesorder`}>
              <FontAwesomeIcon icon={faMoneyBill} className="mr-3" />
              Sales Order
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SideBar;