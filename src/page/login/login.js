import React, { Component } from "react";
import "./style.css";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      showPass: false,
    };
  }

  setValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  showPass = () => {
    this.setState({
      showPass: true,
    });
  };

  hidePass = () => {
    this.setState({
      showPass: false,
    });
  };

  render() {
    if (this.props.isLogin && this.props.dataUser !== "") {
      if (this.props.dataUser.userId.includes("Seller")) {
        return <Redirect to="/gromart" />;
      } else {
        return <Redirect to="/gromart-buyer" />;
      }
    }

    const { user, pass, showPass } = this.state;
    return (
      <Container fluid className="register2">
        <Row>
          <Col md={3} className="register-left2">
            <img src="https://i.ibb.co/d5q6VxJ/logo.png" alt="" />
            <h3>Welcome</h3>
            <p>An exciting place for the whole family to shop.</p>
            <h6>Don't have any account ?</h6>
            <Link to="/registrasi">
              <input type="submit" name="" value="Register" />
            </Link>
            <br />
          </Col>
          <Col md={9} className="register-right2">
            <h3 className="register-heading">Please Login</h3>
            <Row className="register-form">
              <Col md={{ span: 6, offset: 3 }}>
                <FormGroup>
                  <FormControl
                    size="md"
                    type="text"
                    name="user"
                    placeholder="Enter username"
                    onChange={this.setValue}
                  />
                </FormGroup>
                <br />
                <InputGroup className="mb-3">
                  <FormControl
                    size="md"
                    type="password"
                    name="pass"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={this.setValue}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      {showPass ? (
                        <i class="far fa-eye-slash" onClick={this.hidePass} />
                      ) : (
                        <i class="far fa-eye" onClick={this.showPass} />
                      )}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control.Feedback type="invalid">
                    Not Equals to new Password
                  </Form.Control.Feedback>
                </InputGroup>
                <Button
                  className="btnRegister2"
                  onClick={() => this.props.doLogin(user, pass)}
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeLogin: () => dispatch({ type: "LOGIN_SUCCESS" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

//export default LoginBaru;
