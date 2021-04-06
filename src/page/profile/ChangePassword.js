import { Modal, Form, FormControl, Row, Col, Button } from "react-bootstrap";
import React, { Component } from "react";

class ModalPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPass: "",
      newPass: "",
      newPass2: "",
      errorOldPass: false,
      errorNewPass: false,
      errorNewPass2: false,
    };
  }

  setValue = (el) => {
    this.setState(
      {
        [el.target.name]: el.target.value,
      },
      () => this.checkValidation(event.target.name)
    );
  };

  checkValidation = (name) => {
    const { oldPass, newPass, newPass2 } = this.state;
    let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6}$/;

    if (name === "oldPass") {
      if (!regPass.test(oldPass)) {
        this.setState({
          errorOldPass: true,
        });
      } else {
        this.setState({
          errorOldPass: false,
        });
      }
    } else if (name === "newPass") {
      if (!regPass.test(newPass)) {
        this.setState({
          errorNewPass: true,
        });
      } else {
        this.setState({
          errorNewPass: false,
        });
      }
    } else if (name === "newPass2") {
      console.log(!newPass2 === newPass);
      if (!(newPass2 === newPass)) {
        this.setState({
          errorNewPass2: true,
        });
      } else {
        this.setState({
          errorNewPass2: false,
        });
      }
    }
  };

  render() {
    console.log(this.state);
    const {
      oldPass,
      newPass,
      newPass2,
      errorOldPass,
      errorNewPass,
      errorNewPass2,
    } = this.state;
    return (
      <Modal
        size="md"
        show={this.props.isOpen}
        onHide={this.props.closeModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PASSWORD</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Form>
            <Form.Group>
              <Form.Row>
                <Col md={3}>
                  <Form.Label>Old Password</Form.Label>
                </Col>
                <Col>
                  <FormControl
                    value={oldPass}
                    name="oldPass"
                    onChange={this.setValue}
                    type="password"
                    isInvalid={errorOldPass}
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Password must be 6 in alphanumeric and at least 1 uppercase
                    letter
                  </Form.Control.Feedback>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={3}>
                  <Form.Label>New Password</Form.Label>
                </Col>
                <Col>
                  <FormControl
                    value={newPass}
                    name="newPass"
                    onChange={this.setValue}
                    type="password"
                    isInvalid={errorNewPass}
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Password must be 6 in alphanumeric and at least 1 uppercase
                    letter
                  </Form.Control.Feedback>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={3}>
                  <Form.Label>Re-Enter New Password</Form.Label>
                </Col>
                <Col>
                  <FormControl
                    value={newPass2}
                    name="newPass2"
                    onChange={this.setValue}
                    type="password"
                    isInvalid={errorNewPass2}
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Not Equals to new Password
                  </Form.Control.Feedback>
                </Col>
              </Form.Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => this.props.changePassword(this.state)}
          >
            Change
          </Button>
          <Button variant="danger" onClick={() => this.props.closeModal()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalPassword;
