import React, { Component } from "react";
import "./style.css";
import { Form, Button, Col } from "react-bootstrap";
import RegistrasiService from "../../service/RegistrasiService";

class Registrasi extends Component {
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
    console.log(email);

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
    console.log("cobaa :", this.state);
    return (
      <div className="box2">
        <Form>
          <center>
            <Form.Label size="lg">Silahkan Registrasi</Form.Label>
          </center>
          <hr />
          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Nama
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.setValue}
                />
              </Col>
              <Col>
                <Form.Control
                  size="sm"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.setValue}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Email
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  type="text"
                  name="email"
                  placeholder="ex : husen@gmail.com"
                  onChange={this.setValue}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                UserName
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  type="text"
                  name="userName"
                  placeholder="UserName"
                  onChange={this.setValue}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Phone
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  type="text"
                  name="phoneNumber"
                  placeholder="ex : 085289507952135"
                  onChange={this.setValue}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Password
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.setValue}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Confirm Password
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  type="password"
                  name="passValidation"
                  placeholder="Confirm Your Password"
                  onChange={this.setValue}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" sm={2}>
                Role
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  size="sm"
                  name="role"
                  onChange={this.setValue}
                >
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </Form.Control>
              </Col>
            </Form.Row>
          </Form.Group>

          <Button
            className="mb-2 mr-2"
            variant="success"
            type="submit"
            onClick={this.doRegistration}
          >
            Submit
          </Button>

          <Button className="mb-2 mr-2" variant="danger" type="submit">
            Back
          </Button>
        </Form>
      </div>
    );
  }
}

export default Registrasi;
