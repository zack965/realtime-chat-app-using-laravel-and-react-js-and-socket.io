import React, { Component } from "react";
import "./Register.css";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
    };
  }
  componentDidMount() {
    console.log(this.state.user);
  }
  render() {
    return (
      <div>
        <h1>{this.state.user.name}</h1>
      </div>
    );
  }
}
