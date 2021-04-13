import React, { Component } from "react";
import {
  Col,
  Row,
  Form,
  FormControl,
  Container,
  Navbar,
  Badge,
} from "react-bootstrap";
import ProductService from "../../../service/ProductService";
import ModalForm from "./detailProduct";
import "./style.css";
import Pagination from "@material-ui/lab/Pagination";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      listProduct: [],
      productDetail: {},
      isOpen: false,
      valueSelect: "name",

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

  deleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ProductService.deleteProduct(productId).then((res) => {
          this.getProductPaging(this.state.page, this.state.limit);
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  openModal = (productId) => {
    this.setState({
      productDetail: this.state.productList.filter(
        (prod) => prod.productId === productId
      ),
      isOpen: true,
    });
  };

  closeModal = () => this.setState({ isOpen: false });

  addProduct = () => {
    this.props.history.push("/gromart/product/add");
  };

  editProduct = (productId) => {
    this.props.history.push(`/gromart/product/${productId}`);
  };

  handleChange = (e, value) => {
    e.preventDefault();
    this.setState({
      page: value,
    });

    if (!this.state.isSearch) {
      this.getProductPaging(value, this.state.limit);
    } else {
      if (this.valueSelect === "id") {
        this.searchById(this.state.Search, value, this.state.limit);
      } else if (this.valueSelect === "name") {
        this.searchByName(this.state.Search, value, this.state.limit);
      }
    }
  };

  onChangeSelect = (e) => {
    this.setState({
      valueSelect: e.target.value,
    });
    this.valueSelect = e.target.value;
  };

  onChangeLimit = (e) => {
    e.preventDefault();
    this.setState({
      limit: e.target.value,
    });
    this.getProductPaging(this.state.page, e.target.value);
  };

  setValueSearch = (e) => {
    this.setState({
      Search: e.target.value,
    });
  };

  setValueStatus = (e) => {
    this.setState({
      valueStatus: e.target.value,
    });
  };

  Search = () => {
    if (this.state.Search === "") {
      this.getProductPaging(this.state.pagenow, this.state.limit);
    } else {
      if (this.valueSelect === "id") {
        this.searchById(
          this.state.Search,
          this.state.pagenow,
          this.state.limit
        );
      } else if (this.valueSelect === "name") {
        this.searchByName(
          this.state.Search,
          this.state.pagenow,
          this.state.limit
        );
      } else if (this.valueSelect === "status") {
        this.searchByStatus(
          this.state.Search,
          this.state.pagenow,
          this.state.limit
        );
      }
    }
  };

  searchById = (search, page, limit) => {
    ProductService.searchById(search, page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          productList: res.data.product,
          count: Math.ceil(page),
          isSearch: true,
          page: 1,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data nama");
      });
  };

  searchByName = (search, page, limit) => {
    ProductService.searchByName(search, page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          productList: res.data.product,
          count: Math.ceil(page),
          isSearch: true,
          page: 1,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data nama");
      });
  };

  searchByStatus = (search, page, limit) => {
    ProductService.searchByStatus(search, page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          productList: res.data.product,
          count: Math.ceil(page),
          isSearch: true,
          page: 1,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data nama");
      });
  };

  cancelSearch = (e) => {
    this.setState({
      Search: "",
      productList: this.state.listProduct,
      isSearch: false,
    });
    this.getProductPaging(this.state.pagenow, this.state.limit);
  };

  getProductPaging(page, limit) {
    ProductService.getProductPaging(page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          productList: res.data.product,
          listProduct: res.data.product,
          count: Math.ceil(page),
          isSearch: false,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  Rupiah = (money) => {
    let value =
      "Rp. " +
      money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +
      ",-";
    return value;
  };

  componentDidMount() {
    this.getProductPaging(this.state.page, this.state.limit);
  }

  render() {
    const { valueSelect } = this.state;
    let FormFilter;
    if (valueSelect === "name" || valueSelect === "id") {
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
            <option value="1">Active</option>
            <option value="0">In-Active</option>
          </Form.Control>
        </>
      );
    }
    return (
      <Container fluid>
        {this.state.isOpen ? (
          <ModalForm
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            handleSubmit={this.handleSubmit}
            productDetail={this.state.productDetail}
          />
        ) : null}
        <br />

        <div className="productTittle">
          <h2 className="text-center">List of Product</h2>
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
                  <option value="name">Product Name</option>
                  <option value="id">Product ID</option>
                  <option value="status">Status</option>
                </Form.Control>
                {FormFilter}

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
            <Col md={{ span: 1, offset: 5 }}>
              <i
                class="fas fa-plus-circle"
                style={{ fontSize: "4vh", color: "green", cursor: "pointer" }}
                onClick={this.addProduct}
              ></i>
            </Col>
          </Row>
        </div>
        <br />
        <div>
          <table
            className="table table-striped table-borderes table-sm"
            style={{ textAlign: "center", fontSize: "2vh" }}
          >
            <thead className="thead-dark">
              <tr>
                <th> Product-ID</th>
                <th> Product-Name</th>
                <th> Category</th>
                <th> Price</th>
                <th> Stock</th>
                <th> Status</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.productList.map((prod, idx) => (
                <tr key={idx}>
                  <td> {prod.productId}</td>
                  <td> {prod.productName}</td>
                  <td> {prod.category}</td>
                  <td>{this.Rupiah(prod.unitPrice)}</td>
                  <td> {prod.stock} items</td>
                  <td>
                    {prod.status ? (
                      <Badge variant="primary">Active</Badge>
                    ) : (
                      <Badge variant="secondary">In-active</Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => this.openModal(prod.productId)}
                    >
                      <i
                        class="fas fa-info-circle"
                        style={{ marginRight: "1em" }}
                      />
                      Detail
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.editProduct(prod.productId)}
                    >
                      <i class="fas fa-edit" style={{ marginRight: "1em" }} />
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="danger"
                      size="sm"
                      onClick={() => this.deleteProduct(prod.productId)}
                    >
                      <i
                        class="fas fa-trash-alt"
                        style={{ marginRight: "1em" }}
                      />
                      Delete
                    </Button>
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

export default ProductList;
