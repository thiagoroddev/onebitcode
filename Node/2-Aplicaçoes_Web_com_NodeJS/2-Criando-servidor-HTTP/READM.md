# 🚀 Guia Completo para Iniciantes: Criando um Servidor HTTP com Node.js

## 📚 Índice

1. [O que é um Servidor HTTP?](#o-que-é-um-servidor-http)
2. [Pré-requisitos](#pré-requisitos)
3. [Conceitos Básicos](#conceitos-básicos)
4. [Seu Primeiro Servidor](#seu-primeiro-servidor)
5. [Entendendo o Código Passo a Passo](#entendendo-o-código-passo-a-passo)
6. [Roteamento Básico](#roteamento-básico)
7. [Trabalhando com Métodos HTTP](#trabalhando-com-métodos-http)
8. [Servindo Arquivos Estáticos](#servindo-arquivos-estáticos)
9. [Tratando Dados JSON](#tratando-dados-json)
10. [Boas Práticas](#boas-práticas)
11. [Próximos Passos](#próximos-passos)

---

## 🤔 O que é um Servidor HTTP?

Um **servidor HTTP** é um programa que:

- 📨 **Recebe requisições** de clientes (navegadores, apps, etc.)
- ⚙️ **Processa** essas requisições
- 📤 **Envia respostas** de volta aos clientes

### Analogia do Mundo Real

Imagine um restaurante:

```
Cliente (Navegador)  →  Garçom (Servidor HTTP)  →  Cozinha (Backend Logic)
      ↓                         ↓                           ↓
  Faz pedido            Recebe e processa              Prepara comida
      ↑                         ↑                           ↑
  Recebe comida          Entrega resposta            Envia prato pronto
```

---

## ✅ Pré-requisitos

### 1. Node.js Instalado

Verifique se está instalado:

```bash
node --version
# Deve mostrar algo como: v18.17.0
```

Se não tiver, baixe em: [nodejs.org](https://nodejs.org/)

### 2. Editor de Código

Recomendado: [VS Code](https://code.visualstudio.com/)

### 3. Terminal/Prompt de Comando

- Windows: CMD, PowerShell ou Git Bash
- Mac/Linux: Terminal

### 4. Conhecimentos Básicos

- ✅ JavaScript básico (variáveis, funções, objetos)
- ✅ Como usar o terminal
- ✅ Conceito básico de cliente-servidor

---

## 📖 Conceitos Básicos

### O que é HTTP?

**HTTP** = HyperText Transfer Protocol (Protocolo de Transferência de Hipertexto)

É a "linguagem" que navegadores e servidores usam para conversar.

### Requisição HTTP (Request)

```
┌─────────────────────────────────────────┐
│ REQUISIÇÃO DO CLIENTE                   │
├─────────────────────────────────────────┤
│ Método:    GET                          │
│ URL:       http://localhost:3000/users  │
│ Headers:   Content-Type: application/json│
│ Body:      (opcional)                   │
└─────────────────────────────────────────┘
```

### Resposta HTTP (Response)

```
┌─────────────────────────────────────────┐
│ RESPOSTA DO SERVIDOR                    │
├─────────────────────────────────────────┤
│ Status:    200 OK                       │
│ Headers:   Content-Type: application/json│
│ Body:      { "users": [...] }           │
└─────────────────────────────────────────┘
```

### Códigos de Status HTTP Principais

| Código | Significado           | Quando Usar                   |
| ------ | --------------------- | ----------------------------- |
| 200    | OK                    | Sucesso                       |
| 201    | Created               | Recurso criado com sucesso    |
| 400    | Bad Request           | Erro na requisição do cliente |
| 404    | Not Found             | Recurso não encontrado        |
| 500    | Internal Server Error | Erro no servidor              |

---

## 🎯 Seu Primeiro Servidor

### Passo 1: Criar a Estrutura do Projeto

```bash
# Crie uma pasta para o projeto
mkdir meu-primeiro-servidor
cd meu-primeiro-servidor

# Crie o arquivo principal
touch server.js

# Ou no Windows:
# type nul > server.js
```

### Passo 2: Código do Servidor Básico

Crie o arquivo `server.js` com o seguinte código:

```javascript
// Importa o módulo HTTP nativo do Node.js
const http = require("http");

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Cria o servidor
const server = http.createServer((req, res) => {
  // Define o cabeçalho da resposta
  res.writeHead(200, {"Content-Type": "text/plain"});

  // Envia a resposta
  res.end("Olá, Mundo! Meu primeiro servidor está funcionando!");
});

// Faz o servidor começar a "escutar" requisições
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
```

### Passo 3: Executar o Servidor

```bash
node server.js
```

Você verá:

```
🚀 Servidor rodando em http://localhost:3000
```

### Passo 4: Testar no Navegador

Abra seu navegador e acesse: `http://localhost:3000`

Você verá: **"Olá, Mundo! Meu primeiro servidor está funcionando!"**

### Passo 5: Parar o Servidor

No terminal, pressione: `Ctrl + C`

---

## 🔍 Entendendo o Código Passo a Passo

### 1. Importando o Módulo HTTP

```javascript
const http = require("http");
```

**O que faz?**

- `require('http')` importa o módulo HTTP do Node.js
- Este módulo vem **integrado** no Node.js (não precisa instalar)
- Permite criar servidores e fazer requisições HTTP

**Analogia:** É como pegar uma ferramenta da caixa de ferramentas do Node.js

---

### 2. Definindo a Porta

```javascript
const PORT = 3000;
```

**O que é uma porta?**

- É como um "canal" de comunicação no computador
- Portas comuns:
  - `80` → HTTP padrão
  - `443` → HTTPS padrão
  - `3000` → Desenvolvimento local (convenção)
  - `8080` → Alternativa comum

**Analogia:** Se seu computador é um prédio, a porta é o número do apartamento

---

### 3. Criando o Servidor

```javascript
const server = http.createServer((req, res) => {
  // ... código ...
});
```

**O que acontece aqui?**

- `http.createServer()` cria um servidor HTTP
- Recebe uma **função callback** que será executada **toda vez** que uma requisição chegar
- Esta função recebe dois parâmetros:
  - `req` (request) → dados da requisição
  - `res` (response) → objeto para enviar resposta

**Fluxo:**

```
Requisição chega → Callback é executado → Resposta é enviada
```

---

### 4. Escrevendo o Cabeçalho da Resposta

```javascript
res.writeHead(200, {"Content-Type": "text/plain"});
```

**Decodificando:**

- `res.writeHead()` → escreve o cabeçalho HTTP
- `200` → código de status (OK)
- `{ 'Content-Type': 'text/plain' }` → headers
  - Informa que a resposta é texto simples
  - Outras opções: `'text/html'`, `'application/json'`

---

### 5. Enviando a Resposta

```javascript
res.end("Olá, Mundo!");
```

**O que faz?**

- Envia o conteúdo da resposta
- **Finaliza** a conexão (obrigatório!)
- Sem `res.end()`, o navegador ficará carregando eternamente

---

### 6. Iniciando o Servidor

```javascript
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
```

**O que acontece?**

- `server.listen()` → inicia o servidor na porta especificada
- Segundo parâmetro → callback executado quando servidor estiver pronto
- A partir daqui, o servidor fica "ouvindo" requisições

**Analogia:** É como abrir as portas de uma loja e começar a atender clientes

---

## 🛤️ Roteamento Básico

Agora vamos criar diferentes "rotas" (URLs) que fazem coisas diferentes.

### Servidor com Múltiplas Rotas

```javascript
const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  // Obtém a URL da requisição
  const url = req.url;

  // Roteamento baseado na URL
  if (url === "/") {
    // Página inicial
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<h1>Página Inicial</h1><p>Bem-vindo ao meu servidor!</p>");
  } else if (url === "/sobre") {
    // Página sobre
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end(
      "<h1>Sobre</h1><p>Este é um servidor Node.js criado para aprendizado.</p>"
    );
  } else if (url === "/contato") {
    // Página contato
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<h1>Contato</h1><p>Email: contato@exemplo.com</p>");
  } else {
    // Página não encontrada (404)
    res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    res.end(
      "<h1>404 - Página Não Encontrada</h1><p>A página que você procura não existe.</p>"
    );
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📄 Rotas disponíveis:`);
  console.log(`   → http://localhost:${PORT}/`);
  console.log(`   → http://localhost:${PORT}/sobre`);
  console.log(`   → http://localhost:${PORT}/contato`);
});
```

### Testando as Rotas

Acesse no navegador:

- `http://localhost:3000/` → Página inicial
- `http://localhost:3000/sobre` → Página sobre
- `http://localhost:3000/contato` → Página contato
- `http://localhost:3000/qualquercoisa` → 404

---

## 🔧 Trabalhando com Métodos HTTP

Os principais métodos HTTP são:

| Método | Uso                        | Exemplo                           |
| ------ | -------------------------- | --------------------------------- |
| GET    | Buscar dados               | Listar usuários                   |
| POST   | Criar dados                | Criar novo usuário                |
| PUT    | Atualizar dados (completo) | Atualizar todos campos do usuário |
| PATCH  | Atualizar dados (parcial)  | Atualizar só o email              |
| DELETE | Deletar dados              | Deletar usuário                   |

### Servidor com Diferentes Métodos HTTP

```javascript
const http = require("http");
const PORT = 3000;

// Simulação de banco de dados (em memória)
let usuarios = [
  {id: 1, nome: "João", email: "joao@email.com"},
  {id: 2, nome: "Maria", email: "maria@email.com"},
];

const server = http.createServer((req, res) => {
  const {method, url} = req;

  // Configuração comum de headers
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // Rota: /usuarios
  if (url === "/usuarios") {
    if (method === "GET") {
      // Listar todos os usuários
      res.writeHead(200);
      res.end(
        JSON.stringify({
          sucesso: true,
          dados: usuarios,
        })
      );
    } else if (method === "POST") {
      // Criar novo usuário
      let body = "";

      // Recebe os dados enviados
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      // Quando terminar de receber
      req.on("end", () => {
        try {
          const novoUsuario = JSON.parse(body);
          novoUsuario.id = usuarios.length + 1;
          usuarios.push(novoUsuario);

          res.writeHead(201); // 201 = Created
          res.end(
            JSON.stringify({
              sucesso: true,
              mensagem: "Usuário criado com sucesso",
              dados: novoUsuario,
            })
          );
        } catch (error) {
          res.writeHead(400); // 400 = Bad Request
          res.end(
            JSON.stringify({
              sucesso: false,
              erro: "Dados inválidos",
            })
          );
        }
      });
    } else if (method === "DELETE") {
      // Deletar todos os usuários
      usuarios = [];
      res.writeHead(200);
      res.end(
        JSON.stringify({
          sucesso: true,
          mensagem: "Todos os usuários foram deletados",
        })
      );
    } else {
      // Método não permitido
      res.writeHead(405); // 405 = Method Not Allowed
      res.end(
        JSON.stringify({
          sucesso: false,
          erro: "Método não permitido",
        })
      );
    }
  } else {
    // Rota não encontrada
    res.writeHead(404);
    res.end(
      JSON.stringify({
        sucesso: false,
        erro: "Rota não encontrada",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`\n📋 Testando com curl ou Postman:`);
  console.log(`   GET    → http://localhost:${PORT}/usuarios`);
  console.log(`   POST   → http://localhost:${PORT}/usuarios`);
  console.log(`   DELETE → http://localhost:${PORT}/usuarios`);
});
```

### Testando com curl (Terminal)

```bash
# Listar usuários (GET)
curl http://localhost:3000/usuarios

# Criar usuário (POST)
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Pedro","email":"pedro@email.com"}'

# Deletar todos (DELETE)
curl -X DELETE http://localhost:3000/usuarios
```

### Testando com JavaScript (Navegador)

Abra o console do navegador (F12) e cole:

```javascript
// Listar usuários
fetch("http://localhost:3000/usuarios")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Criar novo usuário
fetch("http://localhost:3000/usuarios", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({nome: "Ana", email: "ana@email.com"}),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

## 📁 Servindo Arquivos Estáticos

Vamos criar um servidor que serve arquivos HTML, CSS e JavaScript.

### Estrutura de Pastas

```
meu-servidor/
├── server.js
└── public/
    ├── index.html
    ├── styles.css
    └── script.js
```

### Arquivo: `public/index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu Site com Node.js</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>🚀 Bem-vindo ao meu servidor Node.js!</h1>
      <p>Este site está sendo servido por um servidor HTTP criado do zero.</p>
      <button id="botao">Clique aqui!</button>
    </div>
    <script src="/script.js"></script>
  </body>
</html>
```

### Arquivo: `public/styles.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #764ba2;
}
```

### Arquivo: `public/script.js`

```javascript
document.getElementById("botao").addEventListener("click", () => {
  alert("Olá! Você clicou no botão do servidor Node.js! 🎉");
});
```

### Arquivo: `server.js` (Servidor de Arquivos Estáticos)

```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

// Mapeamento de extensões para Content-Type
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  // Se a URL for '/', serve index.html
  let filePath = req.url === "/" ? "/index.html" : req.url;

  // Caminho completo do arquivo
  filePath = path.join(__dirname, "public", filePath);

  // Extensão do arquivo
  const extname = path.extname(filePath);

  // Content-Type baseado na extensão
  const contentType = mimeTypes[extname] || "text/plain";

  // Lê o arquivo
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Arquivo não encontrado
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>404 - Arquivo não encontrado</h1>");
      } else {
        // Erro do servidor
        res.writeHead(500);
        res.end(`Erro do servidor: ${err.code}`);
      }
    } else {
      // Sucesso - envia o arquivo
      res.writeHead(200, {"Content-Type": contentType});
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Servindo arquivos da pasta 'public'`);
});
```

### Testando

1. Execute: `node server.js`
2. Abra: `http://localhost:3000`
3. Você verá uma página bonita com CSS e JavaScript funcionando!

---

## 📊 Tratando Dados JSON

Vamos criar uma API REST completa para gerenciar tarefas (To-Do List).

### Arquivo: `api-server.js`

```javascript
const http = require("http");
const PORT = 3000;

// Banco de dados em memória
let tarefas = [
  {id: 1, titulo: "Estudar Node.js", completa: false},
  {id: 2, titulo: "Criar servidor HTTP", completa: true},
];

// Função auxiliar para parsear o body da requisição
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const {method, url} = req;

  // Headers padrão
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS

  // ========== ROTAS ==========

  // GET /tarefas - Listar todas as tarefas
  if (url === "/tarefas" && method === "GET") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        sucesso: true,
        total: tarefas.length,
        dados: tarefas,
      })
    );
  }

  // GET /tarefas/:id - Buscar tarefa específica
  else if (url.match(/\/tarefas\/\d+/) && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const tarefa = tarefas.find((t) => t.id === id);

    if (tarefa) {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          sucesso: true,
          dados: tarefa,
        })
      );
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          sucesso: false,
          erro: "Tarefa não encontrada",
        })
      );
    }
  }

  // POST /tarefas - Criar nova tarefa
  else if (url === "/tarefas" && method === "POST") {
    try {
      const body = await parseBody(req);

      if (!body.titulo) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            sucesso: false,
            erro: "Título é obrigatório",
          })
        );
        return;
      }

      const novaTarefa = {
        id: tarefas.length > 0 ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1,
        titulo: body.titulo,
        completa: body.completa || false,
      };

      tarefas.push(novaTarefa);

      res.writeHead(201);
      res.end(
        JSON.stringify({
          sucesso: true,
          mensagem: "Tarefa criada com sucesso",
          dados: novaTarefa,
        })
      );
    } catch (error) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          sucesso: false,
          erro: "JSON inválido",
        })
      );
    }
  }

  // PUT /tarefas/:id - Atualizar tarefa
  else if (url.match(/\/tarefas\/\d+/) && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          sucesso: false,
          erro: "Tarefa não encontrada",
        })
      );
      return;
    }

    try {
      const body = await parseBody(req);
      tarefas[index] = {...tarefas[index], ...body, id};

      res.writeHead(200);
      res.end(
        JSON.stringify({
          sucesso: true,
          mensagem: "Tarefa atualizada",
          dados: tarefas[index],
        })
      );
    } catch (error) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          sucesso: false,
          erro: "JSON inválido",
        })
      );
    }
  }

  // DELETE /tarefas/:id - Deletar tarefa
  else if (url.match(/\/tarefas\/\d+/) && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          sucesso: false,
          erro: "Tarefa não encontrada",
        })
      );
      return;
    }

    const tarefaDeletada = tarefas.splice(index, 1)[0];

    res.writeHead(200);
    res.end(
      JSON.stringify({
        sucesso: true,
        mensagem: "Tarefa deletada",
        dados: tarefaDeletada,
      })
    );
  }

  // Rota não encontrada
  else {
    res.writeHead(404);
    res.end(
      JSON.stringify({
        sucesso: false,
        erro: "Rota não encontrada",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
  console.log(`\n📋 Rotas disponíveis:`);
  console.log(`   GET    /tarefas       → Listar todas`);
  console.log(`   GET    /tarefas/:id   → Buscar por ID`);
  console.log(`   POST   /tarefas       → Criar nova`);
  console.log(`   PUT    /tarefas/:id   → Atualizar`);
  console.log(`   DELETE /tarefas/:id   → Deletar`);
});
```

### Testando a API

```bash
# Listar tarefas
curl http://localhost:3000/tarefas

# Buscar tarefa específica
curl http://localhost:3000/tarefas/1

# Criar nova tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Aprender Express.js","completa":false}'

# Atualizar tarefa
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"completa":true}'

# Deletar tarefa
curl -X DELETE http://localhost:3000/tarefas/2
```

---

## ✨ Boas Práticas

### 1. **Sempre Trate Erros**

```javascript
// ❌ Ruim
fs.readFile("arquivo.txt", (err, data) => {
  res.end(data);
});

// ✅ Bom
fs.readFile("arquivo.txt", (err, data) => {
  if (err) {
    res.writeHead(500);
    res.end("Erro ao ler arquivo");
    return;
  }
  res.end(data);
});
```

### 2. **Use Variáveis de Ambiente**

```javascript
// ✅ Bom
const PORT = process.env.PORT || 3000;
```

Executar com porta customizada:

```bash
PORT=8080 node server.js
```

### 3. **Organize o Código em Funções**

```javascript
// ✅ Bom
function handleGetUsers(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(users));
}

function handleNotFound(req, res) {
  res.writeHead(404);
  res.end("Not Found");
}

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    handleGetUsers(req, res);
  } else {
    handleNotFound(req, res);
  }
});
```

### 4. **Use `async/await` para Código Assíncrono**

```javascript
// ✅ Bom
async function criarUsuario(req, res) {
  try {
    const body = await parseBody(req);
    // ... processar
    res.end(JSON.stringify({sucesso: true}));
  } catch (error) {
    res.writeHead(400);
    res.end(JSON.stringify({erro: error.message}));
  }
}
```

### 5. **Sempre Defina Content-Type**

```javascript
// ✅ Bom
res.writeHead(200, {
  "Content-Type": "application/json; charset=utf-8",
});
```

### 6. **Use Status Codes Corretos**

```javascript
// Sucesso
res.writeHead(200); // OK
res.writeHead(201); // Created
res.writeHead(204); // No Content

// Erro do Cliente
res.writeHead(400); // Bad Request
res.writeHead(401); // Unauthorized
res.writeHead(404); // Not Found

// Erro do Servidor
res.writeHead(500); // Internal Server Error
```

### 7. **Implemente CORS quando Necessário**

```javascript
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
```

---

## 🎓 Próximos Passos

Agora que você domina os conceitos básicos, aqui estão os próximos passos:

### 1. **Aprenda Express.js**

Express é um framework que simplifica muito a criação de servidores.

```javascript
// Com Express, isso:
const express = require("express");
const app = express();

app.get("/usuarios", (req, res) => {
  res.json({usuarios: []});
});

app.listen(3000);

// Substitui dezenas de linhas com http nativo!
```

### 2. **Conecte a um Banco de Dados**

- MongoDB (com Mongoose)
- PostgreSQL (com pg)
- MySQL (com mysql2)

### 3. **Implemente Autenticação**

- JWT (JSON Web Tokens)
- Sessions
- OAuth

### 4. **Deploy do Servidor**

- Heroku
- Vercel
- Railway
- AWS / Google Cloud

### 5. **Ferramentas de Desenvolvimento**

- **Nodemon**: Reinicia o servidor automaticamente
  ```bash
  npm install -g nodemon
  nodemon server.js
  ```
- **Postman**: Testar APIs
- **Thunder Client**: Extensão do VS Code para testar APIs

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [Node.js Docs](https://nodejs.org/docs/)
- [HTTP Module](https://nodejs.org/api/http.html)

### Tutoriais

- [Node.js Tutorial - W3Schools](https://www.w3schools.com/nodejs/)
- [Learn Node.js - freeCodeCamp](https://www.freecodecamp.org/news/tag/node/)

### Livros Recomendados

- "Node.js Design Patterns" - Mario Casciaro
- "Learning Node" - Shelley Powers

---

## 🎯 Desafios Práticos

### Desafio 1: Blog Simples

Crie um servidor que:

- Lista posts (GET /posts)
- Cria post (POST /posts)
- Busca post por ID (GET /posts/:id)
- Deleta post (DELETE /posts/:id)

### Desafio 2: Upload de Arquivos

Crie um servidor que aceita upload de imagens.

### Desafio 3: Chat em Tempo Real

Use WebSockets para criar um chat básico.

---

## ❓ FAQ - Perguntas Frequentes

### P: Por que usar Node.js para servidor?

**R:** Node.js é rápido, usa JavaScript (mesma linguagem do frontend), tem grande comunidade e excelente para aplicações em tempo real.

### P: Preciso usar Express?

**R:** Não é obrigatório, mas facilita muito. Para aprender, comece com HTTP nativo, depois migre para Express.

### P: Como debugar meu servidor?

**R:** Use `console.log()` ou o debugger do VS Code (F5).

### P: Meu servidor está lento, o que fazer?

**R:** Verifique loops infinitos, operações síncronas bloqueantes e use ferramentas como `clinic.js` para profiling.

### P: Como lidar com muitas requisições simultâneas?

**R:** Node.js já é não-bloqueante. Para escalar mais: use clustering, load balancers ou serverless.

---

## 🎉 Conclusão

Parabéns! 🎊 Você aprendeu:

✅ O que é um servidor HTTP  
✅ Como criar um servidor do zero  
✅ Roteamento básico  
✅ Métodos HTTP (GET, POST, PUT, DELETE)  
✅ Servir arquivos estáticos  
✅ Trabalhar com JSON  
✅ Boas práticas

**Continue praticando!** A melhor forma de aprender é criando projetos reais.

---

**Dica Final:** Não tenha medo de errar. Cada erro é uma oportunidade de aprendizado. Boa sorte na sua jornada com Node.js! 🚀

---

**Criado com ❤️ para iniciantes em Node.js**  
**Última atualização:** Janeiro 2026
