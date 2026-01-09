import {
  atualizaArquivo,
  lerArquivo,
  criaArquivo,
  deletaArquivo,
} from "./manipulandoArquivoPromisse.js";

async function main() {
  try {
    await criaArquivo("testePromise", "Texto do arquivo com Promises");
    console.log(await lerArquivo("testePromise"));
    await atualizaArquivo("testePromise", "Novo texto modificado Promise");
    console.log(await lerArquivo("testePromise"));
    await deletaArquivo("testePromise");
  } catch (erro) {
    console.log(erro);
  }
}

main();
