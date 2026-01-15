const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public")); // Servir arquivos estáticos da pasta "public"

app.use(express.urlencoded({extended: true})); // Middleware para parsear o corpo das requisições
let emails = []; // Alterado de const para let para permitir reatribuição

// Rotas
app.get("/", (req, res) => {
  res.render("index");
});

// Rota para processar o formulário de inscrição
app.post("/signup", (req, res) => {
  const {email} = req.body;

  if (email) {
    emails.push(email);
    res.redirect("/sucess");
  } else {
    res.redirect("/");
  }
});

// Rota para página de sucesso
app.get("/sucess", (req, res) => {
  res.render("sucess");
});

// Rota para listar e deletar emails
app.get("/emails", (req, res) => {
  res.render("emails", {emails});
});

// Rota para deletar um email
app.post("/emails/delete", (req, res) => {
  let {email} = req.body;

  emails = emails.filter((item) => item !== email); // Reatribuição permitida com let
  res.redirect("/emails");
});

const PORT = 3000; // Porta do servidor

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando em http://localhost:${PORT}`);
});
