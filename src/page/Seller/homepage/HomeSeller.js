import React, { Component } from "react";
import { Card, CardDeck, Col, Row } from "react-bootstrap";
import "./style.css";

class HomeSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div>
          <h2>Welcome, Husen Nasrullah</h2>
        </div>

        <div className="box3">
          <CardDeck>
            <Card
              bg="success"
              text=""
              style={{ width: "15rem" }}
              className="mb-2"
            >
              <Card.Header>
                <Card.Title> TOTAL TRANSACTION </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ fontSize: "7vh" }}>100</Card.Text>
              </Card.Body>
            </Card>

            <Card
              bg="success"
              text=""
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Header>
                <Card.Title> TOTAL AMOUNT </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ fontSize: "7vh" }}>$100.000</Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>

          <Card bg="info" text="" style={{ width: "35rem" }} className="mb-2">
            <Card.Header>
              <Card.Title> TOP 3 BEST SELLER </Card.Title>
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default HomeSeller;
