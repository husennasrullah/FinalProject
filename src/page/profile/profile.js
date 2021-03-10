import React, { Component } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Form>
          <Form.Group>
            <i
              class="fas fa-user-circle"
              style={{ fontSize: "8vh", marginRight: "15px" }}
            ></i>
            <Form.Label style={{ fontSize: "6vh", fontFamily: "cambria" }}>
              Husen Nasrullah
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Role
              </Form.Label>
              <Col>
                <Form.Control size="md" type="text" disabled />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                First Name
              </Form.Label>
              <Col>
                <Form.Control size="md" type="text" disabled />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Last Name
              </Form.Label>
              <Col>
                <Form.Control size="md" type="text" disabled />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Address
              </Form.Label>
              <Col>
                <Form.Control size="md" type="text" disabled />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Email Address
              </Form.Label>
              <Col>
                <Form.Control size="md" type="text" disabled />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Phone Number
              </Form.Label>
              <Col>
                <Form.Control size="md" type="text" disabled />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>

        <Button variant="primary">Change Profile</Button>
        <Button variant="primary" style={{ marginLeft: "10px" }}>
          Change Password
        </Button>
        <Button variant="danger" style={{ marginLeft: "10px" }}>
          Back
        </Button>
      </Container>
    );
  }
}

export default Profile;
