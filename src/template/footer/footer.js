import React, { Component } from "react";
import "./style.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <footer className="footer">
          <span className="text-muted">All Right Reserved 2020</span>
        </footer>
      </div>
    );
  }
}

export default Footer;
