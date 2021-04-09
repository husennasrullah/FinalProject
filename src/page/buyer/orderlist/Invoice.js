import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import OrderService from "../../../service/OrderService";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const options = {
  orientation: "landscape",
};

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.match.params.id,
      order: {},
      detailOrder: [],
    };
  }

  back = () => {
    this.props.history.push("/gromart-buyer/orderlist");
  };

  componentDidMount() {
    OrderService.getOrderById(this.state.orderId).then((res) => {
      this.setState({
        order: res.data,
        detailOrder: res.data.details,
      });
    });
  }
  render() {
    const { order, detailOrder } = this.state;
    return (
      <Container>
        <br />
        <Card>
          <div ref={ref}>
            <center>
              <Card.Header
                as="h3"
                style={{ backgroundColor: "#314e52", color: "white" }}
              >
                GROMART - INVOICE
              </Card.Header>
            </center>
            <Card.Body style={{ backgroundColor: "whitesmoke" }}>
              <Row>
                <Col md={4}>
                  <center>
                    <img
                      src="https://i.ibb.co/WB5MXwm/logo2.png"
                      style={{ width: "90%", marginTop: "6%" }}
                    />
                  </center>
                </Col>
                <Col md={4}>
                  <Card.Title>Bill To :</Card.Title>
                  <Card.Text>{order.userId}</Card.Text>
                  <Card.Text>{order.shippingAddress}</Card.Text>
                  <Card.Title>Ship To :</Card.Title>
                  <Card.Text>{order.userId}</Card.Text>
                </Col>
                <Col md={4}>
                  <Card.Title>ORDER ID :</Card.Title>
                  <Card.Text>{order.orderId}</Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Table>
                  <thead className="thead-dark">
                    <tr>
                      <th> Qty </th>
                      <th> Item</th>
                      <th> Unit Price</th>
                      <th> Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailOrder.map((item, idx) => (
                      <tr key={idx}>
                        <td> {item.quantity} items </td>
                        <td> {item.product.productName}</td>
                        <td>
                          Rp.
                          {item.product.unitPrice
                            .toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                          ,-
                        </td>
                        <td>
                          Rp.
                          {item.subTotal
                            .toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                          ,-
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <hr />
              <Row>
                <Col md={6}>
                  {order.status ? (
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
                  ) : (
                    <center>
                      <span style={{ fontSize: "5vh", fontFamily: "cambria" }}>
                        <i
                          class="far fa-clock"
                          style={{
                            marginRight: "10px",
                            color: "orange",
                          }}
                        ></i>
                        Requested
                      </span>
                    </center>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Row>
                      <Col md={5}>
                        <Form.Label as="h5">Grand Total</Form.Label>
                      </Col>
                      <Col md={{ span: 4, offset: 2 }}>
                        <Form.Label as="h5">
                          Rp.
                          {parseInt(order.totalAmount)
                            .toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                          ,-
                        </Form.Label>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </div>
          <Card.Footer style={{ backgroundColor: "#314e52" }}>
            <center>
              <Pdf targetRef={ref} filename="Invoice.pdf" options={options}>
                {({ toPdf }) => (
                  <Button variant="primary" onClick={toPdf}>
                    Download Invoice (.pdf)
                  </Button>
                )}
              </Pdf>

              <Button
                variant="danger"
                onClick={this.back}
                style={{ marginLeft: "10px" }}
              >
                Back
              </Button>
            </center>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

export default Invoice;
