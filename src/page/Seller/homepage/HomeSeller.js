import React, { Component } from "react";
import {
  Card,
  CardDeck,
  Col,
  Container,
  Row,
  Carousel,
  CardColumns,
  Badge,
} from "react-bootstrap";
import "./style.css";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import OrderService from "../../../service/OrderService";

class HomeSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSales: [],
      transaction: 0,
    };
  }

  getTopSales() {
    OrderService.getTopSales()
      .then((res) => {
        let topThree = res.data.slice(0, 3);
        this.setState({
          topSales: topThree,
        });
      })
      .catch((err) => {
        alert("failed");
      });
  }

  getTotalTransaction() {
    OrderService.getTotalTransaction()
      .then((res) => {
        this.setState({
          transaction: res.data,
        });
      })
      .catch((err) => {
        alert("failed");
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
    this.getTopSales();
    this.getTotalTransaction();
  }

  render() {
    const { transaction, topSales } = this.state;

    return (
      <>
        <Container fluid>
          <br />
          <Carousel fade>
            <Carousel.Item style={{ height: "150px" }}>
              <img
                className="d-block w-100"
                src="https://i.ibb.co/ThqBXt8/foto.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Choose your Product</h3>
                <p>choose any kind of product that match to your desire</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ height: "150px" }}>
              <img
                className="d-block w-100"
                src="https://i.ibb.co/J5DVH66/foto2.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Checkout yor Cart</h3>
                <p>Edit your Shopping cart and checkout</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ height: "150px" }}>
              <img
                className="d-block w-100"
                src="https://i.ibb.co/Gx2YB2f/foto3.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Waiting for Approval</h3>
                <p>
                  the Seller will approve your transaction as soon as possible
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <br />

          <Card border="info" style={{ lineHeight: "1", fontSize: "2vh" }}>
            <Card.Header>
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="mr-3"
                style={{ fontSize: "3vh" }}
              />
              WELCOME TO GROMART APPLICATION
            </Card.Header>
            <Card.Body>
              <Card.Text>
                As a Seller, your Dashboard Containt of three main information:
              </Card.Text>
              <Card.Text>
                <b>(1). Total Transaction :</b> containt any information
                regarding your daily selling and how much your product was
                selling in the marketplace
              </Card.Text>
              <Card.Text>
                <b>(2). Total Amount :</b> containt infromation regarding total
                money you have gotten from your selling product.
              </Card.Text>
              <Card.Text>
                <b>(3). Top 3 Best Seller Product :</b> In this part you can see
                what kind of your product which has greater total selling in the
                marketplace. content.
              </Card.Text>
            </Card.Body>
          </Card>

          <br />

          <Row style={{ textAlign: "center", fontFamily: "cambria" }}>
            <Col xs={4}>
              <Card style={{ height: "7rem" }}>
                <Card.Header
                  style={{
                    fontSize: "2vh",
                    backgroundColor: "#435560",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  TOTAL TRANSACTION
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs={2}>
                      <i
                        class="fab fa-sellsy"
                        style={{ fontSize: "4vh", color: "orange" }}
                      ></i>
                    </Col>
                    <Col xs={10}>
                      <h4>{transaction.totalSellingItem} Items</h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Header
                  style={{
                    fontSize: "2vh",
                    backgroundColor: "#435560",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  TOTAL AMOUNT
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={2}>
                      <i
                        class="fas fa-wallet"
                        style={{ fontSize: "4vh", color: "greenyellow" }}
                      ></i>
                    </Col>
                    <Col md={10}>
                      <h4>
                        {this.Rupiah(parseInt(transaction.totalSellingMoney))}
                      </h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Badge
                style={{
                  fontSize: "2vh",
                  fontFamily: "cambria",
                  border: "solid 1px black",
                  backgroundColor: "#435560",
                  color: "white",
                }}
              >
                TOP 3 BEST SELLER PRODUCTS
              </Badge>
              <hr />
              <Row>
                {topSales.map((item, idx) => {
                  let img = [
                    "https://i.ibb.co/ZfDmDF1/1.png",
                    "https://i.ibb.co/dj3xmmy/2.png",
                    "https://i.ibb.co/zHw91TQ/3.png",
                  ];
                  const data = img[idx];
                  return (
                    <Col key={idx} xs={4}>
                      <Card>
                        <Card.Body>
                          <img src={data} style={{ width: "25%" }}></img>
                          <hr />
                          <Card.Title as="h4">{item.productName}</Card.Title>
                          <Card.Text as="h6">
                            Total Selling : {item.total} items
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statusLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

export default connect(mapStateToProps)(HomeSeller);
