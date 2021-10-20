import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./Messages.css";
import FormData from "form-data";

const Messages = (props) => {
  //const socket = this.props.socket;
  const [socket, SetSocket] = useState(props.socket);
  let location = useLocation();
  const [Conversations, SetConversations] = useState([]);
  const [User, SetUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [Message, SetMessage] = useState("");

  const GetMessages = () => {
    let access_token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    let url = `http://127.0.0.1:8000/api/GetMessagesOfConversation/${location.state.conversation_id}`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res.data.messages);
        SetConversations(res.data.messages);
        console.log(res.data.messages.message_body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //console.log(localStorage.getItem("socket"));
    GetMessages();
    console.log("one");
  }, []);

  useEffect(() => {
    socket.on("message", (payload) => {
      //parseInt(payload.message_sender);
      console.log(payload);
      if (payload.conversation_id == location.state.conversation_id) {
        SetConversations([...Conversations, payload]);
      }

      //SetConversations([...Conversations, payload]);
      console.log(Conversations);
    });
  });

  const SendMessage = (e) => {
    e.preventDefault();
    let access_token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };

    let formData = new FormData();
    formData.append(
      "conversation_first_partner",
      location.state.conversation_first_partner
    );
    formData.append(
      "conversation_second_partner",
      location.state.conversation_second_partner
    );
    formData.append("message_sender", User.id);
    formData.append("conversation_id", location.state.conversation_id);
    formData.append("message_body", Message);
    formData.append("message_is_read", 0);
    if (User.id == location.state.conversation_second_partner) {
      formData.append(
        "message_receiver",
        location.state.conversation_first_partner
      );
    } else {
      formData.append(
        "message_receiver",
        location.state.conversation_second_partner
      );
    }
    let url = "http://127.0.0.1:8000/api/SendMessage";

    axios({
      method: "post",
      url: url,
      data: formData,
      headers: headers,
    })
      .then((res) => {
        //console.log(res);
        let data = res.data.data_message;
        //socket.emit("message", res.data.data_message);
        socket.emit("message", res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <p style={{ textAlign: "center", fontSize: 28 }}>{User.id}</p>
      <div className="message_container">
        {Conversations.map((item) => {
          if (item.message_sender !== User.id) {
            return (
              <p key={item.message_id} className="another">
                {item.message_body}
              </p>
            );
          } else {
            return (
              <p key={item.message_id} className="me">
                {item.message_body}
              </p>
            );
          }
        })}
      </div>
      <div className="send_message_container">
        <input
          type="text"
          placeholder="send message"
          className="input_message"
          onChange={(e) => SetMessage(e.target.value)}
          //value="hello"
        />
        <button onClick={SendMessage}> Send Message</button>
      </div>
    </div>
  );
};

export default Messages;
