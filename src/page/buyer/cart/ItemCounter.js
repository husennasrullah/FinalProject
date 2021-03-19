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
    }));
  };

  decrementCounter = () => {
    this.setState(({ qty }) => ({
      qty: qty > 1 ? qty - 1 : 1,
    }));
  };

  render() {
    const { qty } = this.state;

    return (
      <>
        <InputGroup className="mb-3" style={{ width: "130px" }}>
          <InputGroup.Prepend>
            <Button onClick={this.decrementCounter}>-</Button>
          </InputGroup.Prepend>
          <FormControl style={{ width: "60px" }} value={qty}></FormControl>
          <InputGroup.Append>
            <Button onClick={this.incrementCounter}>+</Button>
          </InputGroup.Append>
        </InputGroup>
      </>
    );
  }
}

export default ItemCounter;
