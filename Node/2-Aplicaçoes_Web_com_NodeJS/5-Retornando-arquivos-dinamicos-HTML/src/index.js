const express = require("express");
const path = require("node:path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const title = "Inicio";
  const message = "Mensagem dinânimca inserida na rota pelo EJS";

  //  res.send("Hello Word");
  res.render("index", {title, message});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
