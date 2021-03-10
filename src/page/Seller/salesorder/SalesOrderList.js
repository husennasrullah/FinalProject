import React, { Component } from "react";
import { Row, Col, Form, FormControl, Container } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";

class SalesOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <div className="productTittle">
          <h2 className="text-center">SALES ORDER LIST</h2>
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
          <table className="table table-striped table-borderes table-md ">
            <thead className="thead-dark">
              <tr>
                <th> No </th>
                <th> Order ID </th>
                <th> User ID</th>
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
                <td> Buyer-31231231</td>
                <td> 2021-11-26</td>
                <td> Rp.60.000,-</td>
                <td> unpaid</td>
                <td>
                  <button className="btn btn-info">Detail</button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-success"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Pagination count={4} color="primary" />
          </div>
        </div>
      </Container>
    );
  }
}

export default SalesOrderList;
