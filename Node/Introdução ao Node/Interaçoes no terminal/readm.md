# Interações de Entrada e Saída no Terminal - Node.js

## 📚 Índice

1. [Introdução](#introdução)
2. [Process stdin/stdout - O Básico](#process-stdinstdout---o-básico)
3. [Módulo readline - Facilitando Interações](#módulo-readline---facilitando-interações)
4. [Método question() - Fazendo Perguntas](#método-question---fazendo-perguntas)
5. [Evento close - Encerrando Graciosamente](#evento-close---encerrando-graciosamente)
6. [Evento SIGINT - Tratando Ctrl+C](#evento-sigint---tratando-ctrlc)
7. [Exemplos Práticos Completos](#exemplos-práticos-completos)
8. [Boas Práticas](#boas-práticas)

---

## Introdução

### O que são stdin e stdout?

- **stdin** (Standard Input) - Entrada padrão → O que o usuário digita
- **stdout** (Standard Output) - Saída padrão → O que aparece no terminal

### 🎯 Analogia

Pense no terminal como uma **conversa**:

- **stdout** é você **falando** (escrevendo na tela)
- **stdin** é você **ouvindo** (lendo o que o usuário digita)

---

## Process stdin/stdout - O Básico

### O que são?

`process.stdin` e `process.stdout` são objetos globais do Node.js que representam as streams de entrada e saída conectadas ao terminal.

- **process.stdin** → ReadableStream (leitura)
- **process.stdout** → WritableStream (escrita)

### Exemplo Básico

```javascript
// Escrever no terminal
process.stdout.write("Olá, mundo!\n");

// Ler do terminal
process.stdin.on("data", (data) => {
  process.stdout.write(`Você digitou: ${data}`);
});
```

### Como funciona?

```
Usuário digita → stdin (stream de leitura) → Seu código processa → stdout (stream de escrita) → Terminal exibe
```

### Exemplo: Echo Simples

```javascript
console.log("Digite algo e pressione Enter:");

process.stdin.on("data", (data) => {
  const texto = data.toString().trim();
  process.stdout.write(`Echo: ${texto}\n`);
});
```

### Exemplo: Converter para Maiúsculas

```javascript
process.stdout.write("Digite algo (Ctrl+C para sair):\n");

process.stdin.on("data", (data) => {
  const texto = data.toString().trim();
  const maiuscula = texto.toUpperCase();
  process.stdout.write(`MAIÚSCULA: ${maiuscula}\n`);
});
```

### ⚠️ Problema com process.stdin/stdout

Usar diretamente pode ser **trabalhoso** para interações mais complexas:

```javascript
// ❌ Complicado fazer perguntas sequenciais
process.stdout.write("Qual seu nome? ");
process.stdin.once("data", (nome) => {
  process.stdout.write("Qual sua idade? ");
  process.stdin.once("data", (idade) => {
    process.stdout.write(
      `${nome.toString().trim()}, você tem ${idade.toString().trim()} anos\n`
    );
  });
});
```

**Solução:** Usar o módulo `readline`! 👇

---

## Módulo readline - Facilitando Interações

### O que é?

O módulo `readline` facilita a criação de interfaces de **leitura/escrita** no terminal, tornando interações mais simples e intuitivas.

### Como importar?

```javascript
const readline = require("readline");

// Ou (ES Modules)
import readline from "readline";
```

### Criando uma Interface

```javascript
const readline = require("readline");

// Criar interface conectando stdin e stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

### Por que usar?

✅ Mais fácil fazer perguntas  
✅ Melhor controle sobre entrada/saída  
✅ Eventos úteis (line, close, SIGINT)  
✅ Métodos prontos (question, prompt)

### Exemplo: Evento "line"

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Disparado toda vez que o usuário pressiona Enter
rl.on("line", (input) => {
  console.log(`Você digitou: "${input}"`);
});
```

### Exemplo: Echo com readline

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Digite algo (Ctrl+C para sair):");

rl.on("line", (linha) => {
  console.log(`Echo: ${linha}`);
});
```

### Diferença: stdout.write vs console.log

```javascript
// Ambos fazem a mesma coisa, mas:
process.stdout.write("Olá\n"); // Mais controle
console.log("Olá"); // Mais conveniente (adiciona \n automaticamente)

rl.write("Olá\n"); // Escreve na interface readline
```

---

## Método question() - Fazendo Perguntas

### O que é?

O método `question()` permite fazer perguntas ao usuário e capturar a resposta através de um callback.

### Sintaxe

```javascript
rl.question("Sua pergunta aqui? ", (resposta) => {
  // Fazer algo com a resposta
});
```

### Exemplo Básico

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Qual é o seu nome? ", (resposta) => {
  console.log(`Olá, ${resposta}!`);
  rl.close();
});
```

### Exemplo: Múltiplas Perguntas

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Qual é o seu nome? ", (nome) => {
  rl.question("Qual é a sua idade? ", (idade) => {
    rl.question("Qual é a sua cidade? ", (cidade) => {
      console.log(`\nResumo:`);
      console.log(`Nome: ${nome}`);
      console.log(`Idade: ${idade}`);
      console.log(`Cidade: ${cidade}`);
      rl.close();
    });
  });
});
```

### Exemplo: Calculadora Simples

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite o primeiro número: ", (num1) => {
  rl.question("Digite o segundo número: ", (num2) => {
    const resultado = parseFloat(num1) + parseFloat(num2);
    console.log(`Resultado: ${num1} + ${num2} = ${resultado}`);
    rl.close();
  });
});
```

### 💡 Dica: Usando Promises

Para evitar "callback hell", podemos criar uma função que retorna Promise:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função helper que retorna Promise
function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

// Usar com async/await
async function main() {
  const nome = await perguntar("Qual é o seu nome? ");
  const idade = await perguntar("Qual é a sua idade? ");
  const cidade = await perguntar("Qual é a sua cidade? ");

  console.log(`\nOlá, ${nome}!`);
  console.log(`Você tem ${idade} anos e mora em ${cidade}.`);

  rl.close();
}

main();
```

---

## Evento close - Encerrando Graciosamente

### O que é?

O evento `close` é disparado quando a interface readline é fechada. Útil para executar código de limpeza ou mensagens de despedida.

### Sintaxe Básica

```javascript
rl.on("close", () => {
  // Código executado ao fechar
  console.log("Saindo...");
  process.exit(0);
});
```

### Exemplo Completo

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Qual é o seu nome? ", (resposta) => {
  console.log(`Olá, ${resposta}!`);
  rl.close(); // Fecha a interface
});

// Disparado quando rl.close() é chamado
rl.on("close", () => {
  console.log("\n👋 Até logo!");
  process.exit(0); // Encerra o processo
});
```

### ⚠️ Importante: process.exit(0)

Quando você adiciona um listener para `close`, o processo pode ficar "pendurado". Por isso, é necessário chamar `process.exit(0)` manualmente.

```javascript
// ❌ Sem process.exit() - processo fica pendurado
rl.on("close", () => {
  console.log("Saindo...");
});

// ✅ Com process.exit() - processo encerra corretamente
rl.on("close", () => {
  console.log("Saindo...");
  process.exit(0);
});
```

### Exemplo: Salvando Dados ao Sair

```javascript
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dados = [];

rl.on("line", (linha) => {
  if (linha.trim() === "sair") {
    rl.close();
  } else {
    dados.push(linha);
    console.log(`Adicionado: ${linha}`);
  }
});

rl.on("close", () => {
  console.log("\n💾 Salvando dados...");
  fs.writeFileSync("dados.txt", dados.join("\n"));
  console.log(`✅ ${dados.length} itens salvos!`);
  console.log("👋 Até logo!");
  process.exit(0);
});

console.log('Digite itens (digite "sair" para encerrar):');
```

---

## Evento SIGINT - Tratando Ctrl+C

### O que é SIGINT?

**SIGINT** (Signal Interrupt) é o sinal enviado quando o usuário pressiona **Ctrl+C** no terminal. Por padrão, isso encerra o programa imediatamente.

### Por que tratar?

Tratar o SIGINT permite:
✅ Confirmar se o usuário quer realmente sair  
✅ Salvar dados antes de encerrar  
✅ Executar limpeza de recursos  
✅ Melhorar a experiência do usuário

### Exemplo Básico

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Capturar Ctrl+C
rl.on("SIGINT", () => {
  rl.question("Deseja realmente sair? (s/n) ", (resposta) => {
    if (resposta.trim().toLowerCase() === "s") {
      console.log("👋 Até logo!");
      rl.close();
    } else {
      console.log("Você escolheu continuar.");
    }
  });
});

console.log("Aplicação rodando... (Pressione Ctrl+C para tentar sair)");
```

### Exemplo: Confirmação com Validação

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("SIGINT", () => {
  rl.question("\n⚠️  Deseja realmente sair? (s/n) ", (resposta) => {
    const resp = resposta.trim().toLowerCase();

    if (resp === "s" || resp === "sim") {
      console.log("👋 Encerrando aplicação...");
      rl.close();
    } else if (resp === "n" || resp === "não" || resp === "nao") {
      console.log("✅ Continuando...\n");
    } else {
      console.log('❌ Resposta inválida. Digite "s" ou "n".');
    }
  });
});

rl.on("close", () => {
  console.log("Processo encerrado.");
  process.exit(0);
});

console.log("Digite algo (Ctrl+C para sair):");

rl.on("line", (linha) => {
  console.log(`Você disse: ${linha}`);
});
```

### Exemplo: Salvando Antes de Sair

```javascript
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tarefas = [];

rl.on("line", (linha) => {
  if (linha.trim()) {
    tarefas.push(linha);
    console.log(`✅ Tarefa adicionada: ${linha}`);
    console.log(`Total de tarefas: ${tarefas.length}\n`);
  }
});

rl.on("SIGINT", () => {
  console.log("\n");
  rl.question(
    "⚠️  Deseja salvar as tarefas antes de sair? (s/n) ",
    (resposta) => {
      if (resposta.trim().toLowerCase() === "s") {
        fs.writeFileSync("tarefas.txt", tarefas.join("\n"));
        console.log(`💾 ${tarefas.length} tarefas salvas!`);
      }
      console.log("👋 Até logo!");
      rl.close();
    }
  );
});

rl.on("close", () => {
  process.exit(0);
});

console.log("📝 Lista de Tarefas");
console.log("Digite uma tarefa por linha (Ctrl+C para sair):\n");
```

---

## Exemplos Práticos Completos

### Exemplo 1: Calculadora Interativa

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, resolve);
  });
}

async function calculadora() {
  console.log("🔢 CALCULADORA SIMPLES\n");

  const num1 = parseFloat(await perguntar("Digite o primeiro número: "));
  const operacao = await perguntar("Digite a operação (+, -, *, /): ");
  const num2 = parseFloat(await perguntar("Digite o segundo número: "));

  let resultado;

  switch (operacao) {
    case "+":
      resultado = num1 + num2;
      break;
    case "-":
      resultado = num1 - num2;
      break;
    case "*":
      resultado = num1 * num2;
      break;
    case "/":
      resultado = num2 !== 0 ? num1 / num2 : "Erro: divisão por zero";
      break;
    default:
      resultado = "Operação inválida";
  }

  console.log(`\n✅ Resultado: ${num1} ${operacao} ${num2} = ${resultado}\n`);

  const continuar = await perguntar("Deseja fazer outro cálculo? (s/n) ");

  if (continuar.trim().toLowerCase() === "s") {
    calculadora();
  } else {
    console.log("👋 Até logo!");
    rl.close();
  }
}

rl.on("close", () => {
  process.exit(0);
});

calculadora();
```

### Exemplo 2: Quiz Interativo

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const perguntas = [
  {
    pergunta: "Qual é a capital do Brasil?",
    resposta: "brasília",
  },
  {
    pergunta: "Quanto é 5 + 3?",
    resposta: "8",
  },
  {
    pergunta: "Qual é a linguagem do Node.js?",
    resposta: "javascript",
  },
];

let pontos = 0;
let indicePergunta = 0;

function fazerPergunta() {
  if (indicePergunta >= perguntas.length) {
    console.log(`\n🎉 Quiz finalizado!`);
    console.log(`📊 Sua pontuação: ${pontos}/${perguntas.length}`);
    rl.close();
    return;
  }

  const atual = perguntas[indicePergunta];

  rl.question(`\n❓ ${atual.pergunta} `, (resposta) => {
    if (resposta.trim().toLowerCase() === atual.resposta) {
      console.log("✅ Correto!");
      pontos++;
    } else {
      console.log(`❌ Errado! A resposta correta é: ${atual.resposta}`);
    }

    indicePergunta++;
    fazerPergunta();
  });
}

rl.on("close", () => {
  console.log("👋 Obrigado por jogar!");
  process.exit(0);
});

console.log("🎮 QUIZ INTERATIVO");
console.log("Responda as perguntas a seguir:\n");

fazerPergunta();
```

### Exemplo 3: Menu Interativo

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function exibirMenu() {
  console.log("\n═══════════════════════════");
  console.log("      MENU PRINCIPAL");
  console.log("═══════════════════════════");
  console.log("1. Ver informações");
  console.log("2. Configurações");
  console.log("3. Ajuda");
  console.log("4. Sair");
  console.log("═══════════════════════════\n");
}

function processarOpcao(opcao) {
  switch (opcao.trim()) {
    case "1":
      console.log("\n📊 Mostrando informações...");
      exibirMenu();
      break;
    case "2":
      console.log("\n⚙️  Abrindo configurações...");
      exibirMenu();
      break;
    case "3":
      console.log("\n❓ Ajuda: Use as opções do menu para navegar.");
      exibirMenu();
      break;
    case "4":
      console.log("\n👋 Encerrando...");
      rl.close();
      break;
    default:
      console.log("\n❌ Opção inválida!");
      exibirMenu();
  }
}

rl.on("line", (linha) => {
  processarOpcao(linha);
});

rl.on("close", () => {
  console.log("Aplicação encerrada.");
  process.exit(0);
});

rl.on("SIGINT", () => {
  rl.question("\n⚠️  Deseja realmente sair? (s/n) ", (resposta) => {
    if (resposta.trim().toLowerCase() === "s") {
      rl.close();
    } else {
      console.log("Continuando...");
      exibirMenu();
    }
  });
});

console.log("🚀 Bem-vindo ao sistema!");
exibirMenu();
```

### Exemplo 4: Lista de Tarefas (TODO List)

```javascript
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tarefas = [];
const ARQUIVO = "tarefas.json";

// Carregar tarefas salvas
if (fs.existsSync(ARQUIVO)) {
  const dados = fs.readFileSync(ARQUIVO, "utf8");
  tarefas.push(...JSON.parse(dados));
}

function exibirMenu() {
  console.log("\n═══════════════════════════");
  console.log("   📝 LISTA DE TAREFAS");
  console.log("═══════════════════════════");
  console.log("1. Adicionar tarefa");
  console.log("2. Listar tarefas");
  console.log("3. Remover tarefa");
  console.log("4. Limpar tudo");
  console.log("5. Sair");
  console.log("═══════════════════════════\n");
}

function adicionarTarefa() {
  rl.question("Digite a tarefa: ", (tarefa) => {
    if (tarefa.trim()) {
      tarefas.push({id: Date.now(), texto: tarefa.trim(), concluida: false});
      console.log("✅ Tarefa adicionada!");
    }
    exibirMenu();
  });
}

function listarTarefas() {
  console.log("\n📋 TAREFAS:");
  if (tarefas.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
  } else {
    tarefas.forEach((t, i) => {
      const status = t.concluida ? "✅" : "⬜";
      console.log(`${i + 1}. ${status} ${t.texto}`);
    });
  }
  exibirMenu();
}

function removerTarefa() {
  listarTarefas();
  rl.question("Digite o número da tarefa para remover: ", (num) => {
    const indice = parseInt(num) - 1;
    if (indice >= 0 && indice < tarefas.length) {
      const removida = tarefas.splice(indice, 1);
      console.log(`❌ Tarefa removida: ${removida[0].texto}`);
    } else {
      console.log("❌ Número inválido!");
    }
    exibirMenu();
  });
}

function limparTudo() {
  rl.question("⚠️  Tem certeza que deseja limpar tudo? (s/n) ", (resp) => {
    if (resp.trim().toLowerCase() === "s") {
      tarefas.length = 0;
      console.log("🗑️  Todas as tarefas foram removidas.");
    }
    exibirMenu();
  });
}

function salvarTarefas() {
  fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
  console.log("💾 Tarefas salvas!");
}

rl.on("line", (linha) => {
  switch (linha.trim()) {
    case "1":
      adicionarTarefa();
      break;
    case "2":
      listarTarefas();
      break;
    case "3":
      removerTarefa();
      break;
    case "4":
      limparTudo();
      break;
    case "5":
      salvarTarefas();
      rl.close();
      break;
    default:
      console.log("❌ Opção inválida!");
      exibirMenu();
  }
});

rl.on("close", () => {
  salvarTarefas();
  console.log("👋 Até logo!");
  process.exit(0);
});

rl.on("SIGINT", () => {
  console.log("\n");
  rl.question("⚠️  Deseja salvar antes de sair? (s/n) ", (resp) => {
    if (resp.trim().toLowerCase() === "s") {
      salvarTarefas();
    }
    rl.close();
  });
});

console.log("🚀 Bem-vindo à Lista de Tarefas!");
exibirMenu();
```

---

## Boas Práticas

### 1. Sempre feche a interface readline

```javascript
// ✅ Bom
rl.question("Nome? ", (nome) => {
  console.log(`Olá, ${nome}!`);
  rl.close(); // Fecha a interface
});

// ❌ Ruim - deixa processo pendurado
rl.question("Nome? ", (nome) => {
  console.log(`Olá, ${nome}!`);
  // Esqueceu de fechar!
});
```

### 2. Use process.exit() no evento close

```javascript
rl.on("close", () => {
  console.log("Saindo...");
  process.exit(0); // ✅ Necessário!
});
```

### 3. Valide entradas do usuário

```javascript
rl.question("Digite sua idade: ", (idade) => {
  const idadeNum = parseInt(idade);

  if (isNaN(idadeNum) || idadeNum < 0) {
    console.log("❌ Idade inválida!");
    return;
  }

  console.log(`✅ Você tem ${idadeNum} anos.`);
  rl.close();
});
```

### 4. Trate erros

```javascript
rl.on("error", (erro) => {
  console.error("❌ Erro:", erro);
  process.exit(1);
});
```

### 5. Use async/await para código mais limpo

```javascript
// ❌ Callback hell
rl.question("Nome? ", (nome) => {
  rl.question("Idade? ", (idade) => {
    rl.question("Cidade? ", (cidade) => {
      // ...
    });
  });
});

// ✅ Async/await
function perguntar(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}

async function main() {
  const nome = await perguntar("Nome? ");
  const idade = await perguntar("Idade? ");
  const cidade = await perguntar("Cidade? ");
  // ...
}
```

### 6. Forneça feedback visual

```javascript
// ✅ Bom - usuário sabe o que fazer
console.log('Digite "sair" para encerrar');
rl.on("line", (linha) => {
  if (linha === "sair") {
    console.log("👋 Encerrando...");
    rl.close();
  }
});

// ❌ Ruim - usuário não sabe como sair
rl.on("line", (linha) => {
  // ...
});
```

### 7. Salve dados importantes antes de sair

```javascript
rl.on("SIGINT", () => {
  salvarDados(); // ✅ Salva antes de sair
  console.log("Dados salvos!");
  rl.close();
});
```

---

## 📊 Resumo Comparativo

| Característica  | process.stdin/stdout | readline        |
| --------------- | -------------------- | --------------- |
| Facilidade      | Difícil              | Fácil ✅        |
| Fazer perguntas | Complicado           | Simples ✅      |
| Eventos         | Poucos               | Muitos ✅       |
| Código          | Mais verboso         | Mais limpo ✅   |
| Controle        | Alto                 | Alto            |
| Quando usar     | Raramente            | Quase sempre ✅ |

---

## 🎯 Quando Usar Cada Abordagem

### Use process.stdin/stdout quando:

- Precisa de controle muito baixo nível
- Trabalhando com streams customizadas
- Integrando com outras ferramentas Unix

### Use readline quando:

- ✅ Criando aplicações CLI interativas
- ✅ Fazendo perguntas ao usuário
- ✅ Precisa de confirmações (Ctrl+C)
- ✅ Criando menus ou wizards
- ✅ Qualquer interação usuário-terminal

---

## 📚 Métodos e Eventos Principais

### readline Interface

**Métodos:**

- `rl.question(pergunta, callback)` - Fazer pergunta
- `rl.write(texto)` - Escrever na saída
- `rl.close()` - Fechar interface
- `rl.pause()` - Pausar entrada
- `rl.resume()` - Retomar entrada

**Eventos:**

- `line` - Quando usuário pressiona Enter
- `close` - Quando interface é fechada
- `SIGINT` - Quando usuário pressiona Ctrl+C
- `pause` - Quando entrada é pausada
- `resume` - Quando entrada é retomada

---

## ✅ Checklist de Boas Práticas

- [ ] Sempre fechar a interface com `rl.close()`
- [ ] Usar `process.exit(0)` no evento `close`
- [ ] Tratar o evento `SIGINT` para Ctrl+C
- [ ] Validar entradas do usuário
- [ ] Fornecer feedback visual claro
- [ ] Salvar dados antes de sair
- [ ] Usar async/await quando possível
- [ ] Adicionar mensagens de ajuda
- [ ] Testar todos os caminhos de entrada
- [ ] Tratar erros adequadamente

---

## 🎓 Conclusão

As interações de entrada e saída no terminal são fundamentais para criar aplicações CLI interativas. O módulo `readline` torna essas interações simples e elegantes, permitindo criar desde calculadoras simples até aplicações complexas como editores de texto e jogos de terminal.

**Lembre-se:**

- Use `readline` para interações do usuário
- Trate sempre `SIGINT` para melhor UX
- Feche a interface e encerre o processo corretamente
- Valide entradas e forneça feedback claro

Com essas ferramentas, você pode criar aplicações CLI profissionais e amigáveis! 🚀
