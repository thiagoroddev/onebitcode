const express = require("express");
const path = require("node:path");
const app = express();

const storedUsers = [];

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuração do body
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  const title = "Inicio";
  const message = "Mensagem dinânimca inserida na rota pelo EJS";

  //  res.send("Hello Word");
  res.render("index", {title, message});
});

app.get("/formulario", (req, res) => {
  res.render("form");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);
  console.log(req.body);
  storedUsers.push({username, password});

  res.redirect(303, "/usuarios");
});

app.get("/usuarios", (req, res) => {
  res.render("users", {users: storedUsers});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
