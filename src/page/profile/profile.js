import React, { Component } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };
  }

  changePassword = () => {};

  changeProfile = () => {};

  back = () => {
    this.props.history.push("/gromart/");
  };

  render() {
    return (
      <Container>
        <br />
        <Form>
          <Form.Group>
            <i
              class="fas fa-user-circle"
              style={{ fontSize: "8vh", marginRight: "15px" }}
            ></i>
            <Form.Label style={{ fontSize: "6vh", fontFamily: "cambria" }}>
              {this.props.dataUser.firstName +
                " " +
                this.props.dataUser.lastName}
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Role
              </Form.Label>
              <Col>
                <Form.Control
                  name="role"
                  size="md"
                  type="text"
                  value={this.props.dataUser.role}
                  disabled
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                First Name
              </Form.Label>
              <Col>
                <Form.Control
                  name="firstName"
                  size="md"
                  type="text"
                  value={this.props.dataUser.firstName}
                  disabled
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Last Name
              </Form.Label>
              <Col>
                <Form.Control
                  name="lastName"
                  size="md"
                  type="text"
                  value={this.props.dataUser.lastName}
                  disabled
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Email Address
              </Form.Label>
              <Col>
                <Form.Control
                  name="email"
                  size="md"
                  type="text"
                  value={this.props.dataUser.email}
                  disabled
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Phone Number
              </Form.Label>
              <Col>
                <Form.Control
                  name="phoneNumber"
                  size="md"
                  type="text"
                  value={this.props.dataUser.phoneNumber}
                  disabled
                />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
        <br />
        <Button variant="primary" onClick={this.changeProfile}>
          Change Profile
        </Button>
        <Button
          variant="primary"
          onClick={this.changePassword}
          style={{ marginLeft: "10px" }}
        >
          Change Password
        </Button>
        <Button
          variant="danger"
          onClick={this.back}
          style={{ marginLeft: "10px" }}
        >
          Back
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statusLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

export default connect(mapStateToProps)(Profile);

//export default Profile;
