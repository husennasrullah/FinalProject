import React, { Component } from "react";
import { Navbar, Form, Nav } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">GROMART</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#product">LOGOUT</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
