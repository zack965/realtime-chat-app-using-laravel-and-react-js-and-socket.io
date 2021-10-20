import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:7000");
function Test() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    //socket.emit('message',{userName,message})
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <div className="App">
      <h1>Welcome to chat app</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Type message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        ></input>
        <button type="submit">Send</button>
      </form>
      {chat.map((payload) => {
        return (
          <h3>
            {" "}
            <span>{payload}</span>
          </h3>
        );
      })}
    </div>
  );
}

export default Test;
