import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import RegistrasiService from "../../service/RegistrasiService";
import { connect } from "react-redux";
import "./style.css";

class DualRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      passValidation: "",
      role: "",
      errorFirstname: false,
      errorLastname: false,
      errorUsername: false,
      errorEmail: false,
      errorPhone: false,
      errorPassword: false,
    };
  }

  setValue = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.checkValidation(event.target.name)
    );
  };

  checkValidation = (name) => {
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password,
    } = this.state;

    if (name === "firstName") {
      let regName = /^(?![ .]+$)[a-zA-Z .]*$/;
      if (!regName.test(firstName)) {
        this.setState({
          errorFirstname: true,
        });
      } else {
        this.setState({
          errorFirstname: false,
        });
      }
    } else if (name === "lastName") {
      let regName = /^(?![ .]+$)[a-zA-Z .]*$/;
      if (!regName.test(lastName)) {
        this.setState({
          errorLastname: true,
        });
      } else {
        this.setState({
          errorLastname: false,
        });
      }
    } else if (name === "userName") {
      let regUname = /^(?=.{6,8}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$/;
      if (!regUname.test(userName)) {
        this.setState({
          errorUsername: true,
        });
      } else {
        this.setState({
          errorUsername: false,
        });
      }
    } else if (name === "email") {
      let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!regEmail.test(email)) {
        this.setState({
          errorEmail: true,
        });
      } else {
        this.setState({
          errorEmail: false,
        });
      }
    } else if (name === "phoneNumber") {
      let regPhone = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;
      if (!regPhone.test(phoneNumber)) {
        this.setState({
          errorPhone: true,
        });
      } else {
        this.setState({
          errorPhone: false,
        });
      }
    } else if (name === "password") {
      let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6}$/;
      if (!regPass.test(password)) {
        this.setState({
          errorPassword: true,
        });
      } else {
        this.setState({
          errorPassword: false,
        });
      }
    }
  };

  doRegistration = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password,
      passValidation,
      role,
      errorFirstname,
      errorLastname,
      errorUsername,
      errorEmail,
      errorPhone,
      errorPassword,
    } = this.state;

    if (
      (firstName === "",
      lastName === "",
      userName === "",
      email === "",
      phoneNumber === "",
      password === "",
      passValidation === "",
      role === "")
    ) {
      alert(`Insert all data!`);
    } else if (password !== passValidation) {
      alert(`Wrong Password`);
    } else if (
      errorFirstname === true ||
      errorLastname === true ||
      errorEmail === true ||
      errorPassword === true ||
      errorPhone === true ||
      errorUsername === true
    ) {
      alert(`Please Check your form`);
    } else {
      let user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        role: this.state.role,
      };

      RegistrasiService.createUser(user)
        .then((res) => {
          alert("success");
        })
        .catch((err) => {
          alert(err.response.data.errorMessage);
          console.log("error :", err.response);
        });
    }
  };
  render() {
    if (this.props.isLogin && this.props.dataUser !== "") {
      if (this.props.dataUser.userId.includes("Seller")) {
        return <Redirect to="/gromart" />;
      } else {
        return <Redirect to="/gromart-buyer" />;
      }
    }
    const {
      errorUsername,
      errorEmail,
      errorPhone,
      errorPassword,
      errorFirstname,
      errorLastname,
    } = this.state;
    return (
      <Container fluid className="register">
        <Row>
          <Col md={3} className="register-left">
            <img src="https://i.ibb.co/d5q6VxJ/logo.png" alt="" />
            <h3>Welcome</h3>
            <p>An exciting place for the whole family to shop.</p>
            <Link to="/login">
              <input type="submit" name="" value="Back" />
            </Link>
            <br />
          </Col>
          <Col md={9} className="register-right">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">Account Registration</h3>
                <Row className="register-form">
                  <Col md={6}>
                    <FormGroup>
                      <FormControl
                        required
                        size="md"
                        type="text"
                        placeholder="First Name *"
                        name="firstName"
                        onChange={this.setValue}
                        isInvalid={errorFirstname}
                      />
                      <Form.Control.Feedback type="invalid">
                        FirstName cannot be number or special character
                      </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="email"
                        placeholder="Your Email *"
                        name="email"
                        onChange={this.setValue}
                        isInvalid={errorEmail}
                      />
                      <Form.Control.Feedback type="invalid">
                        Email Format not valid
                      </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="text"
                        placeholder="UserName *"
                        name="userName"
                        onChange={this.setValue}
                        isInvalid={errorUsername}
                      />
                      <Form.Control.Feedback type="invalid">
                        Username must be 6 to 8 in alphanumeric and without any
                        symbol
                      </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="password"
                        placeholder="Password *"
                        name="password"
                        onChange={this.setValue}
                        isInvalid={errorPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password must be 6 in alphanumeric and at least 1
                        uppercase letter
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="text"
                        placeholder="Last Name *"
                        name="lastName"
                        onChange={this.setValue}
                        isInvalid={errorLastname}
                      />
                      <Form.Control.Feedback type="invalid">
                        LastName cannot be number or special character
                      </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup>
                      <FormControl
                        size="md"
                        type="text"
                        name="phoneNumber"
                        placeholder="Your Phone Number *"
                        onChange={this.setValue}
                        isInvalid={errorPhone}
                      />
                      <Form.Control.Feedback type="invalid">
                        Phone number must in Indonesia type (ex: 6289507952135
                        or 089507952135)
                      </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        as="select"
                        name="role"
                        onChange={this.setValue}
                      >
                        <option value="Seller">Apply as Seller</option>
                        <option value="Buyer">Apply as Buyer</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="password"
                        placeholder="Confirm Password *"
                        name="passValidation"
                        onChange={this.setValue}
                      />
                    </FormGroup>
                    <input
                      type="button"
                      className="btnRegister"
                      value="Register"
                      onClick={this.doRegistration}
                    />
                  </Col>
                </Row>
              </div>
            </div>
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

export default connect(mapStateToProps)(DualRegistration);
//export default DualRegistration;
