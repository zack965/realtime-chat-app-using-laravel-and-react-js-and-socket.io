import axios from "axios";
import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import { io } from "socket.io-client";
//const socket = io("http://localhost:7000");

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: "",
      user: {},
      email_err: "",
      password_err: "",
      invalid_login: "",
      redirect: false,
    };
  }
  HandleEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  HandlePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  /*addMessage = (message) => {
    var node = document.createElement("p");
    var textnode = document.createTextNode(`${message}`);
    node.appendChild(textnode);
    this.div_messages.appendChild(node);
  };*/

  handleLogin = (event) => {
    event.preventDefault();
    /*const user = {
      email: this.state.email,
      password: this.state.password,
    };*/
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `http://127.0.0.1:8000/api/login`,
        {
          email: this.state.email,
          password: this.state.password,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        //console.log(res);
        if (res.data.hasOwnProperty("message")) {
          this.setState({
            invalid_login: "email or password are incorrect !!",
          });
          //res.data.message
        } else {
          this.setState({ token: res.data.token });
          //console.log(this.state.token);
          this.setState({ user: res.data.user });
          console.log(this.state.user);

          localStorage.setItem("token", this.state.token);
          localStorage.setItem("user", JSON.stringify(this.state.user));
          this.setState({ redirect: true });

          //const socket = io("http://127.0.0.1:8000");
          //localStorage.setItem("socket", socket);
          //wwill@example.net
        }
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ email_err: error.response.data.errors.email });
        this.setState({ password_err: error.response.data.errors.password });
      });
  };
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="Conversations" />;
    }
    return (
      <div className="form_container">
        <div className="header_form">
          <h1>sign in </h1>
        </div>
        <form onSubmit={this.handleLogin}>
          <div className="email_container">
            <label>email</label>
            <input type="email" name="" id="" onChange={this.HandleEmail} />
            <p></p>
          </div>
          <div className="password_container">
            <label>password</label>
            <input
              type="password"
              name=""
              id=""
              onChange={this.HandlePassword}
            />
            <p></p>
          </div>
          <input type="submit" value="Sign in" />
        </form>
      </div>
    );
  }
}
