import React, { Component } from "react";
import { Row, Col, Form, FormControl, Container, Badge } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import OrderService from "../../../service/OrderService";
import DetailOrder from "./detailorder";

class SalesOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      detailOrder: [],
      page: 1,
      pagenow: 1,
      limit: 5,
      count: 0,
      search: "",
      isOpen: true,
    };
  }

  approveOrder = (orderId, userId) => {
    let update = {
      orderId: orderId,
      user: {
        userId: userId,
      },
      status: true,
    };
    let newData = this.state.order.map((el) => {
      if (el.orderId === orderId)
        return Object.assign({}, el, {
          status: true,
        });
      return el;
    });

    OrderService.updateStatus(update)
      .then((res) => {
        console.log("newData :", newData);
        this.setState({
          order: newData,
        });
      })
      .catch((err) => {
        alert("Failed update Data");
      });
  };

  setValueSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  onChangeLimit = (e) => {};

  getAllOrder(page, limit) {
    OrderService.getAllOrder(page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          order: res.data.order,
          count: Math.ceil(page),
        });
      })
      .catch((err) => {
        alert("failed fetching data");
      });
  }

  componentDidMount() {
    this.getAllOrder(this.state.pagenow, this.state.limit);
  }
  render() {
    console.log("tesssss : ", this.state.order);
    const { order } = this.state;
    return (
      <Container fluid>
        {this.state.isOpen ? (
          <DetailOrder
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
          />
        ) : null}
        <br />
        <div className="productTittle">
          <h2 className="text-center">Sales Order List</h2>
        </div>
        <br />
        <div>
          <Row>
            <Col md={6}>
              <Form inline>
                <Form.Control as="select" className="mr-sm-2">
                  <option value="name">Product Name</option>
                  <option value="buyer">Buyer Name</option>
                  <option value="status">Status</option>
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
          <table className="table table-striped table-borderes table-md ">
            <thead className="thead-dark">
              <tr>
                <th> Order ID </th>
                <th> Buyer Name</th>
                <th> Order Date</th>
                <th> Total Paid</th>
                <th> Order Status</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody>
              {order.map((item, idx) => (
                <tr key={idx}>
                  <td> {item.orderId}</td>
                  <td> {item.user.firstName + " " + item.user.lastName}</td>
                  <td> {item.orderDate}</td>
                  <td>
                    Rp.
                    {item.totalAmount
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                  </td>
                  <td>
                    {item.status ? (
                      <Badge
                        pill
                        variant="success"
                        style={{ fontSize: "2vh", fontFamily: "cambria" }}
                      >
                        Paid
                      </Badge>
                    ) : (
                      <Badge
                        pill
                        variant="warning"
                        style={{ fontSize: "2vh", fontFamily: "cambria" }}
                      >
                        Unpaid
                      </Badge>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-info">Detail</button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-success"
                      onClick={() =>
                        this.approveOrder(item.orderId, item.user.userId)
                      }
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="paging">
            <Form inline>
              <Form.Label className="mr-sm-4">Limit :</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-4"
                onChange={this.onChangeLimit}
              >
                <option value="5">5 Data</option>
                <option value="10">10 Data</option>
                <option value="15">15 Data</option>
              </Form.Control>
              <Pagination
                count={this.state.count}
                page={this.state.pagenow}
                onChange={this.handleChange}
                variant="outlined"
                shape="rounded"
              />
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

export default SalesOrderList;
