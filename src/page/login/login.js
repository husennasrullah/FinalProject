import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import RegistrasiService from "../../service/RegistrasiService";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      users: [],
    };
  }

  setValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  doLogin = (e) => {
    e.preventDefault();
    const { user, pass } = this.state;
    if (user === "" || pass === "") {
      alert(`Insert all data!`);
    } else {
      RegistrasiService.loginCheck(user, pass)
        .then((res) => {
          this.setState({
            users: res.data,
          });
          alert("success");
        })
        .catch((err) => {
          alert(err.response.data.errorMessage);
        });
    }
  };

  render() {
    console.log(this.state);
    console.log("data :", this.state.users);
    return (
      <div className="box">
        <Form>
          <center>
            <b>
              <h3>PLEASE LOGIN</h3>
            </b>
            <br />
          </center>
          <hr />
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="user"
              placeholder="Enter username"
              onChange={this.setValue}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="pass"
              placeholder="Password"
              onChange={this.setValue}
            />
          </Form.Group>
          <Button variant="success" type="submit" onClick={this.doLogin}>
            Submit
          </Button>

          <hr />
          <Form.Group>
            <Form.Label>Don't Have an Account ? Register</Form.Label>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Login;
