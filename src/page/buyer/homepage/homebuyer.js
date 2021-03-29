import React, { Component } from "react";

import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Carousel,
} from "react-bootstrap";

import ProductService from "../../../service/ProductService";
import { connect } from "react-redux";
import CartService from "../../../service/CartService";
import DetailShop from "./DetailShop";
import RegistrasiService from "../../../service/RegistrasiService";

class HomeBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      listProduct: [],

      //-----------searh, filter, and pagination----------------
      search: "",
      page: 1,
      pagenow: 1,
      count: 0,
      limit: 8,
      isSearch: true,
      sort: "low",

      //-------- Cart --------------------------------
      userid: this.props.dataUser.userId,
      cartId: "",
      isOpen: false,
      detailShop: "",
    };
  }

  addToCart = (productId, qty) => {
    let addToCart = {
      cartId: this.state.cartId, //coba
      user: {
        userId: this.props.dataUser.userId,
      },
      totalAmount: 100000,
      detail: [
        {
          product: {
            productId: productId,
          },
          quantity: qty,
        },
      ],
    };

    CartService.addToCart(this.props.dataUser.userId, productId, addToCart)
      .then((res) => {
        alert("Successfully added item to cart");
        this.getCurrentCart(this.state.userid);
      })
      .catch((err) => {
        console.log("error :", err.response.data);
        alert(err.response.data);
      });
  };

  detailShop = (productId) => {
    this.setState({
      detailShop: this.state.product.filter(
        (prod) => prod.productId === productId
      ),
      isOpen: true,
    });
  };

  closeModal = () => this.setState({ isOpen: false });

  searchProduct = () => {
    if (this.state.isSearch) {
      if (this.state.search === "") {
        this.getProductPaging(this.state.page, this.state.limit);
      } else {
        this.searchByName(this.state.search, this.state.page, this.state.limit);
      }
    } else {
      this.getProductPaging(this.state.page, this.state.limit);
    }
  };

  searchByName = (search, page, limit) => {
    ProductService.searchByName(search, page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          product: res.data.product,
          count: Math.ceil(page),
          isSearch: false,
          pagenow: 1,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data nama");
      });
  };

  setSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  sortProduct = (e) => {
    if (e.target.value === "low") {
      let product = this.state.product.sort((a, b) =>
        a.unitPrice > b.unitPrice ? 1 : -1
      );
      this.setState({
        product: product,
      });
    } else {
      let product = this.state.product.sort((a, b) =>
        a.unitPrice < b.unitPrice ? 1 : -1
      );
      this.setState({
        product: product,
      });
    }
  };

  handleChange = (event, value) => {
    this.setState({
      pagenow: value,
    });
    if (this.state.isSearch) {
      this.getProductPaging(value, this.state.limit);
    } else {
      this.searchByName(this.state.Search, value, this.state.limit);
    }
  };

  getProductPaging(page, limit) {
    ProductService.getProductPaging(page, limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          product: res.data.product,
          listProduct: res.data.product,
          count: Math.ceil(page),
          isSearch: true,
          search: "",
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  getCurrentCart(userId) {
    CartService.getCartByUserID(userId).then((res) => {
      console.log("pesan :", res.data.errorMessage);
      if (res.data.errorMessage === "No-Cart") {
      } else {
        this.setState({
          cartId: res.data.cartId,
        });
      }
    });
  }

  getNewDataUser(userId) {
    RegistrasiService.getBuyerByID(userId)
      .then((res) => {
        this.props.changeLogin(res.data);
      })
      .catch((err) => {
        alert("Failed Fetch Data");
      });
  }

  componentDidMount() {
    this.getProductPaging(this.state.page, this.state.limit);
    this.getCurrentCart(this.state.userid);
    this.getNewDataUser(this.state.userid);
  }

  render() {
    console.log("datauser :", this.props.dataUser);
    console.log(this.state.search);

    return (
      <Container fluid style={{ backgroundColor: "#f8f4e1" }}>
        {this.state.isOpen ? (
          <DetailShop
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            detailShop={this.state.detailShop}
            addToCart={this.addToCart}
          />
        ) : null}

        <br />
        <Row>
          <Col md={3}>
            <Card
              bg="warning"
              text=""
              className="mb-2"
              style={{ textAlign: "center" }}
            >
              <Card.Header>
                <Card.Title> CREDIT LIMIT </Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <i
                      class="fas fa-wallet"
                      style={{ fontSize: "6vh", color: "white" }}
                    ></i>
                  </Col>
                  <Col md={8}>
                    <h2>
                      Rp.
                      {this.props.dataUser.creditLimit
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                      ,-
                    </h2>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <br />
            <Card
              bg="success"
              text=""
              className="mb-2"
              style={{ textAlign: "center" }}
            >
              <Card.Header>
                <Card.Title> INVOICE LIMIT </Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <i
                      class="fab fa-sellsy"
                      style={{ fontSize: "6vh", color: "white" }}
                    ></i>
                  </Col>
                  <Col md={8}>
                    <h2>{this.props.dataUser.invoiceLimit} Transaction</h2>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <br />
            <Carousel fade>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100"
                  src="https://i.ibb.co/F6qy0wj/img1.png"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100"
                  src="https://i.ibb.co/sb8999b/img2.png"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ height: "400px" }}>
                <img
                  className="d-block w-100"
                  src="https://i.ibb.co/K99ScDT/img3.png"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col md={9}>
            <Form>
              <Form.Row className="align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Name
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    as="select"
                    onChange={this.sortProduct}
                  >
                    <option value="low">Price - Low to High</option>
                    <option value="high">Price - High to Low</option>
                  </Form.Control>
                </Col>
                <Col md={9}>
                  <InputGroup className="mb-2">
                    <FormControl
                      placeholder="search your product"
                      onChange={this.setSearch}
                      value={this.state.search}
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        style={{ cursor: "pointer" }}
                        onClick={this.searchProduct}
                      >
                        {this.state.isSearch ? (
                          <i class="fas fa-search"></i>
                        ) : (
                          <i class="fas fa-times-circle"></i>
                        )}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
              </Form.Row>
            </Form>
            <hr />
            <Container>
              <center>
                <Row>
                  {this.state.product.map((prod, idx) => (
                    <Col key={idx} xs={3}>
                      <Card>
                        <Card.Body
                          style={{ cursor: "pointer" }}
                          onClick={() => this.detailShop(prod.productId)}
                        >
                          <i
                            class="fas fa-camera-retro"
                            style={{ fontSize: "11vh" }}
                          ></i>
                          <Card.Title>{prod.productName}</Card.Title>
                          <Card.Text>
                            {prod.stock == 0 ? (
                              <Button variant="danger" disabled>
                                Out of Stock
                              </Button>
                            ) : (
                              <p>Stock Available : {prod.stock} items</p>
                            )}
                            <p>
                              Rp.
                              {prod.unitPrice
                                .toString()
                                .replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  "."
                                )}
                              ,-
                            </p>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            variant="primary"
                            size="md"
                            style={{ width: "80%" }}
                            onClick={() => this.addToCart(prod.productId, 1)}
                            disabled={prod.stock === 0}
                          >
                            add to cart
                          </Button>
                        </Card.Footer>
                      </Card>
                      <br />
                    </Col>
                  ))}
                </Row>
              </center>
            </Container>
            <Pagination
              color="primary"
              count={this.state.count}
              page={this.state.pagenow}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
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

const mapDispatchToProps = (dispatch) => ({
  changeLogin: (payload) => dispatch({ type: "LOGIN_SUCCESS", payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeBuyer);

//export default HomeBuyer;
