import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GromartSeller from "./gromart-seller.js";
import GromartBuyer from "./gromart-buyer.js";
import LoginBaru from "./page/login/Login2.js";
import DualRegistration from "./page/registrasi/RegistrasiDual.js";
import RegistrasiService from "./service/RegistrasiService.js";
import { connect } from "react-redux";

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
          this.setState({
            users: res.data,
          });
          alert("success");
          this.props.changeLogin();
        })
        .catch((err) => {
          alert(err.response.data.errorMessage);
        });
    }
  };

  render() {
    return (
      <Router>
        <Route exact path="/">
          <LoginBaru
            statusLogin={this.state.statusLogin}
            doLogin={this.doLogin}
          />
        </Route>
        <Route path="/login">
          <LoginBaru
            statusLogin={this.state.statusLogin}
            doLogin={this.doLogin}
          />
        </Route>
        <Route path="/registrasi" component={DualRegistration}></Route>
        <Route path="/gromart" component={GromartSeller}></Route>
        <Route path="/gromart-buyer" component={GromartBuyer}></Route>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeLogin: () => dispatch({ type: "LOGIN_SUCCESS" }),
});

export default connect(null, mapDispatchToProps)(App);

//export default App;