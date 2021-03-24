import React, { Component } from "react";
import { Card, CardDeck, Col, Container, Row, Carousel } from "react-bootstrap";
import "./style.css";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class HomeSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
   
    return (
      <>
        <Container fluid>
          <br />
          <Carousel fade>
            <Carousel.Item style={{ height: "200px" }}>
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
            <Carousel.Item style={{ height: "200px" }}>
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
            <Carousel.Item style={{ height: "200px" }}>
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
          <CardDeck>
            <Card border="info" style={{ width: "18rem" }}>
              <Card.Header>
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  className="mr-3"
                  style={{ fontSize: "3vh" }}
                />
                DASHBOARD
              </Card.Header>
              <Card.Body>
                <Card.Title>Welcome To Gromart Application</Card.Title>
                <Card.Text>
                  As a Seller, your Dashboard Containt of three main
                  information:
                </Card.Text>
                <Card.Text>
                  <b>(1). Total Transaction :</b> containt any information
                  regarding your daily selling and how much your product was
                  selling in the marketplace
                </Card.Text>
                <Card.Text>
                  <b>(2). Total Amount :</b> containt infromation regarding
                  total money you have gotten from your selling product.{" "}
                </Card.Text>
                <Card.Text>
                  <b>(3). Top 3 Best Seller Product :</b> In this part you can
                  see what kind of your product which has greater totalcselling
                  in the marketplace. content.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
          <br />
          <CardDeck>
            <Card border="warning" style={{ width: "18rem" }}>
              <Card.Header as="h5">TOTAL TRANSACTION</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={2}>
                    <i
                      class="fab fa-sellsy"
                      style={{ fontSize: "5vh", color: "orange" }}
                    ></i>
                  </Col>
                  <Col md={10}>
                    <h3>100 Items</h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
              <Card.Header as="h5">TOTAL AMOUNT</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={2}>
                    <i
                      class="fas fa-wallet"
                      style={{ fontSize: "5vh", color: "greenyellow" }}
                    ></i>
                  </Col>
                  <Col md={10}>
                    <h3>Rp.1.000.000,-</h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card border="info" style={{ width: "18rem" }}>
              <Card.Header as="h5">TOP 3 BEST SELLER PRODUCTS</Card.Header>
              <Row></Row>
            </Card>
          </CardDeck>
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
//export default HomeSeller;
