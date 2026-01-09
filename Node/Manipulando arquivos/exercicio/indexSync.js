import {
  criaArquivo,
  lerArquivo,
  atualizaArquivo,
  deletaArquivo,
} from "./manipulandoArquivoSync.js";

criaArquivo("Arquivo novo criado", "testeSync");
lerArquivo("testeSync");
atualizaArquivo("testeSync", "Texto novo aquiii");
lerArquivo("testeSync");
deletaArquivo("testeSync");
