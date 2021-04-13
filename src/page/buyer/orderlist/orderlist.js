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
      search: "",
      isSearch: false,
      valueSelect: "id",
    };
  }

  handleChange = (e, value) => {
    e.preventDefault();
    this.setState({
      pagenow: value,
    });

    if (!this.state.isSearch) {
      this.getOrder(this.state.userId, value, this.state.limit);
    } else {
      if (this.state.valueSelect === "id") {
        this.searchByOrderId(
          this.state.userId,
          this.state.search,
          value,
          this.state.limit
        );
      } else if (this.state.valueSelect === "status") {
        this.searchByStatus(
          this.state.userId,
          this.state.search,
          value,
          this.state.limit
        );
      }
    }
  };

  onChangeSelect = (e) => {
    this.setState({
      valueSelect: e.target.value,
    });
  };

  setValueSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

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
          isSearch: false,
          page: 1,
        });
      })
      .catch((err) => {
        alert("failed fetching data");
      });
  }

  Search = () => {
    if (this.state.Search === "") {
      this.getOrder(this.state.userId, this.state.page, this.state.limit);
    } else {
      if (this.state.valueSelect === "id") {
        alert("Dasdasd");
        this.searchByOrderId(
          this.state.userId,
          this.state.search,
          this.state.page,
          this.state.limit
        );
      } else if (this.state.valueSelect === "status") {
        this.searchByStatus(
          this.state.userId,
          this.state.search,
          this.state.page,
          this.state.limit
        );
      }
    }
  };

  searchByStatus = (userId, status, page, limit) => {
    OrderService.searchByStatusForBuyer(userId, status, page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          order: res.data.order,
          count: Math.ceil(page),
          isSearch: true,
          page: 1,
        });
      })
      .catch((err) => {
        alert("failed Fetch Data");
      });
  };

  searchByOrderId = (userId, orderId, page, limit) => {
    OrderService.searchByIdForBuyer(userId, orderId, page, limit).then(
      (res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          order: res.data.order,
          count: Math.ceil(page),
          isSearch: true,
          page: 1,
        });
      }
    );
  };

  Rupiah = (money) => {
    let value =
      "Rp. " +
      money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +
      ",-";
    return value;
  };

  componentDidMount() {
    this.getOrder(this.state.userId, this.state.page, this.state.limit);
  }
  render() {
    const { orders, valueSelect } = this.state;
    let FormFilter;
    if (valueSelect === "id") {
      FormFilter = (
        <>
          <FormControl
            type="text"
            placeholder="Search......"
            className="mr-sm-2"
            onChange={this.setValueSearch}
            value={this.state.Search}
          />
        </>
      );
    } else if (valueSelect === "status") {
      FormFilter = (
        <>
          <Form.Control
            as="select"
            className="mr-sm-2"
            onChange={this.setValueSearch}
          >
            <option value="1">Paid</option>
            <option value="0">Unpaid</option>
          </Form.Control>
        </>
      );
    }
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
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  onChange={this.onChangeSelect}
                >
                  <option value="id"> OrderID</option>
                  <option value="status"> Status</option>
                </Form.Control>

                {FormFilter}
                <Button
                  variant="outline-success"
                  onClick={this.Search}
                  className="mr-sm-2"
                >
                  Search
                </Button>
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
                  <td>{this.Rupiah(item.totalAmount)}</td>
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
                      size="sm"
                      onClick={() => this.viewInvoice(item.orderId)}
                    >
                      View Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="paging">
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
