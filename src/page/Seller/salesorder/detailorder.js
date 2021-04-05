import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import React, { Component } from "react";

class DetailOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#314e52" }}>
          <Modal.Title as="h2" style={{ color: "white" }}>
            Detail Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="show-grid"
          style={{ backgroundColor: "#faf9f9" }}
        >
          <Row>
            <Col>Order ID</Col>
            <Col>: 2312312/3123123/fsdljc/</Col>
          </Row>
          <Row>
            <Col>Buyer Name </Col>
            <Col>: Husen Nasrullah</Col>
          </Row>
          <hr />
          <Row>
            <Table striped>
              <thead>
                <tr>
                  <th> Item </th>
                  <th> Quantity</th>
                  <th> unit Price </th>
                  <th> subTotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Kopiko</td>
                  <td> 3 items</td>
                  <td> Rp.10.000,- </td>
                  <td> Rp.30.000,-</td>
                </tr>
                <tr>
                  <td> Kopiko</td>
                  <td> 3 items</td>
                  <td> Rp.10.000,- </td>
                  <td> Rp.30.000,-</td>
                </tr>
                <tr>
                  <td> Kopiko</td>
                  <td> 3 items</td>
                  <td> Rp.10.000,- </td>
                  <td> Rp.30.000,-</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <hr />
          <Row>
            <Col md={5}>
              <center>
                <span style={{ fontSize: "5vh", fontFamily: "cambria" }}>
                  <i
                    class="far fa-check-square"
                    style={{
                      marginRight: "10px",
                      color: "green",
                    }}
                  ></i>
                  Paid
                </span>
              </center>
            </Col>
            <Col md={7}></Col>
          </Row>
        </Modal.Body>
        <Modal.Body style={{ backgroundColor: "#314e52", textAlign: "center" }}>
          <Button variant="success">Approve Order</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default DetailOrder;
