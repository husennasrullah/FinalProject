import React, { Component } from "react";
import { Navbar, Form, Nav, NavDropdown } from "react-bootstrap";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("header :", this.props.dataUser.firstName);

    return (
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <Nav.Link href="#product">
            WELCOME -{" "}
            {this.props.dataUser.firstName + " " + this.props.dataUser.lastName}
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            title={
              this.props.dataUser.firstName + " " + this.props.dataUser.lastName
            }
            id="collasible-nav-dropdown"
          >
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

const mapStateToProps = (state) => {
  return {
    statusLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

export default connect(mapStateToProps)(Header);

//export default Header;
