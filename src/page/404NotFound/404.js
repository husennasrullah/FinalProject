import React, { Component } from "react";
import { Container } from "react-bootstrap";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
        <img src="https://i.ibb.co/KhLJMh8/404.png" style={{ width: "30%" }} />
      </Container>
    );
  }
}

export default NotFound;
