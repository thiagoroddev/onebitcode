# Express.js - Guia Completo para Iniciantes

## 📚 Índice

1. [O que é Express?](#o-que-é-express)
2. [Por que usar Express?](#por-que-usar-express)
3. [Instalação e Setup](#instalação-e-setup)
4. [Primeiro Servidor](#primeiro-servidor)
5. [Rotas (Routing)](#rotas-routing)
6. [Parâmetros de Rota](#parâmetros-de-rota)
7. [Query Parameters](#query-parameters)
8. [Request Body](#request-body)
9. [Middlewares](#middlewares)
10. [Servindo Arquivos Estáticos](#servindo-arquivos-estáticos)
11. [Template Engines](#template-engines)
12. [Tratamento de Erros](#tratamento-de-erros)
13. [Organização de Código](#organização-de-código)
14. [Exemplos Práticos](#exemplos-práticos)
15. [Boas Práticas](#boas-práticas)

---

## O que é Express?

### Definição

**Express** é um framework minimalista e flexível para Node.js que facilita a criação de aplicações web e APIs.

### 🎯 Analogia

Se Node.js puro é como construir uma casa do zero com tijolos e cimento, Express é como usar um kit de construção que já vem com paredes prontas, portas e janelas - você só monta!

```
Node.js puro:        Express:

🧱 Tijolos           🏠 Kit pronto
🔨 Ferramentas       🛠️ Ferramentas + estrutura
📝 Muito código      ✨ Código simplificado
⏱️ Mais tempo        ⚡ Mais rápido
```

### Comparação: HTTP vs Express

#### Com HTTP puro (Node.js):

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Home</h1>");
  } else if (req.method === "GET" && req.url === "/sobre") {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Sobre</h1>");
  } else if (req.method === "POST" && req.url === "/dados") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const dados = JSON.parse(body);
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(dados));
    });
  } else {
    res.writeHead(404);
    res.end("Não encontrado");
  }
});

server.listen(3000);
```

#### Com Express (muito mais simples!):

```javascript
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.get("/sobre", (req, res) => {
  res.send("<h1>Sobre</h1>");
});

app.post("/dados", (req, res) => {
  res.json(req.body);
});

app.listen(3000);
```

**Diferença:** Express reduz 25 linhas para 13 linhas e é muito mais legível!

---

## Por que usar Express?

### Vantagens

✅ **Simplicidade** - Menos código para fazer a mesma coisa  
✅ **Roteamento Fácil** - Sistema de rotas intuitivo  
✅ **Middlewares** - Processamento modular de requisições  
✅ **Comunidade Gigante** - Milhares de plugins disponíveis  
✅ **Documentação Excelente** - Fácil de aprender  
✅ **Performance** - Rápido e eficiente  
✅ **Flexível** - Não força uma estrutura específica

### Estatísticas

- 📦 **+30 milhões** de downloads por semana no npm
- ⭐ **+60 mil** estrelas no GitHub
- 🏢 Usado por **Netflix, Uber, PayPal, IBM**

---

## Instalação e Setup

### Passo 1: Criar Projeto

```bash
# Criar pasta do projeto
mkdir meu-app-express
cd meu-app-express

# Inicializar npm
npm init -y
```

### Passo 2: Instalar Express

```bash
npm install express
```

### Passo 3: Criar arquivo principal

```bash
# Criar arquivo
touch app.js

# Ou no Windows
type nul > app.js
```

### Estrutura Inicial

```
meu-app-express/
├── node_modules/
├── app.js
├── package.json
└── package-lock.json
```

---

## Primeiro Servidor

### Servidor Básico

```javascript
// app.js
const express = require("express");
const app = express();

// Definir porta
const PORT = 3000;

// Rota principal
app.get("/", (req, res) => {
  res.send("Olá, Express!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### Executar

```bash
node app.js
```

Abra o navegador em `http://localhost:3000` e veja "Olá, Express!"

### Anatomia do Código

```javascript
const express = require("express"); // 1. Importar Express
const app = express(); // 2. Criar aplicação

app.get("/", (req, res) => {
  // 3. Definir rota
  res.send("Olá!"); // 4. Enviar resposta
});

app.listen(3000); // 5. Iniciar servidor
```

### Métodos de Resposta

```javascript
// Enviar texto/HTML
res.send("<h1>Olá!</h1>");

// Enviar JSON
res.json({nome: "João", idade: 30});

// Enviar status code
res.status(404).send("Não encontrado");

// Enviar arquivo
res.sendFile("/caminho/arquivo.html");

// Redirecionar
res.redirect("/outra-rota");
```

---

## Rotas (Routing)

### O que são Rotas?

Rotas definem como a aplicação responde a diferentes URLs e métodos HTTP.

### Estrutura de uma Rota

```javascript
app.MÉTODO(CAMINHO, HANDLER);

// Onde:
// MÉTODO = get, post, put, delete, etc
// CAMINHO = URL (ex: '/', '/usuarios')
// HANDLER = função que processa a requisição
```

### Rotas Básicas

```javascript
const express = require("express");
const app = express();

// GET / (página inicial)
app.get("/", (req, res) => {
  res.send("Página Inicial");
});

// GET /sobre
app.get("/sobre", (req, res) => {
  res.send("Sobre Nós");
});

// GET /contato
app.get("/contato", (req, res) => {
  res.send("Entre em Contato");
});

// POST /mensagem
app.post("/mensagem", (req, res) => {
  res.send("Mensagem recebida!");
});

app.listen(3000);
```

### Todos os Métodos HTTP

```javascript
// GET - Buscar dados
app.get("/usuarios", (req, res) => {
  res.json([{nome: "João"}, {nome: "Maria"}]);
});

// POST - Criar dados
app.post("/usuarios", (req, res) => {
  res.status(201).json({mensagem: "Usuário criado!"});
});

// PUT - Atualizar (completo)
app.put("/usuarios/:id", (req, res) => {
  res.json({mensagem: "Usuário atualizado!"});
});

// PATCH - Atualizar (parcial)
app.patch("/usuarios/:id", (req, res) => {
  res.json({mensagem: "Usuário atualizado parcialmente!"});
});

// DELETE - Remover
app.delete("/usuarios/:id", (req, res) => {
  res.status(204).send();
});
```

### Rota Catch-All (404)

```javascript
// IMPORTANTE: Colocar no final de todas as rotas
app.use((req, res) => {
  res.status(404).send("404 - Página não encontrada");
});
```

---

## Parâmetros de Rota

### O que são Route Params?

Parâmetros dinâmicos na URL, marcados com `:` (dois pontos).

### Sintaxe

```javascript
app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Buscando usuário com ID: ${id}`);
});

// URL: /usuarios/123
// req.params.id = '123'
```

### Exemplos Práticos

```javascript
// Buscar usuário por ID
app.get("/usuarios/:id", (req, res) => {
  const {id} = req.params;
  res.json({id, nome: "João Silva"});
});

// Múltiplos parâmetros
app.get("/usuarios/:userId/posts/:postId", (req, res) => {
  const {userId, postId} = req.params;
  res.json({
    mensagem: `Post ${postId} do usuário ${userId}`,
  });
});

// Parâmetro opcional (com ?)
app.get("/produtos/:categoria/:subcategoria?", (req, res) => {
  const {categoria, subcategoria} = req.params;
  res.json({categoria, subcategoria: subcategoria || "todas"});
});
```

### Exemplo Completo: Blog

```javascript
const express = require("express");
const app = express();

// "Banco de dados" simulado
const posts = [
  {id: 1, titulo: "Primeiro Post", autor: "João"},
  {id: 2, titulo: "Segundo Post", autor: "Maria"},
  {id: 3, titulo: "Terceiro Post", autor: "Pedro"},
];

// Listar todos os posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Buscar post por ID
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({erro: "Post não encontrado"});
  }
});

// Buscar posts por autor
app.get("/autores/:autor/posts", (req, res) => {
  const {autor} = req.params;
  const postsFiltrados = posts.filter(
    (p) => p.autor.toLowerCase() === autor.toLowerCase()
  );
  res.json(postsFiltrados);
});

app.listen(3000, () => {
  console.log("Blog API rodando na porta 3000");
});
```

**Testar:**

```bash
# Listar todos
http://localhost:3000/posts

# Post específico
http://localhost:3000/posts/1

# Posts por autor
http://localhost:3000/autores/João/posts
```

---

## Query Parameters

### O que são Query Params?

Parâmetros enviados na URL após o `?` (interrogação).

### Sintaxe

```
URL: /produtos?categoria=eletronicos&preco_max=1000&ordenar=preco
                └──────────────────────────────────────────────┘
                              Query String
```

### Acessar no Express

```javascript
app.get("/produtos", (req, res) => {
  console.log(req.query);
  // { categoria: 'eletronicos', preco_max: '1000', ordenar: 'preco' }

  const {categoria, preco_max, ordenar} = req.query;
  res.json({categoria, preco_max, ordenar});
});
```

### Exemplos Práticos

```javascript
// Busca com filtros
app.get("/usuarios", (req, res) => {
  const {nome, idade_min, idade_max} = req.query;

  res.json({
    filtros: {
      nome: nome || "todos",
      idade_min: idade_min || 0,
      idade_max: idade_max || 100,
    },
  });
});

// Paginação
app.get("/produtos", (req, res) => {
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 10;

  res.json({
    pagina,
    limite,
    mensagem: `Mostrando ${limite} produtos da página ${pagina}`,
  });
});

// Ordenação
app.get("/posts", (req, res) => {
  const {ordenar, direcao} = req.query;

  // ordenar = 'data' | 'titulo' | 'autor'
  // direcao = 'asc' | 'desc'

  res.json({
    ordenar: ordenar || "data",
    direcao: direcao || "desc",
  });
});
```

### Exemplo Completo: API de Busca

```javascript
const express = require("express");
const app = express();

const produtos = [
  {id: 1, nome: "Notebook", categoria: "eletronicos", preco: 3000},
  {id: 2, nome: "Mouse", categoria: "eletronicos", preco: 50},
  {id: 3, nome: "Cadeira", categoria: "moveis", preco: 800},
  {id: 4, nome: "Mesa", categoria: "moveis", preco: 1200},
  {id: 5, nome: "Teclado", categoria: "eletronicos", preco: 150},
];

app.get("/produtos", (req, res) => {
  let resultado = [...produtos];

  // Filtrar por categoria
  if (req.query.categoria) {
    resultado = resultado.filter((p) => p.categoria === req.query.categoria);
  }

  // Filtrar por preço máximo
  if (req.query.preco_max) {
    const max = parseFloat(req.query.preco_max);
    resultado = resultado.filter((p) => p.preco <= max);
  }

  // Filtrar por preço mínimo
  if (req.query.preco_min) {
    const min = parseFloat(req.query.preco_min);
    resultado = resultado.filter((p) => p.preco >= min);
  }

  // Buscar por nome
  if (req.query.busca) {
    const busca = req.query.busca.toLowerCase();
    resultado = resultado.filter((p) => p.nome.toLowerCase().includes(busca));
  }

  // Ordenar
  if (req.query.ordenar === "preco") {
    resultado.sort((a, b) => a.preco - b.preco);
  } else if (req.query.ordenar === "nome") {
    resultado.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  // Paginação
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 10;
  const inicio = (pagina - 1) * limite;
  const fim = inicio + limite;

  const paginado = resultado.slice(inicio, fim);

  res.json({
    total: resultado.length,
    pagina,
    limite,
    produtos: paginado,
  });
});

app.listen(3000);
```

**Testar:**

```bash
# Todos os produtos
http://localhost:3000/produtos

# Eletrônicos
http://localhost:3000/produtos?categoria=eletronicos

# Preço até 500
http://localhost:3000/produtos?preco_max=500

# Buscar "note"
http://localhost:3000/produtos?busca=note

# Combinado
http://localhost:3000/produtos?categoria=eletronicos&preco_max=200&ordenar=preco
```

---

## Request Body

### O que é Request Body?

Dados enviados no corpo da requisição (geralmente em POST, PUT, PATCH).

### Configurar Express para Ler Body

```javascript
const express = require("express");
const app = express();

// ✅ IMPORTANTE: Habilitar parsers de body
app.use(express.json()); // Para JSON
app.use(express.urlencoded({extended: true})); // Para formulários
```

### Exemplo: Criar Usuário

```javascript
const express = require("express");
const app = express();

// Habilitar JSON
app.use(express.json());

let usuarios = [];
let proximoId = 1;

// POST - Criar usuário
app.post("/usuarios", (req, res) => {
  const novoUsuario = {
    id: proximoId++,
    nome: req.body.nome,
    email: req.body.email,
    idade: req.body.idade,
  };

  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

// GET - Listar usuários
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.listen(3000);
```

**Testar com curl:**

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@email.com","idade":30}'
```

### Validação de Body

```javascript
app.post("/usuarios", (req, res) => {
  const {nome, email, idade} = req.body;

  // Validações
  if (!nome || nome.trim().length === 0) {
    return res.status(400).json({erro: "Nome é obrigatório"});
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({erro: "Email inválido"});
  }

  if (!idade || idade < 0) {
    return res.status(400).json({erro: "Idade inválida"});
  }

  // Criar usuário
  const novoUsuario = {id: proximoId++, nome, email, idade};
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});
```

---

## Middlewares

### O que são Middlewares?

**Middlewares** são funções que têm acesso aos objetos `req`, `res` e `next`. Eles processam requisições antes de chegarem nas rotas finais.

### 🎯 Analogia

Pense em middlewares como **seguranças em uma festa**:

```
Entrada da Festa (Requisição)
    ↓
Segurança 1: Verifica convite (Autenticação)
    ↓
Segurança 2: Revista (Validação)
    ↓
Segurança 3: Registra entrada (Logging)
    ↓
Festa (Rota Final)
```

### Estrutura de um Middleware

```javascript
function meuMiddleware(req, res, next) {
  // Fazer algo com req ou res
  console.log("Middleware executado!");

  // Passar para o próximo middleware/rota
  next();
}

app.use(meuMiddleware);
```

### Middleware de Logging

```javascript
const express = require("express");
const app = express();

// Middleware que loga todas as requisições
app.use((req, res, next) => {
  const agora = new Date().toISOString();
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next(); // ✅ IMPORTANTE: chamar next()
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(3000);
```

**Output:**

```
[2026-01-12T14:30:00.000Z] GET /
[2026-01-12T14:30:05.000Z] GET /sobre
[2026-01-12T14:30:10.000Z] POST /usuarios
```

### Middleware de Autenticação

```javascript
// Middleware que verifica token
function verificarAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({erro: "Token não fornecido"});
  }

  if (token !== "Bearer token123") {
    return res.status(401).json({erro: "Token inválido"});
  }

  // Token válido, continuar
  next();
}

// Rota pública (sem middleware)
app.get("/publico", (req, res) => {
  res.json({mensagem: "Acesso público"});
});

// Rota protegida (com middleware)
app.get("/privado", verificarAuth, (req, res) => {
  res.json({mensagem: "Acesso autorizado!"});
});
```

### Múltiplos Middlewares

```javascript
function middleware1(req, res, next) {
  console.log("Middleware 1");
  next();
}

function middleware2(req, res, next) {
  console.log("Middleware 2");
  next();
}

function middleware3(req, res, next) {
  console.log("Middleware 3");
  next();
}

// Aplicar múltiplos middlewares
app.get("/teste", middleware1, middleware2, middleware3, (req, res) => {
  console.log("Rota final");
  res.send("Tudo executado!");
});

// Output:
// Middleware 1
// Middleware 2
// Middleware 3
// Rota final
```

### Middlewares Globais vs Específicos

```javascript
// GLOBAL - aplica a todas as rotas
app.use((req, res, next) => {
  console.log("Middleware global");
  next();
});

// ESPECÍFICO - aplica só a esta rota
app.get("/usuarios", autenticar, (req, res) => {
  res.json(usuarios);
});
```

### Middleware de Erro

```javascript
// Middleware de erro (4 parâmetros!)
app.use((err, req, res, next) => {
  console.error("Erro:", err.message);
  res.status(500).json({erro: "Erro interno do servidor"});
});
```

### Exemplo Completo com Middlewares

```javascript
const express = require("express");
const app = express();

app.use(express.json());

// Middleware 1: Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  req.timestamp = new Date();
  next();
});

// Middleware 2: Tempo de resposta
app.use((req, res, next) => {
  const inicio = Date.now();

  res.on("finish", () => {
    const duracao = Date.now() - inicio;
    console.log(`Tempo de resposta: ${duracao}ms`);
  });

  next();
});

// Middleware 3: Autenticação
function autenticar(req, res, next) {
  const token = req.headers.authorization;

  if (token === "Bearer 123") {
    req.usuario = {id: 1, nome: "João"};
    next();
  } else {
    res.status(401).json({erro: "Não autorizado"});
  }
}

// Rotas
app.get("/", (req, res) => {
  res.json({mensagem: "Rota pública"});
});

app.get("/perfil", autenticar, (req, res) => {
  res.json({usuario: req.usuario});
});

// Middleware de erro (sempre no final!)
app.use((err, req, res, next) => {
  res.status(500).json({erro: err.message});
});

app.listen(3000);
```

---

## Servindo Arquivos Estáticos

### O que são Arquivos Estáticos?

Arquivos que não mudam: HTML, CSS, JavaScript, imagens, etc.

### Configurar

```javascript
const express = require("express");
const app = express();

// Servir arquivos da pasta "public"
app.use(express.static("public"));

app.listen(3000);
```

### Estrutura de Pastas

```
projeto/
├── app.js
└── public/
    ├── index.html
    ├── style.css
    ├── script.js
    └── imagens/
        └── logo.png
```

### Exemplo Completo

**app.js:**

```javascript
const express = require("express");
const app = express();

// Servir arquivos estáticos
app.use(express.static("public"));

// Rota da API
app.get("/api/dados", (req, res) => {
  res.json({mensagem: "Dados da API"});
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
```

**public/index.html:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Site</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <h1>Bem-vindo!</h1>
    <img src="/imagens/logo.png" alt="Logo" />
    <script src="/script.js"></script>
  </body>
</html>
```

**public/style.css:**

```css
body {
  font-family: Arial, sans-serif;
  margin: 40px;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
}
```

**public/script.js:**

```javascript
console.log("JavaScript carregado!");

// Fazer requisição para a API
fetch("/api/dados")
  .then((res) => res.json())
  .then((dados) => console.log(dados));
```

**Acessar:**

- `http://localhost:3000` → index.html
- `http://localhost:3000/style.css` → style.css
- `http://localhost:3000/imagens/logo.png` → logo.png

### Múltiplas Pastas Estáticas

```javascript
app.use(express.static("public"));
app.use(express.static("arquivos"));
app.use("/static", express.static("assets"));
```

### Caminho Virtual

```javascript
// Acessar como /assets/arquivo.css
app.use("/assets", express.static("public"));
```

---

## Template Engines

### O que são Template Engines?

Permitem gerar HTML dinâmico no servidor com dados do backend.

### EJS (Embedded JavaScript)

```bash
npm install ejs
```

```javascript
const express = require("express");
const app = express();

// Configurar EJS
app.set("view engine", "ejs");

// Rota que renderiza template
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Minha Página",
    usuario: "João Silva",
  });
});

app.listen(3000);
```

**views/index.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= titulo %></title>
  </head>
  <body>
    <h1>Olá, <%= usuario %>!</h1>
    <p>Hora atual: <%= new Date().toLocaleTimeString() %></p>
  </body>
</html>
```

### Exemplo com Lista

```javascript
app.get("/produtos", (req, res) => {
  const produtos = [
    {nome: "Notebook", preco: 3000},
    {nome: "Mouse", preco: 50},
    {nome: "Teclado", preco: 150},
  ];

  res.render("produtos", {produtos});
});
```

**views/produtos.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Produtos</title>
  </head>
  <body>
    <h1>Lista de Produtos</h1>
    <ul>
      <% produtos.forEach(produto => { %>
      <li><%= produto.nome %> - R$ <%= produto.preco %></li>
      <% }); %>
    </ul>
  </body>
</html>
```

---

## Tratamento de Erros

### Middleware de Erro Padrão

```javascript
// SEMPRE no final de todas as rotas!
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    erro: "Algo deu errado!",
    mensagem: err.message,
  });
});
```

### Try-Catch em Rotas Assíncronas

```javascript
app.get("/dados", async (req, res, next) => {
  try {
    const dados = await buscarDadosDoBanco();
    res.json(dados);
  } catch (erro) {
    next(erro); // Passa para middleware de erro
  }
});
```

### Rota 404 (Not Found)

```javascript
// ANTES do middleware de erro, DEPOIS de todas as rotas
app.use((req, res) => {
  res.status(404).json({erro: "Rota não encontrada"});
});
```

### Exemplo Completo de Tratamento

```javascript
const express = require("express");
const app = express();

app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/erro", (req, res) => {
  throw new Error("Erro proposital!");
});

// 404 - Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    caminho: req.url,
  });
});

// Middleware de erro (sempre no final!)
app.use((err, req, res, next) => {
  console.error("ERRO:", err.message);

  res.status(err.status || 500).json({
    erro: "Erro no servidor",
    mensagem: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(3000);
```

---

## Organização de Código

### Estrutura Recomendada

```
projeto/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── usuariosController.js
│   ├── routes/
│   │   └── usuariosRoutes.js
│   ├── middlewares/
│   │   └── auth.js
│   └── app.js
├── public/
├── views/
├── package.json
└── server.js
```

### Separar Rotas em Arquivos

**routes/usuarios.js:**

```javascript
const express = require("express");
const router = express.Router();

let usuarios = [
  {id: 1, nome: "João"},
  {id: 2, nome: "Maria"},
];

// GET /usuarios
router.get("/", (req, res) => {
  res.json(usuarios);
});

// GET /usuarios/:id
router.get("/:id", (req, res) => {
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({erro: "Usuário não encontrado"});
  }
});

// POST /usuarios
router.post("/", (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

module.exports = router;
```

**app.js:**

```javascript
const express = require("express");
const app = express();

app.use(express.json());

// Importar e usar rotas
const usuariosRoutes = require("./routes/usuarios");
app.use("/usuarios", usuariosRoutes);

// Outras rotas
const produtosRoutes = require("./routes/produtos");
app.use("/produtos", produtosRoutes);

app.listen(3000);
```

### Separar Controllers

**controllers/usuariosController.js:**

```javascript
exports.listar = (req, res) => {
  // Lógica para listar usuários
  res.json(usuarios);
};

exports.buscarPorId = (req, res) => {
  // Lógica para buscar por ID
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  res.json(usuario);
};

exports.criar = (req, res) => {
  // Lógica para criar usuário
  const novoUsuario = {id: usuarios.length + 1, ...req.body};
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};
```

**routes/usuarios.js:**

```javascript
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuariosController");

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);

module.exports = router;
```

---

## Exemplos Práticos

### Exemplo 1: API de Tarefas (TODO)

```javascript
const express = require("express");
const app = express();

app.use(express.json());

let tarefas = [
  {id: 1, texto: "Estudar Express", concluida: false},
  {id: 2, texto: "Fazer exercícios", concluida: false},
];
let proximoId = 3;

// Listar tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Buscar tarefa
app.get("/tarefas/:id", (req, res) => {
  const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
  if (tarefa) {
    res.json(tarefa);
  } else {
    res.status(404).json({erro: "Tarefa não encontrada"});
  }
});

// Criar tarefa
app.post("/tarefas", (req, res) => {
  const novaTarefa = {
    id: proximoId++,
    texto: req.body.texto,
    concluida: false,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Atualizar tarefa
app.put("/tarefas/:id", (req, res) => {
  const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
  if (tarefa) {
    tarefa.texto = req.body.texto;
    tarefa.concluida = req.body.concluida;
    res.json(tarefa);
  } else {
    res.status(404).json({erro: "Tarefa não encontrada"});
  }
});

// Marcar como concluída
app.patch("/tarefas/:id/concluir", (req, res) => {
  const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
  if (tarefa) {
    tarefa.concluida = true;
    res.json(tarefa);
  } else {
    res.status(404).json({erro: "Tarefa não encontrada"});
  }
});

// Deletar tarefa
app.delete("/tarefas/:id", (req, res) => {
  const indice = tarefas.findIndex((t) => t.id === parseInt(req.params.id));
  if (indice !== -1) {
    tarefas.splice(indice, 1);
    res.status(204).send();
  } else {
    res.status(404).json({erro: "Tarefa não encontrada"});
  }
});

app.listen(3000, () => {
  console.log("API de Tarefas rodando na porta 3000");
});
```

### Exemplo 2: Blog Simples

```javascript
const express = require("express");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");

const posts = [
  {id: 1, titulo: "Primeiro Post", conteudo: "Olá, mundo!", autor: "João"},
  {id: 2, titulo: "Segundo Post", conteudo: "Express é legal!", autor: "Maria"},
];

// Página inicial (HTML)
app.get("/", (req, res) => {
  res.render("blog", {posts});
});

// API JSON
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({erro: "Post não encontrado"});
  }
});

app.post("/api/posts", (req, res) => {
  const novoPost = {
    id: posts.length + 1,
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    autor: req.body.autor,
  };
  posts.push(novoPost);
  res.status(201).json(novoPost);
});

app.listen(3000);
```

**views/blog.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Blog</title>
    <style>
      body {
        font-family: Arial;
        margin: 40px;
      }
      .post {
        border: 1px solid #ddd;
        padding: 20px;
        margin: 20px 0;
      }
      .post h2 {
        margin-top: 0;
      }
      .autor {
        color: #666;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <h1>📝 Meu Blog</h1>

    <% posts.forEach(post => { %>
    <div class="post">
      <h2><%= post.titulo %></h2>
      <p><%= post.conteudo %></p>
      <p class="autor">Por <%= post.autor %></p>
    </div>
    <% }); %>
  </body>
</html>
```

---

## Boas Práticas

### 1. Sempre use express.json()

```javascript
// ✅ Bom
app.use(express.json());

// ❌ Ruim - esqueceu de configurar
// Resultado: req.body será undefined
```

### 2. Valide entrada do usuário

```javascript
app.post("/usuarios", (req, res) => {
  // ✅ Validar antes de usar
  if (!req.body.nome || !req.body.email) {
    return res.status(400).json({erro: "Dados incompletos"});
  }

  // Processar...
});
```

### 3. Use status codes apropriados

```javascript
// 200 - OK
res.json(dados);

// 201 - Created
res.status(201).json(novoRecurso);

// 204 - No Content
res.status(204).send();

// 400 - Bad Request
res.status(400).json({erro: "Dados inválidos"});

// 404 - Not Found
res.status(404).json({erro: "Não encontrado"});

// 500 - Internal Server Error
res.status(500).json({erro: "Erro no servidor"});
```

### 4. Organize código em módulos

```javascript
// ✅ Bom - código organizado
routes/
  usuarios.js
  produtos.js
  auth.js

// ❌ Ruim - tudo em um arquivo
app.js (2000 linhas)
```

### 5. Use variáveis de ambiente

```bash
npm install dotenv
```

**.env:**

```
PORT=3000
DATABASE_URL=mongodb://localhost/meudb
SECRET_KEY=minhasenhasecreta
```

**app.js:**

```javascript
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.listen(PORT);
```

### 6. Implemente tratamento de erros

```javascript
// Sempre no final
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({erro: "Erro interno"});
});
```

### 7. Use nodemon no desenvolvimento

```bash
npm install --save-dev nodemon
```

**package.json:**

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

```bash
npm run dev
```

### 8. Documente sua API

```javascript
/**
 * GET /usuarios
 * Retorna lista de todos os usuários
 *
 * Response: 200 OK
 * [
 *   { "id": 1, "nome": "João" }
 * ]
 */
app.get("/usuarios", (req, res) => {
  // ...
});
```

---

## 📊 Resumo Express

### Conceitos Principais

| Conceito         | O que faz                            |
| ---------------- | ------------------------------------ |
| **Rotas**        | Define URLs e métodos HTTP           |
| **Middlewares**  | Processa requisições antes das rotas |
| **req.params**   | Parâmetros da URL (/usuarios/:id)    |
| **req.query**    | Query string (?nome=joao)            |
| **req.body**     | Dados enviados no body (POST/PUT)    |
| **res.send()**   | Envia resposta (texto/HTML)          |
| **res.json()**   | Envia resposta JSON                  |
| **res.status()** | Define status code                   |

### Fluxo de uma Requisição

```
Cliente faz requisição
    ↓
Middlewares globais (app.use)
    ↓
Middleware específico da rota
    ↓
Handler da rota
    ↓
Resposta enviada ao cliente
```

---

## ✅ Checklist

- [ ] Instalar Express (`npm install express`)
- [ ] Criar servidor básico
- [ ] Configurar `express.json()` para APIs
- [ ] Definir rotas (GET, POST, PUT, DELETE)
- [ ] Entender req.params vs req.query vs req.body
- [ ] Usar middlewares
- [ ] Servir arquivos estáticos
- [ ] Implementar tratamento de erros
- [ ] Organizar código em módulos
- [ ] Usar nodemon no desenvolvimento

---

## 🎓 Conclusão

Express.js simplifica drasticamente o desenvolvimento web com Node.js. Com ele você pode criar desde APIs REST até aplicações web completas com muito menos código e mais produtividade.

**Próximos passos:**

- 🗄️ Integrar banco de dados (MongoDB, PostgreSQL)
- 🔐 Implementar autenticação (JWT, Sessions)
- ✅ Validação de dados (Joi, express-validator)
- 📚 ORM/ODM (Sequelize, Mongoose)
- 🚀 Deploy (Heroku, Vercel, AWS)

Pratique criando suas próprias APIs e aplicações. Express é a base para frameworks maiores como NestJS e ferramentas como Socket.io! 🚀
