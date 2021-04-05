import { Modal, Form, FormControl, Row, Col, Button } from "react-bootstrap";
import React, { Component } from "react";

class ModalPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPass: "",
      newPass: "",
      newPass2: "",
    };
  }

  setValue = (el) => {
    this.setState({
      [el.target.name]: [el.target.value],
    });
  };
  render() {
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
                    value={this.state.oldPass}
                    name="oldPass"
                    onChange={this.setValue}
                    type="password"
                  ></FormControl>
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
                    value={this.state.newPass}
                    name="newPass"
                    onChange={this.setValue}
                    type="password"
                  ></FormControl>
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
                    value={this.state.newPass2}
                    name="newPass2"
                    onChange={this.setValue}
                    type="password"
                  ></FormControl>
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
