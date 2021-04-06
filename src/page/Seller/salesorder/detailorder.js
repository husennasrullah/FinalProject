import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import React, { Component } from "react";

class DetailOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isOpen, closeModal, detailOrder } = this.props;

    return (
      <Modal size="lg" show={isOpen} onHide={closeModal}>
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
            <Col md={4}>Order ID</Col>
            <Col>: {detailOrder.orderId}</Col>
          </Row>
          <Row>
            <Col md={4}>Order Date</Col>
            <Col>: {detailOrder.orderDate}</Col>
          </Row>
          <Row>
            <Col md={4}>Buyer Name </Col>
            <Col>
              : {detailOrder.user.firstName + " " + detailOrder.user.lastName}
            </Col>
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
                {detailOrder.details.map((item) => (
                  <tr>
                    <td> {item.product.productName}</td>
                    <td> {item.quantity}</td>
                    <td>
                      Rp.
                      {item.product.unitPrice
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                    <td>
                      Rp.
                      {item.subTotal
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <hr />
          <Row>
            <Col md={6}>
              <center>
                <span style={{ fontSize: "5vh", fontFamily: "cambria" }}>
                  <i
                    class="far fa-check-square"
                    style={{
                      marginRight: "10px",
                      color: "green",
                    }}
                  ></i>
                  {detailOrder.status ? "Paid" : "Unpaid"}
                </span>
              </center>
            </Col>
            <Col md={6}>
              <Row>
                <Col>
                  <h5>Total Payment</h5>
                </Col>
                <Col>
                  <h5>
                    Rp.
                    {detailOrder.totalAmount
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                  </h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>

        {/* <Modal.Body
          style={{ backgroundColor: "#314e52", textAlign: "center" }}
        ></Modal.Body> */}
      </Modal>
    );
  }
}

export default DetailOrder;
