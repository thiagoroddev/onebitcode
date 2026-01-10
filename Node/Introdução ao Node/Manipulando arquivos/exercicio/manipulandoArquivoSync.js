import fs from "node:fs";

export function criaArquivo(texto, nomeArquivo) {
  fs.writeFileSync(`${nomeArquivo}.txt`, texto);
  console.log("Arquivo criado");
}

export function lerArquivo(nomeArquivo) {
  try {
    const conteudo = fs.readFileSync(`${nomeArquivo}.txt`, "utf8");
    console.log("Lendo arquivo", conteudo);
  } catch (error) {
    console.log("Erro ao tentar ler o arquivo");
  }
}

export function atualizaArquivo(nomeArquivo, novoTexto) {
  fs.writeFileSync(`${nomeArquivo}.txt`, novoTexto);
  console.log("Atualizando o arquivo");
}

export function deletaArquivo(nomeArquivo) {
  try {
    fs.unlinkSync(`${nomeArquivo}.txt`);
    console.log("Deletando o arquivo");
  } catch (error) {
    console.log("Erro ao tentar cancelar o arquivo");
  }
}
