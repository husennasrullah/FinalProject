import { Button, InputGroup, FormControl } from "react-bootstrap";
import React, { Component } from "react";

class ItemCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: parseInt(this.props.qty),
    };
  }

  incrementCounter = () => {
    this.setState(({ qty }) => ({
      qty: qty < this.props.stock ? qty + 1 : this.props.stock,
    }))
    this.props.setPrice(this.state.qty);
  };

  decrementCounter = () => {
    this.setState(({ qty }) => ({
      qty: qty > 1 ? qty - 1 : 1,
    }));
    this.props.setPrice(this.state.qty);
  };

  render() {
    console.log("ini qty :", this.state.qty);
    return (
      <>
        <InputGroup className="mb-3" style={{ width: "130px" }}>
          <InputGroup.Prepend>
            <Button onClick={this.decrementCounter}>-</Button>
          </InputGroup.Prepend>
          <FormControl
            name="qty"
            style={{ width: "60px" }}
            onChange={() => this.props.setPrice(this.state.qty)}
            value={this.state.qty}
          ></FormControl>
          <InputGroup.Append>
            <Button onClick={this.incrementCounter}>+</Button>
          </InputGroup.Append>
        </InputGroup>
      </>
    );
  }
}

export default ItemCounter;
