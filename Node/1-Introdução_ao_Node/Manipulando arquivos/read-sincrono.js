const fs = require("fs");

try {
  // Lê o conteúdo de um arquivo de texto
  const data = fs.readFileSync("exemplo-sincrono.txt", "utf8");
  console.log("Conteúdo do arquivo:", data);
} catch (err) {
  console.error("Erro ao ler o arquivo:", err);
}
