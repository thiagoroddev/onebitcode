const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

server.get("/artigos", (req, res) => {
  res.send("Artigos");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor Express iniciando em http://localhost:${PORT}/`);
});
