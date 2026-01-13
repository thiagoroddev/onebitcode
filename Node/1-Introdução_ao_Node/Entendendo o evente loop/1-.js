const fs = require("fs");

console.log("Início do script");

fs.readFile("./Teste.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }
  console.log("Conteúdo do arquivo:", data);
});

console.log("Fim do script");

/*
1. A Ordem de Execução (Event Loop)
Repare que a saída foi:

Início do script

Fim do script

Erro ao ler o arquivo...

Isso aconteceu exatamente como explicamos:

O Node iniciou o script e executou o primeiro console.log (Síncrono).

Ao chegar no fs.readFile, ele delegou a leitura ao Sistema Operacional e não ficou esperando.

Ele seguiu para a próxima linha e executou o último console.log (Síncrono).

A pilha de execução (Stack) ficou vazia.

O Event Loop viu que a resposta do arquivo (no caso, o erro) chegou, colocou o callback na fila e o executou por último.
/** 
2. Callbacks e Assincronismo
O uso de callbacks é uma das formas mais comuns de lidar com operações assíncronas em Node.js.

Quando você passa uma função como callback (como no caso do fs.readFile), essa função será chamada quando a operação assíncrona for concluída.

Isso permite que o Node.js continue executando outras tarefas enquanto espera pela conclusão da operação, melhorando a eficiência e a performance do aplicativo.
*/
