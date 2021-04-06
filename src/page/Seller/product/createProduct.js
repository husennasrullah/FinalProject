import React, { Component } from "react";
import { Form, Col, Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import ProductService from "../../../service/ProductService";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.match.params.id,
      productName: "",
      category: "food",
      unitPrice: "",
      stock: 0,
      description: "",
    };
  }

  cancel = () => {
    this.props.history.push("/gromart/product");
  };

  setValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveProduct = (e) => {
    e.preventDefault();

    if (
      (this.state.productName === "",
      this.state.category === "",
      this.state.unitPrice === "",
      this.state.stock === "",
      this.state.description === "")
    ) {
      alert(`Insert all data!`);
    } else {
      let product = {
        productName: this.state.productName,
        category: this.state.category,
        unitPrice: this.state.unitPrice,
        stock: this.state.stock,
        description: this.state.description,
        createdBy: this.props.dataUser.userId,
        updatedBy: this.props.dataUser.userId,
      };

      if (this.state.productId === "add") {
        ProductService.createProduct(product)
          .then((res) => {
            this.props.history.push("/gromart/product");
          })
          .catch((err) => {
            alert(err.response.data.errorMessage);
          });
      } else {
        ProductService.updateProduct(product, this.state.productId)
          .then((res) => {
            this.props.history.push("/gromart/product");
          })
          .catch((err) => {
            alert(err.response.data.errorMessage);
          });
      }
    }
  };

  setJudul = () => {
    if (this.state.productId === "add") {
      return <h3 className="text-center">Create Product</h3>;
    } else {
      return <h3 className="text-center">Update Product</h3>;
    }
  };

  componentDidMount() {
    if (this.state.productId === "add") {
      return;
    } else {
      ProductService.getProductById(this.state.productId).then((res) => {
        let productById = res.data;

        this.setState({
          productName: productById.productName,
          category: productById.category,
          unitPrice: productById.unitPrice,
          stock: productById.stock,
          description: productById.description,
        });
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <>
        <Container>
          <center>{this.setJudul()}</center>
          <br />

          <Form>
            <Form.Group>
              <Form.Row>
                <Form.Label column="md" md={2}>
                  Product Name
                </Form.Label>
                <Col>
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="Enter Product Name"
                    name="productName"
                    value={this.state.productName}
                    onChange={this.setValue}
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Form.Label column="md" md={2}>
                  Category
                </Form.Label>
                <Col>
                  <Form.Control
                    size="md"
                    as="select"
                    name="category"
                    value={this.state.category}
                    onChange={this.setValue}
                  >
                    <option disabled selected value>
                      --select product category--
                    </option>
                    <option value="Food">Food</option>
                    <option value="Cloth">Cloth</option>
                    <option value="Drug">Drug</option>
                  </Form.Control>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Form.Label column="md" md={2}>
                  Unit Price
                </Form.Label>
                <Col>
                  <Form.Control
                    size="md"
                    type="number"
                    placeholder="Enter Unit Price"
                    name="unitPrice"
                    value={this.state.unitPrice}
                    onChange={this.setValue}
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Form.Label column="md" md={2}>
                  Stock
                </Form.Label>
                <Col>
                  <Form.Control
                    size="md"
                    type="number"
                    min={0}
                    placeholder="Enter Stock of Product"
                    name="stock"
                    value={this.state.stock}
                    onChange={this.setValue}
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Form.Label column="md" md={2}>
                  Product Description
                </Form.Label>
                <Col>
                  <Form.Control
                    as="textarea"
                    size="md "
                    type="text"
                    style={{ resize: "none", height: "15vh" }}
                    placeholder="The Description of Product"
                    name="description"
                    value={this.state.description}
                    onChange={this.setValue}
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Form.Label column="md" md={2}>
                  Upload Picture
                </Form.Label>
                <Col>
                  <Form.File
                    className="position-relative"
                    required
                    name="file"
                    feedbackTooltip
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Button variant="success" onClick={this.saveProduct}>
              Save
            </Button>
            <Button
              variant="danger"
              style={{ marginLeft: "10px" }}
              onClick={this.cancel}
            >
              Cancel
            </Button>
          </Form>
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

export default connect(mapStateToProps)(CreateProduct);

//export default CreateProduct;
