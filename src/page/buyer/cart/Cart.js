import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <div>
          <h2>Keranjang Belanja</h2>
        </div>
        <br />
        <Card>
          <Card.Header as="h5">
            <Row>
              <Col md={9}>
                <h4>Shopping Cart</h4>
              </Col>
              <Col md={3}>
                <h4>Summary</h4>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={9}>
                <table className="table  table-borderes table-xs "> 
                  <thead className="thead-light">
                    <th> Product </th>
                    <th> Quantity </th>
                    <th> unit Price </th>
                    <th> SubTotal </th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <i
                          class="far fa-image"
                          style={{ fontSize: "10vh" }}
                        ></i>
                        <p>Roma Malkist Abon</p>
                      </td>
                      <td>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Text>-</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl />
                          <InputGroup.Append>
                            <InputGroup.Text>+</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </td>
                      <td>Rp.5000,-</td>
                      <td>Rp.30000,-</td>
                      <td>
                        <i
                          class="fas fa-trash-alt"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i
                          class="far fa-image"
                          style={{ fontSize: "10vh" }}
                        ></i>
                        <p>Roma Malkist Abon</p>
                      </td>
                      <td>6</td>
                      <td>Rp.5000,-</td>
                      <td>Rp.30000,-</td>
                      <td>
                        <i
                          class="fas fa-trash-alt"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i
                          class="far fa-image"
                          style={{ fontSize: "10vh" }}
                        ></i>
                        <p>Roma Malkist Abon</p>
                      </td>
                      <td>6</td>
                      <td>Rp.5000,-</td>
                      <td>Rp.30000,-</td>
                      <td>
                        <i
                          class="fas fa-trash-alt"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col md={3}>
                <Form inline>
                  <Form.Row>
                    <Col>
                      <Form.Label> 3 items</Form.Label>
                    </Col>
                    <Col>
                      <Form.Label> Rp.60.000,-</Form.Label>
                    </Col>
                  </Form.Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Cart;
