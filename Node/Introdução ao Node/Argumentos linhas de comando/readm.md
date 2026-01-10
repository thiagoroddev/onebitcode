# Argumentos de Linha de Comando no Node.js

## 📚 Índice

1. [Introdução](#introdução)
2. [O que é process.argv?](#o-que-é-processargv)
3. [Argumentos Posicionais](#argumentos-posicionais)
4. [Argumentos Nomeados](#argumentos-nomeados)
5. [Casos de Uso](#casos-de-uso)
6. [Exemplos Práticos](#exemplos-práticos)
7. [Bibliotecas Populares](#bibliotecas-populares)
8. [Boas Práticas](#boas-práticas)

---

## Introdução

### O que são argumentos de linha de comando?

Argumentos de linha de comando são valores passados para um script no momento da execução, permitindo que ele se comporte de forma dinâmica sem precisar de interação manual do usuário.

### 🎯 Analogia

Pense nos argumentos como **ingredientes** que você passa para uma receita:

```bash
# Sem argumentos (sempre faz a mesma coisa)
node fazerBolo.js

# Com argumentos (você escolhe os ingredientes)
node fazerBolo.js chocolate morango creme
```

### Por que usar?

✅ **Automatização** - Scripts podem rodar sem interação humana  
✅ **Flexibilidade** - Mesmo script, comportamentos diferentes  
✅ **Integração** - Funciona com CI/CD, cron jobs, etc  
✅ **Profissional** - Como comandos do sistema (npm, git, etc)

---

## O que é process.argv?

### Definição

`process.argv` é um **array** que contém todos os argumentos passados na linha de comando ao executar um script Node.js.

### Estrutura do process.argv

```javascript
// Executando: node script.js arg1 arg2 arg3

console.log(process.argv);

/*
Resultado:
[
  '/usr/bin/node',           // [0] Caminho do executável Node
  '/caminho/para/script.js', // [1] Caminho do script
  'arg1',                    // [2] Primeiro argumento
  'arg2',                    // [3] Segundo argumento
  'arg3'                     // [4] Terceiro argumento
]
*/
```

### Por que usar .slice(2)?

```javascript
// ❌ Inclui caminhos do Node e do script (inútil)
const todosArgs = process.argv;

// ✅ Pega só os argumentos que passamos
const args = process.argv.slice(2);
```

### Exemplo Visual

```
Comando:  node calc.js 10 + 5
          ↓    ↓      ↓  ↓ ↓
argv[0]:  node
argv[1]:  calc.js
argv[2]:  10         ← Queremos daqui pra frente!
argv[3]:  +
argv[4]:  5
```

---

## Argumentos Posicionais

### O que são?

Argumentos **posicionais** dependem da **ordem** em que são passados. A posição define o significado.

### Sintaxe

```bash
node script.js valor1 valor2 valor3
               ↓      ↓      ↓
            args[0] args[1] args[2]
```

### Exemplo Básico

```javascript
// script.js
const args = process.argv.slice(2);

console.log("Argumentos informados:", args);
console.log("Primeiro argumento:", args[0]);
console.log("Segundo argumento:", args[1]);
```

**Executar:**

```bash
node script.js João 25
```

**Saída:**

```
Argumentos informados: [ 'João', '25' ]
Primeiro argumento: João
Segundo argumento: 25
```

### Exemplo: Calculadora Simples

```javascript
// calculadora.js
const args = process.argv.slice(2);

const num1 = parseFloat(args[0]);
const operador = args[1];
const num2 = parseFloat(args[2]);

let resultado;

switch (operador) {
  case "+":
    resultado = num1 + num2;
    break;
  case "-":
    resultado = num1 - num2;
    break;
  case "*":
  case "x":
    resultado = num1 * num2;
    break;
  case "/":
    resultado = num1 / num2;
    break;
  default:
    console.log("Operador inválido!");
    process.exit(1);
}

console.log(`${num1} ${operador} ${num2} = ${resultado}`);
```

**Executar:**

```bash
node calculadora.js 10 + 5
# Saída: 10 + 5 = 15

node calculadora.js 20 * 3
# Saída: 20 * 3 = 60
```

### Exemplo: Criar Arquivo com Conteúdo

```javascript
// criar-arquivo.js
const fs = require("fs");
const args = process.argv.slice(2);

const nomeArquivo = args[0];
const conteudo = args.slice(1).join(" "); // Junta tudo após o nome

if (!nomeArquivo) {
  console.log("❌ Uso: node criar-arquivo.js <nome> <conteúdo>");
  process.exit(1);
}

fs.writeFileSync(nomeArquivo, conteudo);
console.log(`✅ Arquivo "${nomeArquivo}" criado!`);
```

**Executar:**

```bash
node criar-arquivo.js teste.txt Este é o conteúdo do arquivo
# Cria "teste.txt" com "Este é o conteúdo do arquivo"
```

### ⚠️ Limitações dos Argumentos Posicionais

```bash
# ❌ Confuso - qual é qual?
node script.js João 25 Brasil desenvolvedor

# ❌ Se errar a ordem, quebra tudo
node script.js 25 João desenvolvedor Brasil

# ❌ Difícil lembrar a ordem correta
```

**Solução:** Usar argumentos nomeados! 👇

---

## Argumentos Nomeados

### O que são?

Argumentos **nomeados** usam flags (`--nome`) para identificar cada valor. A **ordem não importa**!

### Sintaxe

```bash
node script.js --name valor1 --age valor2
```

### Exemplo Básico

```javascript
// script.js
const namedArguments = {};

process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    const argName = arg.slice(2); // Remove o "--"
    const argValue = array[index + 1]; // Pega o próximo valor
    namedArguments[argName] = argValue;
  }
});

console.log("Argumentos Informados:");
console.log(namedArguments);
```

**Executar:**

```bash
node script.js --name Isaac --job developer
```

**Saída:**

```javascript
Argumentos Informados:
{ name: 'Isaac', job: 'developer' }
```

### Como Funciona? (Passo a Passo)

```javascript
// Comando: node script.js --name Isaac --age 30

// Iteração 1:
// arg = '--name', index = 0
// arg.startsWith('--') = true ✅
// argName = 'name' (remove --)
// argValue = array[1] = 'Isaac'
// namedArguments['name'] = 'Isaac'

// Iteração 2:
// arg = 'Isaac', index = 1
// arg.startsWith('--') = false ❌
// Pula

// Iteração 3:
// arg = '--age', index = 2
// arg.startsWith('--') = true ✅
// argName = 'age'
// argValue = array[3] = '30'
// namedArguments['age'] = '30'

// Resultado:
// { name: 'Isaac', age: '30' }
```

### Exemplo: Saudação Personalizada

```javascript
// saudar.js
const args = {};

process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    const argName = arg.slice(2);
    const argValue = array[index + 1];
    args[argName] = argValue;
  }
});

const nome = args.name || args.nome || "Visitante";
const idade = args.age || args.idade || "desconhecida";
const cidade = args.city || args.cidade || "algum lugar";

console.log(`\n👋 Olá, ${nome}!`);
console.log(`📅 Idade: ${idade}`);
console.log(`📍 Cidade: ${cidade}\n`);
```

**Executar:**

```bash
# Ordem não importa!
node saudar.js --name João --age 25 --city "São Paulo"
node saudar.js --city "São Paulo" --name João --age 25
node saudar.js --age 25 --city "São Paulo" --name João

# Todos produzem o mesmo resultado:
# 👋 Olá, João!
# 📅 Idade: 25
# 📍 Cidade: São Paulo
```

### Exemplo: Flags Booleanas

```javascript
// config.js
const args = {};
const flags = [];

process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    const argName = arg.slice(2);
    const nextValue = array[index + 1];

    // Se o próximo é outra flag ou não existe, é boolean
    if (!nextValue || nextValue.startsWith("--")) {
      flags.push(argName);
    } else {
      args[argName] = nextValue;
    }
  }
});

console.log("Argumentos:", args);
console.log("Flags:", flags);
```

**Executar:**

```bash
node config.js --name João --verbose --debug --port 3000

# Argumentos: { name: 'João', port: '3000' }
# Flags: [ 'verbose', 'debug' ]
```

### Exemplo Avançado: Parser Completo

```javascript
// parser.js
function parseArguments() {
  const args = {};
  const flags = [];

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const nextArg = process.argv[i + 1];

      // Verifica se o próximo argumento é um valor ou outra flag
      if (nextArg && !nextArg.startsWith("--")) {
        args[key] = nextArg;
        i++; // Pula o próximo (já foi processado)
      } else {
        flags.push(key);
      }
    } else if (arg.startsWith("-")) {
      // Suporta flags curtas (-v, -d)
      const shortFlags = arg.slice(1).split("");
      flags.push(...shortFlags);
    }
  }

  return {args, flags};
}

const {args, flags} = parseArguments();

console.log("Argumentos:", args);
console.log("Flags:", flags);
```

**Executar:**

```bash
node parser.js --name João --port 3000 -vd --debug

# Argumentos: { name: 'João', port: '3000' }
# Flags: [ 'v', 'd', 'debug' ]
```

---

## Casos de Uso

### 1. Scripts de Build

```javascript
// build.js
const args = {};

process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const environment = args.env || "development";
const minify = args.minify === "true";

console.log(`🔨 Building for ${environment}...`);
console.log(`📦 Minify: ${minify ? "Yes" : "No"}`);

// Lógica de build aqui...
```

**Executar:**

```bash
node build.js --env production --minify true
```

### 2. Backup Automatizado

```javascript
// backup.js
const fs = require("fs");
const path = require("path");

const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const origem = args.source || "./dados";
const destino = args.dest || "./backup";
const timestamp = new Date().toISOString().replace(/:/g, "-");

console.log(`📦 Criando backup de ${origem}...`);

// Lógica de backup aqui...
const pastaBackup = path.join(destino, `backup-${timestamp}`);
fs.mkdirSync(pastaBackup, {recursive: true});

console.log(`✅ Backup criado em: ${pastaBackup}`);
```

**Executar:**

```bash
node backup.js --source ./documentos --dest ./backups
```

### 3. Gerador de Arquivos

```javascript
// gerar.js
const fs = require("fs");

const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const tipo = args.type || "component";
const nome = args.name;

if (!nome) {
  console.log(
    "❌ Uso: node gerar.js --name NomeDoComponente --type [component|service]"
  );
  process.exit(1);
}

let template = "";

if (tipo === "component") {
  template = `
export class ${nome} {
  constructor() {
    console.log('${nome} criado!');
  }
}
`;
} else if (tipo === "service") {
  template = `
export class ${nome}Service {
  async execute() {
    // Implementação aqui
  }
}
`;
}

const nomeArquivo = `${nome}.js`;
fs.writeFileSync(nomeArquivo, template.trim());

console.log(`✅ ${tipo} "${nome}" criado em ${nomeArquivo}`);
```

**Executar:**

```bash
node gerar.js --name User --type component
# Cria: User.js

node gerar.js --name Auth --type service
# Cria: Auth.js
```

### 4. Migração de Banco de Dados

```javascript
// migrate.js
const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const acao = args.action || "up";
const ambiente = args.env || "development";

console.log(`🗄️  Executando migração: ${acao}`);
console.log(`🌍 Ambiente: ${ambiente}`);

if (acao === "up") {
  console.log("⬆️  Aplicando migrações...");
  // Aplicar migrações
} else if (acao === "down") {
  console.log("⬇️  Revertendo migrações...");
  // Reverter migrações
} else if (acao === "reset") {
  console.log("🔄 Resetando banco de dados...");
  // Reset completo
}
```

**Executar:**

```bash
node migrate.js --action up --env production
node migrate.js --action down --env development
node migrate.js --action reset --env test
```

### 5. Deploy Automatizado

```javascript
// deploy.js
const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const servidor = args.server || "staging";
const branch = args.branch || "main";
const skipTests = args["skip-tests"] === "true";

console.log(`🚀 Deploy para ${servidor}`);
console.log(`🌿 Branch: ${branch}`);

if (!skipTests) {
  console.log("✅ Executando testes...");
  // Rodar testes
}

console.log("📦 Fazendo build...");
// Build

console.log("📤 Enviando para servidor...");
// Upload

console.log("✅ Deploy concluído!");
```

**Executar:**

```bash
node deploy.js --server production --branch main
node deploy.js --server staging --branch develop --skip-tests true
```

---

## Exemplos Práticos

### Exemplo 1: CLI de Tarefas

```javascript
// todo.js
const fs = require("fs");

const ARQUIVO = "tarefas.json";
const args = process.argv.slice(2);
const comando = args[0];

// Carregar tarefas
let tarefas = [];
if (fs.existsSync(ARQUIVO)) {
  tarefas = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));
}

// Salvar tarefas
function salvar() {
  fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
}

// Comandos
switch (comando) {
  case "add":
    const novaTarefa = args.slice(1).join(" ");
    tarefas.push({id: Date.now(), texto: novaTarefa, concluida: false});
    salvar();
    console.log(`✅ Tarefa adicionada: ${novaTarefa}`);
    break;

  case "list":
    console.log("\n📋 TAREFAS:");
    if (tarefas.length === 0) {
      console.log("Nenhuma tarefa.");
    } else {
      tarefas.forEach((t, i) => {
        const status = t.concluida ? "✅" : "⬜";
        console.log(`${i + 1}. ${status} ${t.texto}`);
      });
    }
    console.log();
    break;

  case "done":
    const indice = parseInt(args[1]) - 1;
    if (tarefas[indice]) {
      tarefas[indice].concluida = true;
      salvar();
      console.log(`✅ Tarefa concluída: ${tarefas[indice].texto}`);
    } else {
      console.log("❌ Tarefa não encontrada!");
    }
    break;

  case "remove":
    const idx = parseInt(args[1]) - 1;
    if (tarefas[idx]) {
      const removida = tarefas.splice(idx, 1);
      salvar();
      console.log(`❌ Tarefa removida: ${removida[0].texto}`);
    } else {
      console.log("❌ Tarefa não encontrada!");
    }
    break;

  case "clear":
    tarefas = [];
    salvar();
    console.log("🗑️  Todas as tarefas foram removidas.");
    break;

  default:
    console.log(`
📝 TODO - Gerenciador de Tarefas

Comandos:
  add <tarefa>    - Adicionar nova tarefa
  list            - Listar todas as tarefas
  done <número>   - Marcar tarefa como concluída
  remove <número> - Remover tarefa
  clear           - Limpar todas as tarefas

Exemplos:
  node todo.js add Estudar Node.js
  node todo.js list
  node todo.js done 1
  node todo.js remove 2
    `);
}
```

**Executar:**

```bash
node todo.js add Estudar Node.js
node todo.js add Fazer exercícios
node todo.js list
node todo.js done 1
node todo.js remove 2
```

### Exemplo 2: Conversor de Arquivos

```javascript
// converter.js
const fs = require("fs");

const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const entrada = args.input;
const saida = args.output;
const formato = args.format || "json";

if (!entrada || !saida) {
  console.log(`
📄 Conversor de Arquivos

Uso:
  node converter.js --input arquivo.txt --output resultado.json --format json

Formatos suportados: json, csv, txt
  `);
  process.exit(1);
}

// Ler arquivo de entrada
const conteudo = fs.readFileSync(entrada, "utf8");
const linhas = conteudo.split("\n").filter((l) => l.trim());

let resultado;

if (formato === "json") {
  resultado = JSON.stringify(linhas, null, 2);
} else if (formato === "csv") {
  resultado = linhas.map((l) => `"${l}"`).join(",\n");
} else if (formato === "txt") {
  resultado = linhas.join("\n");
}

fs.writeFileSync(saida, resultado);
console.log(`✅ Arquivo convertido: ${entrada} → ${saida} (${formato})`);
```

**Executar:**

```bash
node converter.js --input dados.txt --output resultado.json --format json
```

### Exemplo 3: Servidor Web Configurável

```javascript
// servidor.js
const http = require("http");

const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const porta = parseInt(args.port || args.p || "3000");
const host = args.host || args.h || "localhost";

const servidor = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  res.end(`
    <h1>🚀 Servidor Node.js</h1>
    <p>Rodando em: ${host}:${porta}</p>
    <p>URL solicitada: ${req.url}</p>
  `);
});

servidor.listen(porta, host, () => {
  console.log(`🚀 Servidor rodando em http://${host}:${porta}`);
  console.log("Pressione Ctrl+C para parar");
});
```

**Executar:**

```bash
node servidor.js --port 8080 --host 0.0.0.0
node servidor.js -p 3000 -h localhost
```

---

## Bibliotecas Populares

Para projetos mais complexos, considere usar bibliotecas especializadas:

### 1. Commander.js

```bash
npm install commander
```

```javascript
const {program} = require("commander");

program
  .option("-n, --name <nome>", "nome do usuário")
  .option("-a, --age <idade>", "idade do usuário")
  .parse();

const options = program.opts();
console.log(`Nome: ${options.name}, Idade: ${options.age}`);
```

### 2. Yargs

```bash
npm install yargs
```

```javascript
const yargs = require("yargs");

const argv = yargs
  .option("name", {
    alias: "n",
    description: "Nome do usuário",
    type: "string",
  })
  .option("age", {
    alias: "a",
    description: "Idade do usuário",
    type: "number",
  })
  .help()
  .alias("help", "h").argv;

console.log(`Nome: ${argv.name}, Idade: ${argv.age}`);
```

### 3. Minimist

```bash
npm install minimist
```

```javascript
const args = require("minimist")(process.argv.slice(2));

console.log(args);
// node script.js --name João --age 25
// { _: [], name: 'João', age: 25 }
```

---

## Boas Práticas

### 1. Sempre valide os argumentos

```javascript
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("❌ Nenhum argumento fornecido!");
  console.log("Uso: node script.js <valor1> <valor2>");
  process.exit(1);
}
```

### 2. Forneça mensagens de ajuda

```javascript
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
📖 Ajuda do Script

Uso:
  node script.js --name <nome> --age <idade>

Opções:
  --name, -n    Nome do usuário
  --age, -a     Idade do usuário
  --help, -h    Mostra esta ajuda
  `);
  process.exit(0);
}
```

### 3. Use valores padrão

```javascript
const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});

const porta = args.port || 3000; // ✅ Valor padrão
const host = args.host || "localhost";
```

### 4. Converta tipos apropriadamente

```javascript
const porta = parseInt(args.port) || 3000;
const debug = args.debug === "true";
const timeout = parseFloat(args.timeout) || 30.0;
```

### 5. Suporte múltiplos formatos

```javascript
// Suportar --port e -p
const porta = args.port || args.p || 3000;

// Suportar --verbose e -v
const verbose = args.verbose || args.v || false;
```

### 6. Documentação em código

```javascript
/**
 * Script de Deploy
 *
 * Uso:
 *   node deploy.js --env <ambiente> --branch <branch>
 *
 * Argumentos:
 *   --env      Ambiente (production, staging, development)
 *   --branch   Branch do git para deploy
 *   --force    Força o deploy sem confirmação
 *
 * Exemplos:
 *   node deploy.js --env production --branch main
 *   node deploy.js --env staging --branch develop --force
 */
```

### 7. Trate erros graciosamente

```javascript
try {
  // Lógica principal
  const resultado = processarArgumentos(args);
} catch (erro) {
  console.error("❌ Erro:", erro.message);
  console.log("Use --help para mais informações");
  process.exit(1);
}
```

---

## 📊 Comparação: Posicionais vs Nomeados

| Característica   | Posicionais     | Nomeados           |
| ---------------- | --------------- | ------------------ |
| Sintaxe          | `arg1 arg2`     | `--name value`     |
| Ordem importa?   | ✅ Sim          | ❌ Não             |
| Fácil de lembrar | ❌ Não          | ✅ Sim             |
| Código simples   | ✅ Sim          | ❌ Não             |
| Flexibilidade    | ❌ Baixa        | ✅ Alta            |
| Documentação     | Necessária      | Auto-explicativo   |
| Quando usar      | Scripts simples | CLIs profissionais |

---

## 🎯 Resumo

### Argumentos Posicionais

```javascript
// Simples, mas ordem importa
const args = process.argv.slice(2);
const valor1 = args[0];
const valor2 = args[1];
```

**Use quando:**

- Script muito simples
- Poucos argumentos (1-2)
- Ordem lógica óbvia

### Argumentos Nomeados

```javascript
// Mais complexo, mas muito flexível
const args = {};
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg.startsWith("--")) {
    args[arg.slice(2)] = array[index + 1];
  }
});
```

**Use quando:**

- Múltiplos argumentos
- CLI profissional
- Automatização
- Ordem não importa

---

## ✅ Checklist

- [ ] Validar argumentos obrigatórios
- [ ] Fornecer valores padrão
- [ ] Criar mensagem de ajuda (--help)
- [ ] Converter tipos (parseInt, parseFloat)
- [ ] Tratar erros graciosamente
- [ ] Documentar uso e exemplos
- [ ] Testar com diferentes combinações
- [ ] Considerar usar biblioteca (Commander, Yargs)

---

## 🎓 Conclusão

Argumentos de linha de comando transformam scripts simples em ferramentas poderosas e profissionais. Eles permitem:

✅ **Automatização** - Rodar sem interação manual  
✅ **Flexibilidade** - Mesmo código, diferentes comportamentos  
✅ **Integração** - Funciona com CI/CD, cron, scripts  
✅ **Profissionalismo** - Como npm, git, docker

**Regra de ouro:**

- Scripts simples → Argumentos posicionais
- CLIs profissionais → Argumentos nomeados ou bibliotecas

Domine os argumentos de linha de comando e seus scripts Node.js serão tão poderosos quanto as ferramentas que você usa todos os dias! 🚀
