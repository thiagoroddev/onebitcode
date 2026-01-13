import {
  criaArquivo,
  lerArquivo,
  atualizaArquivo,
  deletaArquivo,
} from "./manipulandoArquivoAsync.js";

// vai dar erro , é normal
criaArquivo("Texto do arquivo novo criado", "teste");
lerArquivo("teste");
atualizaArquivo("teste", "Novo texto");
deletaArquivo("teste");
