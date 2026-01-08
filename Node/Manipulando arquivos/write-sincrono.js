const fs = require("node:fs");

try {
  // Escreve dados em um arquivo (cria o arquivo se não existir)
  fs.writeFileSync("exemplo-sincrono.txt", "Olá, mundo!", "utf8");
  console.log("Arquivo escrito com sucesso.");
} catch (err) {
  console.error("Erro ao escrever o arquivo:", err);
}
