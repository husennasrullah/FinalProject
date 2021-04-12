import React, { Component } from "react";
import gambar from "./gambar.jpg";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";

export default class ModalForm extends Component {
  Rupiah = (money) => {
    let value =
      "Rp. " +
      money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +
      ",-";
    return value;
  };

  render() {
    return (
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#314e52" }}>
          <Modal.Title style={{ color: "white" }}>DETAIL PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="show-grid"
          style={{ backgroundColor: "#faf9f9" }}
        >
          {this.props.productDetail.map((detail) => (
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <img src={gambar} width="180" height="200"></img>
                </Col>
                <Col xs={6} md={8}>
                  <h2>{detail.productName}</h2>
                  <p>{detail.category}</p>
                  <hr />
                  <h6>{detail.description}</h6>
                  <h2>{this.Rupiah(detail.unitPrice)}</h2>
                </Col>
              </Row>
            </Container>
          ))}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#314e52" }}>
          <Button variant="primary" onClick={() => this.props.closeModal()}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
