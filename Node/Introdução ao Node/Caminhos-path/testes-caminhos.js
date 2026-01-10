const path = require("node:path");

// Junta vários segmentos de caminho
const fullPath = path.join("src", "scripts", "arquivos.js");
console.log(fullPath);

const relativePath = "../arquivos/relatorio.pdf";

const absolutePath = path.resolve(relativePath);
console.log(absolutePath);

// Extrai o nome do arquivo a partir de um caminho
const fileName = path.basename(relativePath);
console.log(fileName);

// Extrai a extensão do arquivo a partir de um caminho
const ext = path.extname(absolutePath);
console.log(ext);
