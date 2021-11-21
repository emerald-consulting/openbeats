var cors = require("cors");

const express = require("express");
const app = express();

app.use(cors({
    origin: "*"
}));

const server = require("http").Server(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

io.on("connection", (socket) => {
  const { id } = socket.client;
  console.log(`User Connected: ${id}`);
  socket.on("chat message", ({ nickname, msg }) => {
    io.emit("chat message", { nickname, msg });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
