const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
var users = [];
const chats = new Set();
io.on("connection", (socket) => {
    console.log("connection made successfully");
    //console.log(`cnx user is${socket}`);
    //console.log(socket.id);
    socket.on("connected", function (userData) {
        //users[userId] = socket.id;
        //users.push({ userId: userId, socketiD: socket.id });
        //console.log(users[userId]);
        /*var user_data = { userId: userId, socketiD: socket.id };
        console.log(user_data);
        users.push(user_data);
        console.log(users);*/
        console.log(userData);
        userData.socketiD = socket.id;
        console.log(userData);
        users.push(userData);
        console.log(users);
        socket.join(userData.chats);
    });
    socket.on("message", (payload) => {
        let x = parseInt(payload.data_message.message_sender);
        let int_conversation_id = parseInt(
            payload.data_message.conversation_id
        );
        payload.data_message.message_sender = x;
        payload.data_message.conversation_id = int_conversation_id;
        console.log("Message received on server: ", payload);
        console.log(users);
        let rec_id;
        let socket_id;
        let send_socket_id;
        let cnvr = {};
        users.map((obj) => {
            if (obj.userId == payload.user_receiver.id) {
                // message receiver
                rec_id = obj.userId;
                socket_id = obj.socketiD;
            } else if (obj.userId == payload.data_message.message_sender) {
                //message sender
                send_socket_id = obj.socketiD;
                cnvr = obj;
            }
        });
        console.log(rec_id);
        console.log(socket_id);
        console.log(cnvr);
        /*io.to(socket_id)
            .to(send_socket_id)
            .emit("message", payload.data_message);*/
        console.log(payload.data_message.conversation_id);
        /*let convr_index =
            users.chats.indexOf(payload.data_message.conversation_id) + 1;*/
        //console.log(convr_index);
        /*io.to(payload.data_message.conversation_id).emit(
            "message",
            payload.data_message
        );*/
        let cnvr_id = cnvr.chats.indexOf(payload.data_message.conversation_id);
        console.log(cnvr_id);
        console.log(cnvr.chats[cnvr_id]);
        io.to(cnvr.chats[cnvr_id]).emit("message", payload.data_message);
    });
    /*socket.on("joinchat", (convpayload) => {
        chats.add(convpayload);
        console.log(chats);
    });*/
});

server.listen(7000, () => {
    console.log("I am listening at port: 7000)");
});
