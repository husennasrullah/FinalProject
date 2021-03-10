import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Login from "./page/login/login";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
        <div className="left">
          <Login />
        </div>
      </Container>
    );
  }
}

export default LoginPage;
