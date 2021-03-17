import React, { Component } from "react";

import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import RegistrasiService from "../../../service/RegistrasiService";

class ModalLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedBy: this.props.updateLimit.updatedBy,
      updatedDate: this.props.updateLimit.updatedDate,
      creditLimit: this.props.updateLimit.creditLimit,
      invoiceLimit: this.props.updateLimit.invoiceLimit,
    };
  }

  setLimit = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  updateLimit = (e) => {
    e.preventDefault();

    let update = {
      creditLimit: parseInt(this.state.creditLimit),
      invoiceLimit: parseInt(this.state.invoiceLimit),
      updatedBy: this.state.updatedBy,
      updatedDate: this.state.updatedDate,
    };

    RegistrasiService.updateLimit(update, this.props.updateLimit.userId)
      .then(() => {
        this.props.closeModal();
      })
      .catch((err) => {
        console.log(err.response);
        alert("Failed Update limit");
      });
  };

  render() {
    console.log(this.state);
    console.log(this.props.updateLimit.userId);
    return (
      <Modal
        size="md"
        show={this.props.isOpen}
        onHide={this.props.closeModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>UPDATE CREDIT & INVOICE LIMIT</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Form>
            <Form.Group>
              <Form.Row>
                <Col md={3}>
                  <Form.Label>Invoice Limit</Form.Label>
                </Col>
                <Col>
                  <FormControl
                    value={this.state.invoiceLimit}
                    name="invoiceLimit"
                    onChange={this.setLimit}
                  ></FormControl>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col md={3}>
                  <Form.Label>Credit Limit</Form.Label>
                </Col>
                <Col>
                  <FormControl
                    value={this.state.creditLimit}
                    name="creditLimit"
                    onChange={this.setLimit}
                  ></FormControl>
                </Col>
              </Form.Row>
            </Form.Group>

            <hr />
            <h6>Information :</h6>

            <Form.Row>
              <Col sm={4}>
                <Form.Label column sm>
                  Created Date
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.props.updateLimit.createdDate}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col sm={4}>
                <Form.Label column sm>
                  Updated By
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.props.updateLimit.updatedBy}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col sm={4}>
                <Form.Label column sm>
                  Updated Date
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.props.updateLimit.updatedDate}
                />
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.updateLimit}>
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

export default ModalLimit;
