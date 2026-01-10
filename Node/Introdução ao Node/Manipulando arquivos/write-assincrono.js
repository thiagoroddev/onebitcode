const fs = require("fs");

const content = "conteudo síncrono";

fs.writeFile("exemplo-assincrono.txt", content, "utf8", (err) => {
  if (err) {
    console.error("Erro ao escrever o arquivo:", err);
  } else {
    console.log("Arquivo escrito com sucesso.");
  }
});
