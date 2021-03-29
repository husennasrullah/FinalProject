import {
  Button,
  Modal,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import React, { Component } from "react";

const CounterBtn = (props) => {
  return (
    <Button variant="primary" onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

class DetailShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  incrementCounter = () => {
    this.setState(({ quantity }) => ({
      quantity:
        quantity < this.props.detailShop[0].stock
          ? quantity + 1
          : this.props.detailShop[0].stock,
    }));
  };

  decrementCounter = () => {
    this.setState(({ quantity }) => ({
      quantity: quantity > 0 ? quantity - 1 : 0,
    }));
  };

  render() {
    console.log("stuk :", this.props.detailShop[0].stock);
    return (
      <Modal size="md" show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#314e52" }}>
          <Modal.Title as="h2" style={{ color: "white" }}>
            {this.props.detailShop[0].productName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="show-grid"
          style={{ backgroundColor: "#faf9f9" }}
        >
          <center>
            <i class="fas fa-camera-retro" style={{ fontSize: "15vh" }}></i>
            <hr />
            <h6>Description :</h6>
            {this.props.detailShop[0].description}
            <hr />
            <Row>
              <Col>
                <h5>Price : Rp.{this.props.detailShop[0].unitPrice}</h5>
              </Col>
              <Col>
                <h5>Stock : {this.props.detailShop[0].stock} items</h5>
              </Col>
            </Row>
          </center>
        </Modal.Body>

        <Modal.Body style={{ backgroundColor: "#314e52" }}>
          <center>
            <Row>
              <Col md={6}>
                <InputGroup className="mb-3" style={{ width: "130px" }}>
                  <InputGroup.Prepend>
                    <CounterBtn onClick={this.decrementCounter}>-</CounterBtn>
                  </InputGroup.Prepend>
                  <FormControl
                    style={{ width: "60px" }}
                    value={this.state.quantity}
                  ></FormControl>
                  <InputGroup.Append>
                    <CounterBtn onClick={this.incrementCounter}>+</CounterBtn>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
              <Col md={6}>
                <Button
                  variant="success"
                  style={{
                    borderRadius: "20px",
                    width: "60%",
                    height: "50px",
                  }}
                  onClick={() => {
                    this.props.addToCart(
                      this.props.detailShop[0].productId,
                      this.state.quantity
                    );
                    this.props.closeModal();
                  }}
                  disabled={this.props.detailShop[0].stock === 0}
                >
                  add to cart
                </Button>
              </Col>
            </Row>
          </center>
        </Modal.Body>
      </Modal>
    );
  }
}

export default DetailShop;
