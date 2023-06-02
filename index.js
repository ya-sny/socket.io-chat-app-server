const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
  cors:
  {
    origin: "http://localhost:3000",
  }
});

const PORT = 3001;

io.on("connection", (socket) => {
  console.log("connected user. socket id:" + socket.id);

  // ルームに入る時のソケット設定
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ID: ${socket.id}. Join ${data}`);
  });

  //チャット専用ソケット設定
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected user. socket id:" + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
