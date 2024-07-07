const express = require("express");
const app = express();
const http = require("http");

const expressServer = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(expressServer);

// io.on("connection", (socket) => {
//     socket.on('chat', (msg) => {
//         io.emit("chat_send", msg)
//     })
// })

io.on("connection", (socket) => {
    socket.join("kitchen");
      let sizeOfKitchin = io.sockets.adapter.rooms.get("kitchen").size;
  io.sockets.in("kitchen").emit("cooking", "fried rice cooking =" + sizeOfKitchin);

  socket.join("bed");
  io.sockets.in("bed").emit("sleep", "am sleeping");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
expressServer.listen(3600, () => {
  console.log("server is running on port 3600");
});
