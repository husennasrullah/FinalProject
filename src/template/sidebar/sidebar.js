import React, { Component } from "react";
import "./style.css";
import { Form, Nav, Navbar } from "react-bootstrap";
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
            <Link to={`${this.props.path}/product`}>
              <Form.Label
                style={{ color: "white", fontSize: "18px", cursor: "pointer" }}
              >
                {" "}
                <FontAwesomeIcon icon={faBriefcase} className="mr-3" />
                Product
              </Form.Label>
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/buyer`}>
              <Form.Label
                style={{ color: "white", fontSize: "18px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faListUl} className="mr-3" />
                List of Buyer
              </Form.Label>
            </Link>
          </Nav.Item>
          <br />
          <Nav.Item>
            <Link to={`${this.props.path}/salesorder`}>
              <Form.Label
                style={{ color: "white", fontSize: "18px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faMoneyBill} className="mr-3" />
                Sales Order
              </Form.Label>
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SideBar;
