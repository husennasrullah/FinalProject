import {
  Modal,
  Form,
  FormControl,
  Row,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
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
      showOldPass: false,
      showNewPass: false,
      showNewPass2: false,
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

  showPass = (name) => {
    console.log(name);
    if (name === "oldPass") {
      this.setState({
        showOldPass: true,
      });
    } else if (name === "newPass") {
      this.setState({
        showNewPass: true,
      });
    } else if (name === "newPass2") {
      this.setState({
        showNewPass2: true,
      });
    }
  };

  hidePass = (name) => {
    console.log(name);
    if (name === "oldPass") {
      this.setState({
        showOldPass: false,
      });
    } else if (name === "newPass") {
      this.setState({
        showNewPass: false,
      });
    } else if (name === "newPass2") {
      this.setState({
        showNewPass2: false,
      });
    }
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
      showOldPass,
      showNewPass,
      showNewPass2,
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
                  <InputGroup className="mb-3">
                    <FormControl
                      value={oldPass}
                      name="oldPass"
                      onChange={this.setValue}
                      type={showOldPass ? "text" : "password"}
                      isInvalid={errorOldPass}
                    ></FormControl>
                    <InputGroup.Prepend style={{ cursor: "pointer" }}>
                      <InputGroup.Text>
                        {showOldPass ? (
                          <i
                            class="far fa-eye-slash"
                            onClick={() => this.hidePass("oldPass")}
                          />
                        ) : (
                          <i
                            class="far fa-eye"
                            onClick={() => this.showPass("oldPass")}
                          />
                        )}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        Password must be 6 in alphanumeric and at least 1
                        uppercase letter
                      </Form.Control.Feedback>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={3}>
                  <Form.Label>New Password</Form.Label>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <FormControl
                      value={newPass}
                      name="newPass"
                      onChange={this.setValue}
                      type={showNewPass ? "text" : "password"}
                      isInvalid={errorNewPass}
                    ></FormControl>
                    <InputGroup.Prepend>
                      <InputGroup.Text style={{ cursor: "pointer" }}>
                        {showNewPass ? (
                          <i
                            class="far fa-eye-slash"
                            onClick={() => this.hidePass("newPass")}
                          />
                        ) : (
                          <i
                            class="far fa-eye"
                            onClick={() => this.showPass("newPass")}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control.Feedback type="invalid">
                      Password must be 6 in alphanumeric and at least 1
                      uppercase letter
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={3}>
                  <Form.Label>Re-Enter New Password</Form.Label>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <FormControl
                      value={newPass2}
                      name="newPass2"
                      onChange={this.setValue}
                      type={showNewPass2 ? "text" : "password"}
                      isInvalid={errorNewPass2}
                    ></FormControl>
                    <InputGroup.Prepend>
                      <InputGroup.Text style={{ cursor: "pointer" }}>
                        {showNewPass2 ? (
                          <i
                            class="far fa-eye-slash"
                            onClick={() => this.hidePass("newPass2")}
                          />
                        ) : (
                          <i
                            class="far fa-eye"
                            onClick={() => this.showPass("newPass2")}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control.Feedback type="invalid">
                      Not Equals to new Password
                    </Form.Control.Feedback>
                  </InputGroup>
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
