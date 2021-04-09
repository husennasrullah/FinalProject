import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  FormControl,
  Container,
  Badge,
  Button,
} from "react-bootstrap";
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
      isOpen: false,
      isSearch: false,
      valueSelect: "id",
      startDate: "",
      toDate: "",
    };
  }

  handleChange = (e, value) => {
    e.preventDefault();
    this.setState({
      pagenow: value,
    });

    if (!this.state.isSearch) {
      this.getAllOrder(value, this.state.limit);
    } else {
      if (this.state.valueSelect === "id") {
        this.searchByOrderId(this.state.search, value, this.state.limit);
      } else if (this.state.valueSelect === "status") {
        this.searchByStatus(this.state.search, value, this.state.limit);
      }
    }
  };

  Search = () => {
    if (this.state.Search === "") {
      this.getAllOrder(this.state.page, this.state.limit);
    } else {
      if (this.state.valueSelect === "product") {
      } else if (this.state.valueSelect === "id") {
        this.searchByOrderId(
          this.state.search,
          this.state.page,
          this.state.limit
        );
      } else if (this.state.valueSelect === "status") {
        this.searchByStatus(
          this.state.search,
          this.state.page,
          this.state.limit
        );
      }
    }
  };

  searchDate = () => {
    if (this.state.startDate === "" || this.state.toDate === "") {
      this.getAllOrder(this.state.page, this.state.limit);
    } else {
      alert("sadas");
      this.searchByDate(
        this.state.startDate,
        this.state.toDate,
        this.state.page,
        this.state.limit
      );
    }
  };

  searchByOrderId = (orderId, page, limit) => {
    OrderService.searchByOrderId(orderId, page, limit).then((res) => {
      let page = res.data.qty / this.state.limit;
      this.setState({
        order: res.data.order,
        count: Math.ceil(page),
        isSearch: true,
        page: 1,
      });
    });
  };

  searchByStatus = (status, page, limit) => {
    OrderService.searchByStatus(status, page, limit)
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

  searchByDate = (startDate, toDate, page, limit) => {
    OrderService.searchByDate(startDate, toDate, page, limit)
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

  onChangeSelect = (e) => {
    this.setState({
      valueSelect: e.target.value,
    });
  };

  changeLimit = (e) => {
    e.preventDefault();
    this.setState({
      limit: e.target.value,
    });
    this.getAllOrder(this.state.page, e.target.value);
  };

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

  setDate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  cancelSearch = (e) => {
    this.setState({
      search: "",
      isSearch: false,
    });
    this.getAllOrder(this.state.page, this.state.limit);
  };

  onChangeLimit = (e) => {};

  openModal = (orderId) => {
    this.setState({
      detailOrder: this.state.order.filter(
        (item) => item.orderId === orderId
      )[0],
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  getAllOrder(page, limit) {
    OrderService.getAllOrder(page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          order: res.data.order,
          count: Math.ceil(page),
          isSearch: false,
        });
      })
      .catch((err) => {
        alert("failed fetching data");
      });
  }

  componentDidMount() {
    this.getAllOrder(this.state.page, this.state.limit);
  }

  render() {
    console.log(this.state.valueSelect);
    console.log(this.state.toDate);
    const { valueSelect, order } = this.state;
    let FormFilter;
    if (valueSelect === "product" || valueSelect === "id") {
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
    } else if (valueSelect === "date") {
      FormFilter = (
        <>
          <Form.Label className="ml-sm-3 mr-sm-3">Start</Form.Label>
          <FormControl
            name="startDate"
            type="Date"
            className="mr-sm-3"
            onChange={this.setDate}
          />
          <Form.Label className="mr-sm-3">To</Form.Label>
          <FormControl
            name="toDate"
            type="Date"
            className="mr-sm-3"
            onChange={this.setDate}
          />
        </>
      );
    }

    return (
      <Container fluid>
        {this.state.isOpen ? (
          <DetailOrder
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            detailOrder={this.state.detailOrder}
            userId={this.props.data}
          />
        ) : null}
        <br />
        <div className="productTittle">
          <h2 className="text-center">Sales Order List</h2>
        </div>
        <br />
        <div>
          <Row>
            <Col>
              <Form inline>
                <Form.Control
                  as="select"
                  className="mr-sm-3"
                  onChange={this.onChangeSelect}
                >
                  <option value="id">Order ID</option>
                  {/* <option value="product">Product Name</option> */}
                  <option value="status">Status</option>
                  <option value="date">Date</option>
                </Form.Control>
                {FormFilter}
                {valueSelect === "date" ? (
                  <Button
                    variant="outline-success"
                    className="mr-sm-3"
                    onClick={this.searchDate}
                  >
                    Filter
                  </Button>
                ) : (
                  <Button
                    variant="outline-success"
                    onClick={this.Search}
                    className="mr-sm-2"
                  >
                    Search
                  </Button>
                )}

                {this.state.isSearch ? (
                  <i
                    class="far fa-times-circle"
                    style={{
                      fontSize: "4vh",
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    onClick={this.cancelSearch}
                  ></i>
                ) : null}
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
                    <center>
                      <Button
                        variant="info"
                        onClick={() => this.openModal(item.orderId)}
                      >
                        <i
                          class="fas fa-info-circle"
                          style={{ marginRight: "1em" }}
                        />
                        Detail
                      </Button>
                      {!item.status ? (
                        <Button
                          style={{ marginLeft: "10px" }}
                          className="btn btn-success"
                          onClick={() =>
                            this.approveOrder(item.orderId, item.user.userId)
                          }
                        >
                          <i
                            class="fas fa-thumbs-up"
                            style={{ marginRight: "1em" }}
                          />
                          Approve
                        </Button>
                      ) : null}
                    </center>
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
                onChange={this.changeLimit}
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
