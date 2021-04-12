import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GromartSeller from "./gromart-seller.js";
import GromartBuyer from "./gromart-buyer.js";
import Login from "./page/login/Login.js";
import Registration from "./page/registrasi/Registrasi.js";
import RegistrasiService from "./service/RegistrasiService.js";
import { connect } from "react-redux";
import NotFound from "./page/404NotFound/404.js";
import Swal from "sweetalert2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  doLogin = (user, pass) => {
    if (user === "" || pass === "") {
      alert(`Insert all data!`);
    } else {
      RegistrasiService.loginCheck(user, pass)
        .then((res) => {
          let payload = res.data;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Logged-in",
            showConfirmButton: false,
            timer: 2000,
          });
          this.props.changeLogin(payload);
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.response.data.errorMessage,
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login
              statusLogin={this.state.statusLogin}
              doLogin={this.doLogin}
            />
          </Route>
          <Route path="/login">
            <Login
              statusLogin={this.state.statusLogin}
              doLogin={this.doLogin}
            />
          </Route>
          <Route path="/registrasi" component={Registration}></Route>
          <Route path="/gromart" component={GromartSeller}></Route>
          <Route path="/gromart-buyer" component={GromartBuyer}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeLogin: (payload) => dispatch({ type: "LOGIN_SUCCESS", payload }),
});

export default connect(null, mapDispatchToProps)(App);

