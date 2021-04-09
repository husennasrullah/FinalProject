import React, { Component } from "react";

import { Modal, Col, Button, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import RegistrasiService from "../../../service/RegistrasiService";

class ModalLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedBy: "",
      updatedDate: "",
      creditLimit: "",
      invoiceLimit: "",
      errorCreditLimit: false,
      errorInvoiceLimit: false,
    };
  }

  setLimit = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.checkValidation(e.target.name)
    );
  };

  checkValidation = (name) => {
    const { creditLimit, invoiceLimit } = this.state;
    if (name === "creditLimit") {
      if (creditLimit < 0) {
        this.setState({
          errorCreditLimit: true,
        });
      } else {
        this.setState({
          errorCreditLimit: false,
        });
      }
    } else if (name === "invoiceLimit") {
      if (invoiceLimit < 0) {
        this.setState({
          errorInvoiceLimit: true,
        });
      } else {
        this.setState({
          errorInvoiceLimit: false,
        });
      }
    }
  };

  updateLimit = (e) => {
    e.preventDefault();

    if (this.state.creditLimit === "" && this.state.invoiceLimit === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All Field Must be Filled",
      });
    } else if (this.state.errorCreditLimit || this.state.errorInvoiceLimit) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Check Your Form",
      });
    } else {
      let update = {
        creditLimit: parseInt(this.state.creditLimit),
        invoiceLimit: parseInt(this.state.invoiceLimit),
        updatedBy: this.props.dataUser.userId,
      };
      RegistrasiService.updateLimit(update, this.props.updateLimit.userId)
        .then(() => {
          this.props.closeModal();
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed update data",
          });
        });
    }
  };

  componentDidMount() {
    this.setState({
      updatedBy: this.props.updateLimit.updatedBy,
      updatedDate: this.props.updateLimit.updatedDate,
      creditLimit: this.props.updateLimit.creditLimit,
      invoiceLimit: this.props.updateLimit.invoiceLimit,
    });
  }

  render() {
    console.log(this.state);

    const { errorCreditLimit, errorInvoiceLimit } = this.state;
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
                    type="number"
                    value={this.state.invoiceLimit}
                    name="invoiceLimit"
                    onChange={this.setLimit}
                    isInvalid={errorInvoiceLimit}
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Invoice limit can't be negative
                  </Form.Control.Feedback>
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
                    type="number"
                    value={this.state.creditLimit}
                    name="creditLimit"
                    onChange={this.setLimit}
                    isInvalid={errorCreditLimit}
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Credit limit can't be negative
                  </Form.Control.Feedback>
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

const mapStateToProps = (state) => {
  return {
    dataUser: state.Auth.users,
  };
};

export default connect(mapStateToProps)(ModalLimit);
