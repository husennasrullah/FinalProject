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

      //---pagination and search---
      page: 1,
      pagenow: 1,
      count: 0,
      limit: 5,
      Search: "",
      isSearch: false,
      //------------
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
    this.getBuyerPaging(this.state.page, this.state.limit);
  };

  handleChange = (event, value) => {
    e.preventDefault();
    this.setState({
      page: value,
    });

    if (!this.state.isSearch) {
      this.getBuyerPaging(value, this.state.limit);
    } else {
      if (this.valueSelect === "id") {
        this.searchID(this.state.Search, value, this.state.limit);
      } else if (this.valueSelect === "name") {
        this.searchName(this.state.Search, value, this.state.limit);
      }
    }
  };

  //--------------------------------------------------------------
  onChangeSelect = (e) => {
    this.valueSelect = e.target.value;
  };

  onChangeLimit = (e) => {};

  setValueSearch = (e) => {
    this.setState({
      Search: e.target.value,
    });
  };

  Search = () => {
    if (this.state.Search === "") {
      this.getBuyerPaging(this.state.pagenow, this.state.limit);
    } else {
      if (this.valueSelect === "id") {
        this.searchID(this.state.Search, this.state.pagenow, this.state.limit);
      } else if (this.valueSelect === "name") {
        this.searchName(
          this.state.Search,
          this.state.pagenow,
          this.state.limit
        );
      }
    }
  };

  cancelSearch = (e) => {
    e.preventDefault();
    this.setState({
      Search: "",
      buyers: this.state.buyerList,
      isSearch: false,
    });
  };
  //--------------------------------------------------------------

  searchID = (search, page, limit) => {
    RegistrasiService.searchID(search, page, limit)
      .then((res) => {
        this.setState({
          buyers: res.data.user,
          count: Math.ceil(page),
          isSearch: true,
          page: 1,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data id");
      });
  };

  searchName = (search, page, limit) => {
    RegistrasiService.searchName(search, page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          buyers: res.data.user,
          ount: Math.ceil(page),
          isSearch: true,
          page: 1,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data nama");
      });
  };

  getBuyerPaging(page, limit) {
    RegistrasiService.getBuyerPaging(page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          buyers: res.data.user,
          buyerList: res.data.user,
          count: Math.ceil(page),
          isSearch: false,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  componentDidMount() {
    this.getBuyerPaging(this.state.page, this.state.limit);
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
        <br />

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
                  <option value="name">First Name</option>
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
                {this.state.isSearch ? (
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
                ) : null}
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
                  <td>
                    Rp.
                    {buyer.creditLimit
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                  </td>
                  <td> {buyer.invoiceLimit}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-success"
                      onClick={() => this.openModal(buyer.userId)}
                    >
                      <i class="fas fa-edit" style={{ marginRight: "1em" }} />
                      Update Limit
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
                page={this.state.page}
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

export default BuyerList;
