import fs from "node:fs";

export function criaArquivo(nomeArquivo, texto) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${nomeArquivo}.txt`, texto, (error) => {
      if (error) {
        console.log("Deu problema na criação do arquivo");
        reject(error.message);
      } else {
        console.log("Arquivo criado");
        resolve();
      }
    });
  });
}

export function lerArquivo(nomeArquivo) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${nomeArquivo}.txt`, "utf-8", (error, data) => {
      if (error) {
        console.log("Erro ao tentar ler o arquivo");
        reject(error.message);
      } else {
        console.log("Lendo o arquivo");
        resolve(data);
      }
    });
  });
}

export function atualizaArquivo(nomeArquivo, novoTexto) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${nomeArquivo}.txt`, novoTexto, (error) => {
      if (error) {
        console.log("Erro ao tentar atualizar o arquivo");
        reject(error.message);
      } else {
        console.log("Arquivo atualizado");
        resolve();
      }
    });
  });
}

export function deletaArquivo(nomeArquivo) {
  return new Promise((resolve, reject) => {
    fs.unlink(`${nomeArquivo}.txt`, (error) => {
      if (error) {
        console.log("Erro ao tentar deletar o arquivo");
        reject(error.message);
      } else {
        console.log("Arquivo deletado");
        resolve();
      }
    });
  });
}
