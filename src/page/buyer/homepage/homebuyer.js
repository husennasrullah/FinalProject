import React, { Component } from "react";

import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  Card,
  Button,
  CardDeck,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  ListGroup,
} from "react-bootstrap";
import lays from "./lays.jpg";

class HomeBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={3}>
            <h4>Welcome, Husen Nasrullah</h4>
            <br />

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

            <br />

            <Card border="info" text="" className="mb-2">
              <Card.Header>
                <Card.Title> Top 3 Best Seller Product </Card.Title>
              </Card.Header>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    1. Beras Rojo Lele (5kg)
                    <Card.Text>
                      Price : Rp.60.000,-
                      <Card.Text>Total Selling : 50 items</Card.Text>
                    </Card.Text>
                  </Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    1. Beras Rojo Lele (5kg)
                    <Card.Text>
                      Price : Rp.60.000,-
                      <Card.Text>Total Selling : 50 items</Card.Text>
                    </Card.Text>
                  </Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    1. Beras Rojo Lele (5kg)
                    <Card.Text>
                      Price : Rp.60.000,-
                      <Card.Text>Total Selling : 50 items</Card.Text>
                    </Card.Text>
                  </Card.Text>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          <Col md={9}>
            <div style={{ textAlign: "center" }}>
              <h3>SELLING PRODUCT</h3>
            </div>
            <br />
            <div>
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
                    <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                      Username
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <FormControl
                        id="inlineFormInputGroup"
                        placeholder="search your product"
                      />
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i class="fas fa-search"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Col>
                </Form.Row>
              </Form>
              <hr />
              <CardDeck>
                <Card>
                  <Card.Img variant="top" src={lays} />
                  <Card.Body>
                    <Card.Title>Lays</Card.Title>
                    <Card.Text>Rp.10.000,-</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" size="sm" active>
                      add to cart
                    </Button>
                    <Button variant="secondary" size="sm" active>
                      view
                    </Button>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={lays} />
                  <Card.Body>
                    <Card.Title>Lays</Card.Title>
                    <Card.Text>Rp.10.000,-</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" size="sm" active>
                      add to cart
                    </Button>
                    <Button variant="secondary" size="sm" active>
                      view
                    </Button>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={lays} />
                  <Card.Body>
                    <Card.Title>Lays</Card.Title>
                    <Card.Text>Rp.10.000,-</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" size="sm" active>
                      add to cart
                    </Button>
                    <Button variant="secondary" size="sm" active>
                      view
                    </Button>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={lays} />
                  <Card.Body>
                    <Card.Title>Lays</Card.Title>
                    <Card.Text>Rp.10.000,-</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" size="sm" active>
                      add to cart
                    </Button>
                    <Button variant="secondary" size="sm" active>
                      view
                    </Button>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={lays} />
                  <Card.Body>
                    <Card.Title>Lays</Card.Title>
                    <Card.Text>Rp.10.000,-</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" size="sm" active>
                      add to cart
                    </Button>
                    <Button variant="secondary" size="sm" active>
                      view
                    </Button>
                  </Card.Footer>
                </Card>
              </CardDeck>
              <br />
              <Pagination count={10} color="primary" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeBuyer;
