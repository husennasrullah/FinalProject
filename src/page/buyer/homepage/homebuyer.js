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
} from "react-bootstrap";

import ProductService from "../../../service/ProductService";
import { connect } from "react-redux";
import CartService from "../../../service/CartService";
import DetailShop from "./DetailShop";

class HomeBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      listProduct: [],
      search: "",
      page: "1",
      count: 0,
      limit: 8,
      isSearch: true,
      userid: this.props.dataUser.userId,
      cartId: "",
      isOpen: false,
      detailShop: "",
    };
  }

  addToCart = (productId, stock, qty) => {
    let addToCart = {
      cartId: this.state.cartId, //coba
      user: {
        userId: this.props.dataUser.userId,
      },
      orderDate: "2021-03-10",
      totalAmount: 100000,
      detail: [
        {
          product: {
            productId: productId,
            stock: stock,
          },
          quantity: qty,
          subTotal: 20000,
        },
      ],
    };

    CartService.addToCart(this.props.dataUser.userId, productId, addToCart)
      .then((res) => {
        alert("berhasil ");
        this.getCurrentCart();
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
        this.getProductPaging();
      } else {
        ProductService.searchByName(
          this.state.search,
          this.state.page,
          this.state.limit
        )
          .then((res) => {
            let page = res.data.qty / this.state.limit;
            this.setState({
              product: res.data.product,
              count: Math.ceil(page),
              isSearch: false,
            });
          })
          .catch((err) => {
            alert("Failed Fetching Data nama");
          });
      }
    } else {
      this.setState({
        search: "",
        product: this.state.listProduct,
        isSearch: true,
      });
      this.getProductPaging();
    }
  };

  setSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleChange = (event, value) => {
    ProductService.getProductPaging(value, this.state.limit).then((res) => {
      this.setState({
        page: value,
        product: res.data.product,
      });
    });
  };

  getProductPaging() {
    ProductService.getProductPaging(this.state.page, this.state.limit)
      .then((res) => {
        let page = res.data.qty / this.state.limit;
        this.setState({
          product: res.data.product,
          listProduct: res.data.product,
          count: Math.ceil(page),
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  getCurrentCart() {
    CartService.getCartByUserID(this.state.userid).then((res) => {
      console.log("pesan :", res.data.errorMessage);
      if (res.data.errorMessage === "No-Cart") {
      } else {
        this.setState({
          cartId: res.data.cartId,
        });
      }
    });
  }

  componentDidMount() {
    this.getProductPaging();
    this.getCurrentCart();
  }

  render() {
    console.log("CARTID :", this.state.cartId);
    return (
      <Container fluid style={{ backgroundColor: "#f2f4f7" }}>
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
                    <h2>Rp.100.000,-</h2>
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
                    <h2>5 Items</h2>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
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
                            <p>Stock Available : {prod.stock} items</p>
                            <p>Rp.{prod.unitPrice},-</p>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            variant="primary"
                            size="md"
                            style={{ width: "80%" }}
                            onClick={() =>
                              this.addToCart(prod.productId, prod.stock, 1)
                            }
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
              page={this.state.page}
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

export default connect(mapStateToProps)(HomeBuyer);

//export default HomeBuyer;
