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
  Badge,
} from "react-bootstrap";
import { connect } from "react-redux";
import OrderService from "../../../service/OrderService";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.dataUser.userId,
      orders: [],
      page: 1,
      pagenow: 1,
      count: 0,
      limit: 5,
      Search: "",
      isSearch: false,
    };
  }

  viewInvoice = (orderId) => {
    this.props.history.push(`${this.props.match.path}/` + orderId);
  };

  getOrder(userId, page, limit) {
    OrderService.getOrderByUserID(userId, page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          orders: res.data.order,
          count: Math.ceil(page),
        });
      })
      .catch((err) => {
        alert("failed fetching data");
      });
  }

  componentDidMount() {
    this.getOrder(this.state.userId, this.state.page, this.state.limit);
  }
  render() {
    const { orders } = this.state;
    return (
      <Container fluid>
        <br />
        <div className="productTittle">
          <h2 className="text-center">Order-List</h2>
        </div>
        <hr />
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
          <Table responsive="sm">
            <thead className="thead-dark">
              <tr>
                <th> Order ID </th>
                <th> Order Date</th>
                <th> Total Paid</th>
                <th> Order Status</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.orderId}</td>
                  <td>{item.orderDate}</td>
                  <td>
                    Rp.
                    {item.totalAmount
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                    ,-
                  </td>
                  <td>
                    {item.status === false ? (
                      <Badge
                        pill
                        variant="warning"
                        style={{ fontSize: "2vh", fontFamily: "cambria" }}
                      >
                        Requested
                      </Badge>
                    ) : (
                      <Badge
                        pill
                        variant="success"
                        style={{ fontSize: "2vh", fontFamily: "cambria" }}
                      >
                        Paid
                      </Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="info"
                      onClick={() => this.viewInvoice(item.orderId)}
                    >
                      View Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Pagination
              page={this.state.pagenow}
              count={this.state.count}
              onChange={this.handleChange}
              color="primary"
            />
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statusLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

export default connect(mapStateToProps)(OrderList);

//export default OrderList;
