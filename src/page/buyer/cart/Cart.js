import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import CartService from "../../../service/CartService";
import ShippingService from "../../../service/ShippingService";
import ItemCounter from "./ItemCounter";

const CounterBtn = (props) => {
  return (
    <Button variant="primary" onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: [],
      shippingFee: 0,
      cart: [],
      detailCart: [],
      cartId: "",
      userid: this.props.dataUser.userId,
      isThereCart: false,
      qty: 0,
    };
  }

  incrementCounter = () => {
    this.setState(({ qty }) => ({
      qty:
        qty < this.props.detailShop[0].stock
          ? qty + 1
          : this.props.detailShop[0].stock,
    }));
  };

  decrementCounter = () => {
    this.setState(({ qty }) => ({
      qty: qty > 0 ? qty - 1 : 0,
    }));
  };

  checkout = () => {};

  deleteItem = (detailId) => {
    if (confirm("are you sure to delete item ?")) {
      CartService.deleteItem(this.state.cartId, detailId).then((res) => {
        this.setState({
          detailCart: this.state.detailCart.filter(
            (car) => car.detailId !== detailId
          ),
        });

        if (this.state.detailCart.length === 0) {
          this.setState({
            isThereCart: false,
          });
        }
      });
    }
  };

  setShipping = (e) => {
    this.setState({
      shippingFee: [e.target.value],
    });
  };

  startShopping = () => {
    this.props.history.push("/gromart-buyer/");
  };

  componentDidMount() {
    CartService.getCartByUserID(this.state.userid).then((res) => {
      console.log("pesan :", res.data.errorMessage);
      if (res.data.errorMessage === "No-Cart") {
        this.setState({
          isThereCart: false,
        });
      } else {
        this.setState({
          isThereCart: true,
          cart: res.data,
          detailCart: res.data.detail,
          cartId: res.data.cartId,
        });
      }
    });

    ShippingService.getShipping()
      .then((res) => {
        this.setState({
          shipping: res.data,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data Shipper");
      });
  }
  render() {
    const { detailCart, cart } = this.state;
    console.log("detailCart :", detailCart);
    console.log("cart:", cart);
    return (
      <Container fluid>
        <div>
          <h2>Shopping Cart</h2>
        </div>
        <br />
        <Container fluid>
          <Card border="success">
            <Card.Header as="h5">
              <Row sm>
                <Col sm={9}>
                  <h4>Item Detail</h4>
                </Col>
                <Col sm={3}>
                  <h4>Summary</h4>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={8}>
                  {this.state.isThereCart ? (
                    <div className="overflow-auto" style={{ height: "400px" }}>
                      <table className="table table-sm ">
                        <thead className="thead-dark">
                          <th> Product </th>
                          <th> Quantity </th>
                          <th> unit Price </th>
                          <th> SubTotal </th>
                          <th></th>
                        </thead>
                        <tbody>
                          {detailCart.map((cart, idx) => (
                            <tr key={idx}>
                              <td>
                                <i
                                  class="far fa-image"
                                  style={{ fontSize: "10vh" }}
                                ></i>
                                <p>{cart.product.productName}</p>
                              </td>
                              <td>
                                <ItemCounter
                                  qty={cart.quantity}
                                  stock={cart.product.stock}
                                />

                                {/* <InputGroup
                                  className="mb-3"
                                  style={{ width: "130px" }}
                                >
                                  <InputGroup.Prepend
                                    style={{ cursor: "pointer" }}
                                  >
                                    <InputGroup.Text>-</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl value={cart.quantity} />
                                  <InputGroup.Append
                                    style={{ cursor: "pointer" }}
                                  >
                                    <InputGroup.Text>+</InputGroup.Text>
                                  </InputGroup.Append>
                                </InputGroup> */}
                              </td>
                              <td>Rp.{cart.product.unitPrice},-</td>
                              <td>
                                Rp.
                                {parseInt(cart.product.unitPrice) *
                                  parseInt(cart.quantity)}
                                ,-
                              </td>
                              <td>
                                <i
                                  class="fas fa-trash-alt"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => this.deleteItem(cart.detailId)}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div>
                      <center>
                        <div className="art">
                          <img src="https://i.ibb.co/805bstz/emptycart.png" />
                        </div>
                        <h4>Add Some Product In The Cart :(</h4>
                        <br />
                        <Button variant="success" onClick={this.startShopping}>
                          Start Shopping
                        </Button>
                      </center>
                    </div>
                  )}
                </Col>
                <Col sm={4}>
                  <Form>
                    <Form.Group>
                      <Form.Row>
                        <Col md={5}>
                          <Form.Label as="h6">
                            {detailCart.length} items
                          </Form.Label>
                        </Col>
                        <Col md={{ span: 3, offset: 3 }}>
                          <Form.Label>Rp.{cart.totalAmount},-</Form.Label>
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label as="h6">Shipping Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        style={{ height: "130px" }}
                        placeholder="your address....."
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Row>
                        <Col md={3}>
                          <Form.Label as="h6">Shipping</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            name="shippingFee"
                            onChange={this.setShipping}
                          >
                            <option disabled selected value>
                              --select an option--
                            </option>
                            {this.state.shipping.map((ship, idx) => (
                              <option key={idx} value={ship.fee}>
                                {ship.shippingCompany}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    <Form.Group>
                      <Form.Row>
                        <Col md={5}>
                          <Form.Label as="h6">Shipping Fee</Form.Label>
                        </Col>
                        <Col md={{ span: 3, offset: 3 }}>
                          <Form.Label as="h6">
                            Rp.{this.state.shippingFee},-
                          </Form.Label>
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    <Form.Group>
                      <Form.Row>
                        <Col md={5}>
                          <Form.Label as="h6">Total Payment</Form.Label>
                        </Col>
                        <Col md={{ span: 3, offset: 3 }}>
                          <Form.Label as="h6">Rp.80.000,-</Form.Label>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form>
                  <Button
                    variant="success"
                    onClick={this.checkout}
                    style={{ width: "100%" }}
                  >
                    Checkout
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
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

export default connect(mapStateToProps)(Cart);

//export default Cart;
