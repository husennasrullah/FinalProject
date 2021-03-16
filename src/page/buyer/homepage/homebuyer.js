import React, { Component } from "react";

import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import ProductService from "../../../service/ProductService";

class HomeBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      listProduct: [],
      search: "",
      page: "1",
      count: 0,
      limit: 8,
    };
  }

  searchProduct = () => {
    if (this.state.search === "") {
      ProductService.getProductPaging(this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            product: res.data,
          });
        })
        .catch((err) => {
          alert("Failed Fetching Data");
        });
    } else {
      ProductService.searchByName(this.state.search)
        .then((res) => {
          this.setState({
            product: res.data,
          });
        })
        .catch((err) => {
          alert("Failed Fetching Data nama");
        });
    }
  };

  setSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleChange = (event, value) => {
    ProductService.getProductPaging(value, this.state.limit).then((res) => {
      this.setState({
        page: value,
        product: res.data,
      });
    });
  };

  getCountPagination() {
    ProductService.getCount()
      .then((res) => {
        let page = res.data / this.state.limit;
        this.setState({
          count: Math.ceil(page),
        });
      })
      .catch(() => {
        alert("Failed fetching data");
      });
  }

  componentDidMount() {
    this.getCountPagination();
    ProductService.getProductPaging(this.state.page, this.state.limit)
      .then((res) => {
        this.setState({
          product: res.data,
          listProduct: res.data,
        });
      })
      .catch((err) => {
        alert("Failed Fetching Data");
      });
  }

  render() {
    console.log(this.state);
    return (
      <Container fluid>
        <br />
        <Row>
          <Col md={3}>
            <Card bg="warning" text="" className="mb-2">
              <Card.Header>
                <Card.Title> Credit Limit </Card.Title>
              </Card.Header>
              <Card.Body>
                <h2>Rp.100.000,-</h2>
              </Card.Body>
            </Card>
            <br />
            <Card bg="success" text="" className="mb-2">
              <Card.Header>
                <Card.Title> Invoice Limit </Card.Title>
              </Card.Header>
              <Card.Body>
                <h2>5 items</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Form>
              <Form.Row className="align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Name
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    as="select"
                  >
                    <option value="low">Price - Low to High</option>
                    <option value="high">Price - High to Low</option>
                  </Form.Control>
                </Col>
                <Col md={9}>
                  <InputGroup className="mb-2">
                    <FormControl
                      placeholder="search your product"
                      onChange={this.setSearch}
                      value={this.state.search}
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        style={{ cursor: "pointer" }}
                        onClick={this.searchProduct}
                      >
                        <i class="fas fa-search"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
              </Form.Row>
            </Form>
            <hr />
            <Container>
              <center>
                <Row>
                  {this.state.product.map((prod, idx) => (
                    <Col key={idx} xs={3}>
                      <Card>
                        <i
                          class="fas fa-camera-retro"
                          style={{ fontSize: "11vh" }}
                        ></i>
                        <Card.Body>
                          <Card.Title>{prod.productName}</Card.Title>
                          <Card.Text>Rp.{prod.unitPrice},-</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button variant="primary" size="sm" onClick="">
                            add to cart
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            style={{ marginLeft: "5px" }}
                          >
                            view
                          </Button>
                        </Card.Footer>
                      </Card>
                      <br />
                    </Col>
                  ))}
                </Row>
              </center>
            </Container>
            <Pagination
              color="primary"
              count={this.state.count}
              page={this.state.page}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeBuyer;
