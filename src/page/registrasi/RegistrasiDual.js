import React, { Component } from "react";
import { Container, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
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
    };
  }

  setValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
    } = this.state;

    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regUname = /^(?=.{6,8}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$/;
    let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6}$/;
    let regPhone = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

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
    } else if (!regUname.test(userName)) {
      alert(`Username must be 6 to 8 in alphanumeric and without any symbol`);
    } else if (!regEmail.test(email)) {
      alert(`Email Format not valid`);
    } else if (!regPass.test(password)) {
      alert(
        `Password must be 6 in alphanumeric and at least 1 uppercase letter`
      );
    } else if (!regPhone.test(phoneNumber)) {
      alert(
        `Phone number must in Indonesia type (ex: 6289507952135 or 089507952135)`
      );
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
                        size="md"
                        type="text"
                        placeholder="First Name *"
                        name="firstName"
                        onChange={this.setValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="email"
                        placeholder="Your Email *"
                        name="email"
                        onChange={this.setValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="text"
                        placeholder="UserName *"
                        name="userName"
                        onChange={this.setValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        type="password"
                        placeholder="Password *"
                        name="password"
                        onChange={this.setValue}
                      />
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
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormControl
                        size="md"
                        type="text"
                        name="phoneNumber"
                        placeholder="Your Phone Number *"
                        onChange={this.setValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        size="md"
                        as="select"
                        placeholder="UserName *"
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

export default DualRegistration;
