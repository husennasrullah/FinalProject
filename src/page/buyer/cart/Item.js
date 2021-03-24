import React, { Component } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: parseInt(this.props.quantity),
    };
  }

  incrementCounter = () => {
    this.setState(({ qty }) => ({
      qty: qty < this.props.stock ? qty + 1 : this.props.stock,
    }));

    this.props.updateQty(this.props.detailId, this.state.qty + 1);
  };

  decrementCounter = () => {
    this.setState(({ qty }) => ({
      qty: qty > 1 ? qty - 1 : 1,
    }));
    this.props.updateQty(this.props.detailId, this.state.qty - 1);
  };

  render() {
    const { key, productName, unitPrice, detailId } = this.props;
    const { qty } = this.state;

    return (
      <tr key={key}>
        <td>
          <i class="far fa-image" style={{ fontSize: "10vh" }}></i>
          <p>{productName}</p>
        </td>
        <td>
          <InputGroup className="mb-3" style={{ width: "130px" }}>
            <InputGroup.Prepend>
              <Button onClick={this.decrementCounter}>-</Button>
            </InputGroup.Prepend>
            <FormControl
              style={{ width: "60px" }}
              value={this.state.qty}
            ></FormControl>
            <InputGroup.Append>
              <Button onClick={this.incrementCounter}>+</Button>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td>
          Rp.
          {unitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
        </td>
        <td>
          Rp.
          {(qty * unitPrice)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
        </td>
        <td>
          <i
            class="fas fa-trash-alt"
            style={{ cursor: "pointer" }}
            onClick={() => this.props.deleteItem(detailId)}
          ></i>
        </td>
      </tr>
    );
  }
}

export default Item;
