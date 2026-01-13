/*
Crie uma aplicação de linha de comando usando Node.js para criar e gerenciar anotações rápidas pelo terminal. A aplicação deve possuir um menu de diferentes opções, permitindo criar anotações, listar todas os arquivos salvos, ler uma anotação específica e excluir uma anotação específica. Todas as anotações devem ser salvas em formato .txt dentro de uma pasta “notes” junto com o próprio script principal.
*/

const fs = require("fs");
const path = require("path");
const readline = require("readline/promises");

// Configuração do caminho da pasta de notas
const notesDir = path.join(__dirname, "notes");

// Garante que a pasta "notes" existe
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

// Configuração da interface de entrada/saída
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  let sair = false;

  while (!sair) {
    console.log("\n--- GERENCIADOR DE ANOTAÇÕES ---");
    console.log("1. Criar nova anotação");
    console.log("2. Listar todas as anotações");
    console.log("3. Ler uma anotação");
    console.log("4. Excluir uma anotação");
    console.log("5. Sair");

    const opcao = await rl.question("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await criarNota();
        break;
      case "2":
        listarNotas();
        break;
      case "3":
        await lerNota();
        break;
      case "4":
        await excluirNota();
        break;
      case "5":
        sair = true;
        console.log("Encerrando...");
        break;
      default:
        console.log("Opção inválida!");
    }
  }
  rl.close();
}

// --- Funções de Ação ---

async function criarNota() {
  const titulo = await rl.question("Título da nota (sem .txt): ");
  const conteudo = await rl.question("Conteúdo da nota: ");

  const filePath = path.join(notesDir, `${titulo}.txt`);

  fs.writeFileSync(filePath, conteudo);
  console.log(`\n[Sucesso] Nota "${titulo}" criada!`);
}

function listarNotas() {
  const arquivos = fs.readdirSync(notesDir); // Lê os arquivos na pasta de notas

  if (arquivos.length === 0) {
    console.log("\nNenhuma nota encontrada.");
    return;
  }

  // Lista os arquivos encontrados
  console.log("\n--- SUAS NOTAS ---");
  arquivos.forEach((arquivo, index) => {
    console.log(`${index + 1}. ${arquivo}`);
  });
}

async function lerNota() {
  const arquivos = fs.readdirSync(notesDir); // Lê os arquivos na pasta de notas
  if (arquivos.length === 0) {
    console.log("\nNão há notas para ler.");
    return;
  }

  listarNotas();
  const nome = await rl.question(
    "\nDigite o nome exato do arquivo (com .txt) para ler: "
  );
  const filePath = path.join(notesDir, nome);

  if (fs.existsSync(filePath)) {
    const conteudo = fs.readFileSync(filePath, "utf8");
    console.log(`\n--- CONTEÚDO DE ${nome} ---\n`);
    console.log(conteudo);
    console.log("\n---------------------------");
  } else {
    console.log("\n[Erro] Arquivo não encontrado.");
  }
}

async function excluirNota() {
  listarNotas();
  const nome = await rl.question(
    "\nDigite o nome do arquivo para excluir (com .txt): "
  );
  const filePath = path.join(notesDir, nome);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`\n[Sucesso] Nota "${nome}" removida!`);
  } else {
    console.log("\n[Erro] Arquivo não encontrado.");
  }
}

// Inicia a aplicação
main();
