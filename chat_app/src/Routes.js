import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Conversations from "./Components/Conv/Conversations";
import Home from "./Components/Home/Home";
import Messages from "./Components/Messages/Messages";
import Test from "./Components/Test";
import { io } from "socket.io-client";
const socket = io("http://localhost:7000");
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Conversations">
          <Conversations socket={socket} />
        </Route>
        <Route path="/Messages">
          <Messages socket={socket} />
        </Route>
        <Route path="/Test">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
