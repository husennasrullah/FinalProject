import React, { Component } from "react";
import { Col, Row, Form, FormControl, Container } from "react-bootstrap";
import ProductService from "../../../service/ProductService";
import ModalForm from "./detailProduct";
import "./style.css";
import Pagination from "@material-ui/lab/Pagination";
import { Button } from "react-bootstrap";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      listProduct: [],
      productDetail: {},
      isOpen: false,

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
    if (confirm("apakah anda yakin ingin menghapus data ?")) {
      ProductService.deleteProduct(productId).then((res) => {
        this.setState({
          productList: this.state.productList.filter(
            (prod) => prod.productId !== productId
          ),
          listProduct: this.state.listProduct.filter(
            (prod) => prod.productId !== productId
          ),
        });
      });
    }
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
    this.valueSelect = e.target.value;
  };

  setValueSearch = (e) => {
    this.setState({
      Search: e.target.value,
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

  componentDidMount() {
    this.getProductPaging(this.state.page, this.state.limit);
  }

  render() {
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
            className="table table-striped table-borderes table-sm "
            style={{ textAlign: "center" }}
          >
            <thead className="thead-dark">
              <tr>
                <th> Product-ID</th>
                <th> Product-Name</th>
                <th> Category</th>
                <th> Price</th>
                <th> Stock</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.productList.map((prod, idx) => (
                <tr key={idx}>
                  <td> {prod.productId}</td>
                  <td> {prod.productName}</td>
                  <td> {prod.category}</td>
                  <td>
                    Rp.
                    {prod.unitPrice
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                  </td>
                  <td> {prod.stock}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => this.openModal(prod.productId)}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="success"
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.editProduct(prod.productId)}
                    >
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="danger"
                      onClick={() => this.deleteProduct(prod.productId)}
                    >
                      Delete
                    </Button>
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

export default ProductList;
