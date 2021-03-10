import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../src/LoginPage.js";
import Gromart from "./gromart.js";
import Registrasi from "./page/registrasi/registrasi.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/registrasi" component={Registrasi}></Route>
        <Route path="/gromart" component={Gromart}></Route>
      </Router>
    );
  }
}

export default App;
