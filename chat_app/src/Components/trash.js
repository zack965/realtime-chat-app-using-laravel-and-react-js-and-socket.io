/*
let data = {
      //message: Message,
      conversation_first_partner: location.state.conversation_first_partner,
      conversation_second_partner: location.state.conversation_second_partner,
      message_sender: User.id,
      conversation_id: location.state.conversation_id,
      message_body: Message,
      message_is_read: 0,
    };
    
  
    if(item.message_sender == User.id) ? (
          <p>{item.message_body}</p>
        ):(
          <p>{item.message_body}</p>
        )

         if (item.message_sender === User.id) {
          return <p className="me">{item.message_body}</p>;
        } else {
          return <p className="another">{item.message_body}</p>;
        }
  
  //addMessage(Message);

    //socket.emit("SendClient", Message);
    socket.on("SendClient", (Message) => {
      addMessage(Message);
    });
    
    //SetMessage("");
    useEffect(() => {
    socket.on("SendClient", (Message) => {
      addMessage(Message);
    });
  }, [Counter]);
   useEffect(() => {
    console.log("two");
  }, [listen]);
   const InitializeConnection = () => {
    let ip_address = "127.0.0.1";
    let socket_port = "4000";
    let _socket = io(ip_address + ":" + socket_port);
    let sockeet = io("http://localhost:7000");
    SetSocket(sockeet);
  };
  const addMessage = (message) => {
    const divElement = elementRef.current;
    var node = document.createElement("p");
    var textnode = document.createTextNode(`${message}`);
    node.appendChild(textnode);
    divElement.appendChild(node);
    console.log(node);
    console.log(divElement);
  };
  sockeet.on("SendClient", (Message) => {
      SetConversations([...Conversations, Message]);
    });
    let data = {
      //message: Message,
      message_id: 77,
      message_sender: 1,
      conversation_id: 1,
      message_body: "wvv",
      message_is_read: 0,
    };
*/
/*
brando00@example.net
tillman.michel@example.net
*/
