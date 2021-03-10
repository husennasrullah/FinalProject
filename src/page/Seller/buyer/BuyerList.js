import React, { Component } from "react";
import { Row, Col, Form, FormControl, Container } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import RegistrasiService from "../../../service/RegistrasiService";

class BuyerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyers: [],
    };
  }

  componentDidMount() {
    RegistrasiService.getBuyer()
      .then((res) => {
        this.setState({
          buyers: res.data,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  render() {
    return (
      <Container fluid>
        <div className="productTittle">
          <h2 className="text-center">List of Buyer</h2>
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
          </Row>
        </div>
        <br />
        <div>
          <table className="table table-striped table-borderes table-sm ">
            <thead className="thead-dark">
              <tr>
                <th> No </th>
                <th> User ID</th>
                <th> Name</th>
                <th> Email</th>
                <th> Phone Number</th>
                <th> Credit Limit</th>
                <th> Invoice Limit</th>
                <th> Created-Date</th>
                <th> Updated-By</th>
                <th> Updated-Date</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.buyers.map((buyer, idx) => (
                <tr>
                  <td> {idx + 1}</td>
                  <td> {buyer.userId}</td>
                  <td> {buyer.firstName + " " + buyer.lastName}</td>
                  <td> {buyer.email}</td>
                  <td> {buyer.phoneNumber}</td>
                  <td> Rp.{buyer.creditLimit},-</td>
                  <td> {buyer.invoiceLimit}</td>
                  <td> {buyer.createdDate}</td>
                  <td> {buyer.updatedBy}</td>
                  <td> {buyer.updatedDate}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-success"
                    >
                      Update Limit
                    </button>
                  </td>
                </tr>
              ))}
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

export default BuyerList;
