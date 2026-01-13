const express = require("express");
const path = require("node:path");

const app = express();
const storedEmails = [];

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Funcionando");
});

app.get("/cadastre-se", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  const email = req.body.email;

  storedEmails.push(email);
  res.redirect("/sucesso");
});

app.get("/sucesso", (req, res) => {
  res.render("sucesso");
});

app.get("/emails", (req, res) => {
  res.render("emails", {storedEmails});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000/`);
});
