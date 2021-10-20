import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Conversations.css";
export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("token"),
      socket: this.props.socket,
      cnvr_arr: [],
    };
  }
  componentDidMount() {
    //console.log(socket);
    //console.log(socket.id);

    //const socket = this.props.socket;
    //console.log(this.state.cnvr_arr.length);

    //localStorage.setItem("socket", socket);
    /*let ip_address = "127.0.0.1";
    let socket_port = "4000";
    let socket = io(ip_address + ":" + socket_port);*/
    //this.setState({ socket: socket });
    /*const socket = io("http://localhost:7000", {
      UserId: this.state.user.id,
    });*/

    let url = `http://127.0.0.1:8000/api/ConversationUser/${this.state.user.id}`;
    let access_token = this.state.token;
    const headers = {
      "Content-Type": "application/json",
      //'Authorization': `Bearer ${access_token}`
      Authorization: `Bearer ${access_token}`,
    };
    axios.get(url, { headers: headers }).then((res) => {
      this.setState({ Data: res.data.conversations });
      console.log(res.data.conversations);
      let joined;
      res.data.conversations.map((item) => {
        joined = this.state.cnvr_arr.concat(item.last_message.conversation_id);
        this.setState({ cnvr_arr: joined });
      });
      //this.setState({ cnvr_arr: res.data.conversations.length });
      console.log(this.state.cnvr_arr);

      const userData = {
        userId: this.state.user.id,
        chats: this.state.cnvr_arr,
      };
      //console.log(userId);
      this.state.socket.emit("connected", userData);
    });
    // <h1>{item.last_message.message_body}</h1>
  }
  joinchat = (conversation_id) => {
    this.state.socket.emit("joinchat", conversation_id);
  };

  render() {
    return (
      <div>
        <p style={{ textAlign: "center" }}>{this.state.user.name}</p>
        {this.state.Data.map((item) => {
          return (
            <div className="container_conv">
              <h1>{item.f_name}</h1>
              <h1>{item.last_n}</h1>
              <h1>{item.conversation_first_partner}</h1>
              <h1>{item.conversation_second_partner}</h1>
              <h1>{item.last_message.conversation_id}</h1>
              <h1>{item.last_message.message_body}</h1>
              <Link
                onClick={this.joinchat(item.last_message.conversation_id)}
                to={{
                  pathname: "/Messages",
                  state: {
                    conversation_id: item.last_message.conversation_id,
                    conversation_first_partner: item.conversation_first_partner,
                    conversation_second_partner:
                      item.conversation_second_partner,
                    //socket: socket,
                  },
                }}
              >
                Messages
              </Link>
            </div>
          );
        })}
        <p>{this.state.cnvr_arr}</p>
        <p>{this.state.cnvr_arr.length}</p>
      </div>
    );
  }
}
