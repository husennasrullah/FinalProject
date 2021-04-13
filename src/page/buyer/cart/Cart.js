import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Form,
  Table,
  Badge,
} from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import CartService from "../../../service/CartService";
import OrderService from "../../../service/OrderService";
import RegistrasiService from "../../../service/RegistrasiService";
import ShippingService from "../../../service/ShippingService";
import Item from "./Item";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      detailCart: [],
      cartId: "",
      userid: this.props.dataUser.userId,
      isThereCart: false,
      qty: 0,
      totalAmount: 0,
      address: "",
    };
  }

  updateQty = (detailId, qty) => {
    var newData = this.state.detailCart.map((el) => {
      if (el.detailId === detailId)
        return Object.assign({}, el, {
          quantity: qty,
          subTotal: qty * el.product.unitPrice,
        });
      return el;
    });
    this.setState({ detailCart: newData });

    let update = {
      quantity: qty,
    };
    CartService.updateQuantity(detailId, update).catch((err) => {
      alert("Failed Update data");
    });
  };

  Rupiah = (money) => {
    let value =
      "Rp. " +
      money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +
      ",-";
    return value;
  };

  countTotal = () => {
    let total = this.state.detailCart.reduce(
      (acc, item) => acc + item.product.unitPrice * item.quantity,
      0
    );
    return total;
  };

  setAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };
  s;

  updatateCreditLimit = (totalAmount) => {
    let dataUser = this.props.dataUser;
    dataUser["creditLimit"] = dataUser.creditLimit - totalAmount;
    this.props.changeLogin(dataUser);
  };

  checkout = (e) => {
    e.preventDefault();

    let detail = this.state.detailCart;
    let checkout = {
      orderDate: "2021-03-16",
      user: {
        userId: this.state.userid,
      },
      shippingAddress: this.state.address,
      totalAmount: this.countTotal(),
      status: false,
      details: detail,
    };

    if (this.state.address === "") {
      Swal.fire("Please complete the Form", "", "error");
    } else {
      OrderService.checkoutOrder(checkout)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Checkout Success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.deleteAllCart();
          this.updatateCreditLimit(this.countTotal());
          this.getNewDataUser(this.state.userid);
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.errorMessage);
        });
    }
  };

  deleteAllCart = () => {
    CartService.deleteAllCart(this.state.cartId).then((res) => {
      this.setState({
        detailcart: [],
        isThereCart: false,
      });
    });
  };

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

  getCart = () => {
    CartService.getCartByUserID(this.state.userid).then((res) => {
      if (res.data.errorMessage === "No-Cart") {
        this.setState({
          isThereCart: false,
        });
      } else {
        let data = res.data.detail;
        let newData = data.map((el) => {
          return Object.assign({}, el, {
            subTotal: parseInt(el.quantity) * parseInt(el.product.unitPrice),
          });
        });
        this.setState({
          isThereCart: true,
          cart: res.data,
          detailCart: newData,
          cartId: res.data.cartId,
        });
      }
    });
  };

  // getShipping = () => {
  //   ShippingService.getShipping()
  //     .then((res) => {
  //       this.setState({
  //         shipping: res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       alert("Failed Fetching Data Shipper");
  //     });
  // };

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
    this.getCart();
    this.getNewDataUser(this.state.userid);
  }

  render() {
    const { detailCart } = this.state;
    return (
      <Container fluid>
        <br />
        <Row>
          <Col md={2}>
            <h4>Shopping Cart</h4>
          </Col>
          <Col md={{ span: 3, offset: 3 }}>
            <Badge
              style={{
                fontSize: "3vh",
                fontFamily: "cambria",
                border: "solid 1px black",
              }}
              variant="warning"
            >
              Credit Limit :{this.Rupiah(this.props.dataUser.creditLimit)}
            </Badge>
          </Col>
          <Col md={3}>
            <Badge
              style={{
                fontSize: "3vh",
                fontFamily: "cambria",
                border: "solid 1px black",
              }}
              variant="success"
            >
              Invoice Limit : {this.props.dataUser.invoiceLimit} Transaction
            </Badge>
          </Col>
        </Row>

        <hr />
        <Container fluid>
          <Card>
            <Card.Header
              style={{
                backgroundColor: "#435560",
                color: "white",
                fontFamily: "cambria",
                textAlign: "center",
              }}
            >
              <Row sm>
                <Col sm={8}>
                  <h5>ITEM DETAIL</h5>
                </Col>
                <Col sm={4}>
                  <h5>SUMMARY</h5>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {this.state.isThereCart ? (
                <Row>
                  <Col sm={8}>
                    <div className="overflow-auto" style={{ height: "450px" }}>
                      <Table
                        striped
                        hover
                        responsive="lg"
                        style={{
                          fontFamily: "cambria",
                          textAlign: "center",
                          fontSize: "2vh",
                        }}
                      >
                        <thead className="thead-dark">
                          <th> Product </th>
                          <th> Quantity </th>
                          <th></th>
                          <th> unit Price </th>
                          <th> SubTotal </th>
                          <th></th>
                        </thead>
                        <tbody>
                          {detailCart.map((cart, idx) => (
                            <Item
                              key={idx}
                              productName={cart.product.productName}
                              quantity={cart.quantity}
                              unitPrice={cart.product.unitPrice}
                              stock={cart.product.stock}
                              deleteItem={this.deleteItem}
                              detailId={cart.detailId}
                              updateQty={this.updateQty}
                            />
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div style={{ fontFamily: "cambria" }}>
                      <Form>
                        <Form.Group>
                          <Form.Row>
                            <Col md={5}>
                              <Form.Label as="h6">
                                {detailCart.length} items
                              </Form.Label>
                            </Col>
                            <Col md={{ span: 4, offset: 2 }}>
                              <Form.Label as="h6">
                                {this.Rupiah(this.countTotal())}
                              </Form.Label>
                            </Col>
                          </Form.Row>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label as="h6">Shipping Address</Form.Label>
                          <Form.Control
                            as="textarea"
                            type="text"
                            style={{ height: "130px" }}
                            onChange={this.setAddress}
                            placeholder="your address....."
                          />
                        </Form.Group>
                        <br />
                        {/* disini */}
                        <Form.Group>
                          <Form.Row>
                            <Col md={5}>
                              <Form.Label as="h6">Total Payment</Form.Label>
                            </Col>
                            <Col md={{ span: 4, offset: 2 }}>
                              <Form.Label as="h6">
                                {this.Rupiah(this.countTotal())}
                              </Form.Label>
                            </Col>
                          </Form.Row>
                        </Form.Group>
                      </Form>
                      <br />
                      <br />
                      <Button
                        variant="success"
                        size="lg"
                        block
                        onClick={this.checkout}
                        style={{ width: "100%" }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </Col>
                </Row>
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

const mapDispatchToProps = (dispatch) => ({
  changeLogin: (payload) => dispatch({ type: "LOGIN_SUCCESS", payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

{
  /* <Form.Group>
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
                        <br />

                        <Form.Group>
                          <Form.Row>
                            <Col md={5}>
                              <Form.Label as="h6">Shipping Fee</Form.Label>
                            </Col>
                            <Col md={{ span: 3, offset: 3 }}>
                              <Form.Label as="h6">
                                {this.Rupiah(this.state.shippingFee)}
                              </Form.Label>
                            </Col>
                          </Form.Row>
                        </Form.Group>
                        <br /> */
}
