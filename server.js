const express = require("express");
const app = express();

//インストールなしでOK
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("chat message", (msg) => {
    // console.log("メッセージ：" + msg);
    io.emit("chat message", msg);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
