import fs from "node:fs";

export function criaArquivo(texto, nomeArquivo) {
  fs.writeFile(`${nomeArquivo}.txt`, texto, (error) => {
    if (error) {
      console.log("Deu erro rapaz", error.message);
    } else {
      console.log("Arquivo criado com sucesso");
    }
  });
}

export function lerArquivo(nomeArquivo) {
  fs.readFile(`${nomeArquivo}.txt`, "utf8", (error, texto) => {
    if (error) {
      console.log("Arquivo não encontrado", error.message);
    } else {
      console.log(`Lendo arquivo: ${texto}`);
    }
  });
}

export function atualizaArquivo(nomeArquivo, novoTexto) {
  fs.writeFile(`${nomeArquivo}.txt`, novoTexto, (error) => {
    if (error) {
      console.log("Deu erro na parada mano", error.message);
    } else {
      console.log("Texto do arquivo atualizado. ");
      console.log(`Esse é o novo texto: ${novoTexto}`);
    }
  });
}

export function deletaArquivo(nomeArquivo) {
  fs.unlink(`${nomeArquivo}.txt`, (error) => {
    if (error) {
      console.log("Deu erro no delete", error.message);
    } else {
      console.log("Arquivo excluido");
    }
  });
}
