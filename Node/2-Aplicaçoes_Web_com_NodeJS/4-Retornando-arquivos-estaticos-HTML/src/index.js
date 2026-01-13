const express = require("express");

const server = express();

server.use(express.static("public"));
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Servidor iniciado");
});
