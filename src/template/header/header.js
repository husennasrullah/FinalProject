import React, { Component } from "react";
import { Navbar, Form, Nav, NavDropdown } from "react-bootstrap";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <Nav.Link href="#product">Welcome Husen Nasrullah</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title="Husen Nasrullah" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to={`${this.props.path}/profile`}>Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
          <FontAwesomeIcon
            icon={faUserCircle}
            className="mr-3"
            style={{ fontSize: "30px" }}
          />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
