import React, { Component } from "react";
import { Col, Row, Form, FormControl } from "react-bootstrap";
import ProductService from "../../../service/ProductService";
import ModalForm from "./detailProduct";
import "./style.css";
import Pagination from "@material-ui/lab/Pagination";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      productDetail: {},
      isOpen: false,
      page: 1,
      count: 0,
      limit: 5,
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
    this.props.history.push("/add-product/add");
  };

  editProduct = (productId) => {
    this.props.history.push(`/add-product/${productId}`);
  };

  handleChange = (event, value) => {
    let limit = 5;
    ProductService.getProductPaging(value, limit).then((res) => {
      this.setState({
        productList: res.data,
      });
    });
  };

  onChangeSelect = (el) => {
    this.valueSelect = el.target.value;
    // console.log("apa :", this.valueSelect);
  };

  onChangeSearch = (el) => {
    const nilai = el.target.value;

    if (nilai === "") {
      ProductService.getProductPaging(this.state.activePage, 5)
        .then((res) => {
          this.setState({
            productList: res.data,
          });
        })
        .catch((err) => {
          alert("Failed Fetching Data");
        });
    } else if (this.valueSelect === "id") {
      ProductService.getProductById(nilai)
        .then((res) => {
          this.setState({
            productList: res.data,
          });
        })
        .catch((err) => {
          alert("Failed Fetching Data");
        });
    } else if (this.valueSelect === "nama") {
      ProductService.getProductByName(nilai)
        .then((res) => {
          this.setState({
            productList: res.data,
          });
        })
        .catch((err) => {
          alert("Failed Fetching Data");
        });
    }
  };

  componentDidMount() {
    ProductService.getProductPaging(this.state.page, this.state.limit)
      .then((res) => {
        this.setState({
          productList: res.data,
        });
        this.getCountPagination();
        s;
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  getCountPagination() {
    ProductService.getCount()
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

  render() {
    console.log("dataDetail :", this.state.productDetail);
    console.log("data state :", this.state.productList);

    return (
      <div className="product">
        {this.state.isOpen ? (
          <ModalForm
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            handleSubmit={this.handleSubmit}
            productDetail={this.state.productDetail}
          />
        ) : null}

        <div className="productTittle">
          <h2 className="text-center">LIST OF PRODUCTS</h2>
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
                  onChange={(el) => this.onChangeSearch(el)}
                />
                {/* <Button variant="outline-success">Search</Button> */}
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
          <table className="table table-striped table-borderes table-md ">
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
                  <td> {prod.unitPrice}</td>
                  <td> {prod.stock}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => this.openModal(prod.productId)}
                    >
                      Detail
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-success"
                      onClick={() => this.editProduct(prod.productId)}
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-danger"
                      onClick={() => this.deleteProduct(prod.productId)}
                    >
                      Delete
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
      </div>
    );
  }
}

export default ProductList;
