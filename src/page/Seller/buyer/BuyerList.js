import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  FormControl,
  Container,
  Button,
} from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import RegistrasiService from "../../../service/RegistrasiService";
import ModalLimit from "./UpdateBuyerLimit";

class BuyerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      buyers: [],
      buyerList: [],
      updateLimit: {},
      page: 1,
      count: 0,
      limit: 5,
      Search: "",
    };
    this.valueSelect = "name";
  }

  openModal = (userId) => {
    this.setState({
      updateLimit: this.state.buyers.filter((buy) => buy.userId === userId)[0],
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleChange = (event, value) => {
    RegistrasiService.getBuyerPaging(value, this.state.limit).then((res) => {
      this.setState({
        page: value,
        buyers: res.data,
      });
    });
  };

  getCountPagination() {
    RegistrasiService.getCount()
      .then((res) => {
        let page = res.data / this.state.limit;
        this.setState({
          count: Math.ceil(page),
        });
      })
      .catch(() => {
        alert("Failed fetching data");
      });
  }

  //--------------------------------------------------------------
  onChangeSelect = (e) => {
    this.valueSelect = e.target.value;
  };

  setValueSearch = (e) => {
    this.setState({
      Search: e.target.value,
    });
  };

  Search = () => {
    if (this.state.Search === "") {
      RegistrasiService.getBuyerPaging(this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            buyers: res.data,
          });
        })
        .catch((err) => {
          alert("Failed Fetching Data");
        });
    } else {
      if (this.valueSelect === "id") {
        RegistrasiService.searchID(this.state.Search)
          .then((res) => {
            this.setState({
              buyers: res.data,
            });
          })
          .catch((err) => {
            alert("Failed Fetching Data id");
          });
      } else if (this.valueSelect === "name") {
        RegistrasiService.searchName(this.state.Search)
          .then((res) => {
            this.setState({
              buyers: res.data,
            });
          })
          .catch((err) => {
            alert("Failed Fetching Data nama");
          });
      }
    }
  };

  cancelSearch = (e) => {
    e.preventDefault();
    this.setState({
      Search: "",
      buyers: this.state.buyerList,
    });
  };
  //--------------------------------------------------------------

  componentDidMount() {
    RegistrasiService.getBuyerPaging(this.state.page, this.state.limit)
      .then((res) => {
        this.setState({
          buyers: res.data,
          buyerList: res.data,
        });
        this.getCountPagination();
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  render() {
    return (
      <Container fluid>
        {this.state.isOpen ? (
          <ModalLimit
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            updateLimit={this.state.updateLimit}
          />
        ) : null}

        <div className="productTittle">
          <h2 className="text-center">List of Buyer</h2>
        </div>
        <br />
        <div>
          <Row>
            <Col md={6}>
              <Form inline>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  onChange={this.onChangeSelect}
                >
                  <option value="name">User Name</option>
                  <option value="id">User ID</option>
                </Form.Control>
                <FormControl
                  type="text"
                  placeholder="Search......"
                  className="mr-sm-2"
                  onChange={this.setValueSearch}
                  value={this.state.Search}
                />
                <Button variant="outline-success" onClick={this.Search}>
                  Search
                </Button>
                <i
                  class="far fa-times-circle"
                  style={{
                    fontSize: "4vh",
                    color: "red",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={this.cancelSearch}
                ></i>
              </Form>
            </Col>
          </Row>
        </div>
        <br />
        <div>
          <table className="table table-striped table-borderes table-sm ">
            <thead className="thead-dark">
              <tr>
                <th> User ID</th>
                <th> Name</th>
                <th> Email</th>
                <th> Phone Number</th>
                <th> Credit Limit</th>
                <th> Invoice Limit</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.buyers.map((buyer, idx) => (
                <tr key={idx}>
                  <td> {buyer.userId}</td>
                  <td> {buyer.firstName + " " + buyer.lastName}</td>
                  <td> {buyer.email}</td>
                  <td> {buyer.phoneNumber}</td>
                  <td> Rp.{buyer.creditLimit},-</td>
                  <td> {buyer.invoiceLimit}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-success"
                      onClick={() => this.openModal(buyer.userId)}
                    >
                      Update Limit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Pagination
              count={this.state.count}
              page={this.state.page}
              onChange={this.handleChange}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default BuyerList;
