const fs = require("fs");

fs.rename("renomeie-esse-arquivo.txt", "arquivo-renomeado.txt", (err) => {
  if (err) {
    console.error("Erro ao renomear o arquivo:", err);
    return;
  }
  console.log("Arquivo renomeado com sucesso.");
});
