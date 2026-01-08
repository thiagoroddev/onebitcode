const fs = require("fs");

const filename = "corrija-esse-nome.txt";

if (!fs.existsSync(filename)) {
  console.error("Arquivo não encontrado:", filename);
  process.exit(1);
} else {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return;
    }
    console.log("Conteúdo do arquivo:", data);
  });
}
