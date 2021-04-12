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
    const { qty } = this.state;
    let quantity = qty < this.props.stock ? qty + 1 : this.props.stock;
    this.setState({
      qty: quantity,
    });
    this.props.updateQty(this.props.detailId, quantity);
  };

  decrementCounter = () => {
    const { qty } = this.state;
    let quantity = qty > 1 ? qty - 1 : 1;
    this.setState({
      qty: quantity,
    });
    this.props.updateQty(this.props.detailId, quantity);
  };

  Rupiah = (money) => {
    let value =
      "Rp. " +
      money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +
      ",-";
    return value;
  };

  render() {
    const { key, productName, unitPrice, detailId, stock } = this.props;
    const { qty } = this.state;

    return (
      <tr key={key}>
        <td>
          <i class="far fa-image" style={{ fontSize: "10vh" }}></i>
          <p>{productName}</p>
        </td>
        <td>
          <InputGroup
            className="mb-3"
            style={{ width: "130px", marginLeft: "120px" }}
          >
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
        <td style={{ color: "firebrick" }}>{stock} item available</td>
        <td>{this.Rupiah(unitPrice)}</td>
        <td>{this.Rupiah(qty * unitPrice)}</td>
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
