import Pagination from "@material-ui/lab/Pagination";
import React, { Component } from "react";
import {
  Col,
  Form,
  FormControl,
  Row,
  Button,
  Container,
  Table,
} from "react-bootstrap";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
        <div className="productTittle">
          <h2 className="text-center">Order-List</h2>
        </div>
        <br />
        <div>
          <Row>
            <Col md={6}>
              <Form inline>
                <Form.Control as="select" className="mr-sm-2">
                  <option value="name">Product Name</option>
                  <option value="id">Product ID</option>
                </Form.Control>

                <FormControl
                  type="text"
                  placeholder="Search......"
                  className="mr-sm-2"
                />
              </Form>
            </Col>
            <Col md={{ span: 1, offset: 5 }}>
              <i
                class="fas fa-plus-circle"
                style={{ fontSize: "4vh", color: "green", cursor: "pointer" }}
              ></i>
            </Col>
          </Row>
        </div>
        <br />
        <div>
          <Table responsive="sm">
            <thead className="thead-dark">
              <tr>
                <th> No </th>
                <th> Order ID </th>
                <th> Order Date</th>
                <th> Total Paid</th>
                <th> Order Status</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td> 3132123</td>
                <td> 2021-11-26</td>
                <td> Rp.60.000,-</td>
                <td> unpaid</td>
                <td>
                  <Button variant="success">Pay</Button>
                  <Button style={{ marginLeft: "10px" }} variant="info">
                    View Invoice
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <div>
            <Pagination count={4} color="primary" />
          </div>
        </div>
      </Container>
    );
  }
}

export default OrderList;
