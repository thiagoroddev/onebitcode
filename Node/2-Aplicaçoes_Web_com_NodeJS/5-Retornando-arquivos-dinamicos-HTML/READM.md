# Renderizando HTML Dinâmico com Express.js

## 📚 Índice

1. [Introdução](#introdução)
2. [HTML Estático vs Dinâmico](#html-estático-vs-dinâmico)
3. [Template Engines](#template-engines)
4. [EJS (Embedded JavaScript)](#ejs-embedded-javascript)
5. [Pug (antigo Jade)](#pug-antigo-jade)
6. [Handlebars](#handlebars)
7. [Passando Dados para Views](#passando-dados-para-views)
8. [Estruturas de Controle](#estruturas-de-controle)
9. [Layouts e Partials](#layouts-e-partials)
10. [Exemplos Práticos](#exemplos-práticos)
11. [Boas Práticas](#boas-práticas)

---

## Introdução

### O que é HTML Dinâmico?

**HTML Dinâmico** é HTML gerado no servidor com dados que mudam. Em vez de ter páginas fixas, você cria templates que são "preenchidos" com dados.

### 🎯 Analogia

Pense em um **formulário em branco** vs **formulário preenchido**:

```
Template (Formulário em branco):
┌─────────────────────────┐
│ Nome: _______________   │
│ Email: ______________   │
│ Idade: ______________   │
└─────────────────────────┘

HTML Renderizado (Formulário preenchido):
┌─────────────────────────┐
│ Nome: João Silva        │
│ Email: joao@email.com   │
│ Idade: 30               │
└─────────────────────────┘
```

### Por que usar HTML Dinâmico?

✅ **SEO Melhor** - Motores de busca veem conteúdo completo  
✅ **Performance** - Servidor prepara tudo, browser só exibe  
✅ **Dados Atualizados** - Sempre mostra informação mais recente  
✅ **Menos JavaScript** - Frontend mais simples  
✅ **Reutilização** - Um template serve muitas páginas

---

## HTML Estático vs Dinâmico

### HTML Estático (Sempre igual)

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <h1>Olá, Visitante!</h1>
    <p>Bem-vindo ao meu site.</p>
  </body>
</html>
```

**Problema:** Sempre mostra "Visitante" - não personaliza!

### HTML Dinâmico (Muda conforme dados)

```javascript
// Express
app.get("/", (req, res) => {
  const usuario = "João Silva";
  res.render("index", {usuario});
});
```

```html
<!-- Template -->
<!DOCTYPE html>
<html>
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <h1>Olá, <%= usuario %>!</h1>
    <p>Bem-vindo ao meu site.</p>
  </body>
</html>
```

**Resultado:** Mostra "Olá, João Silva!" - personalizado!

### Comparação Visual

```
┌─────────────────────────────────────────────────┐
│              HTML ESTÁTICO                      │
├─────────────────────────────────────────────────┤
│  Navegador → Servidor → arquivo.html → Browser │
│              (sempre igual)                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              HTML DINÂMICO                      │
├─────────────────────────────────────────────────┤
│  Browser → Servidor → Busca Dados → Template   │
│                     → HTML Gerado → Browser     │
│              (diferente cada vez)               │
└─────────────────────────────────────────────────┘
```

---

## Template Engines

### O que são Template Engines?

**Template Engines** são ferramentas que combinam templates HTML com dados JavaScript para gerar HTML final.

### Principais Template Engines

| Engine         | Sintaxe        | Popularidade | Curva de Aprendizado |
| -------------- | -------------- | ------------ | -------------------- |
| **EJS**        | HTML + `<% %>` | ⭐⭐⭐⭐⭐   | Fácil                |
| **Pug**        | Indentação     | ⭐⭐⭐⭐     | Média                |
| **Handlebars** | HTML + `{{ }}` | ⭐⭐⭐⭐     | Fácil                |
| **Nunjucks**   | HTML + `{{ }}` | ⭐⭐⭐       | Fácil                |

### Fluxo de Renderização

```
1. Express recebe requisição
        ↓
2. Busca dados (banco, API, etc)
        ↓
3. Passa dados para template engine
        ↓
4. Template engine gera HTML
        ↓
5. Express envia HTML para browser
```

---

## EJS (Embedded JavaScript)

### O que é EJS?

**EJS** (Embedded JavaScript) permite escrever código JavaScript dentro do HTML usando tags especiais.

### Instalação

```bash
npm install ejs
```

### Configuração no Express

```javascript
const express = require("express");
const app = express();

// Definir EJS como template engine
app.set("view engine", "ejs");

// Definir pasta de views (padrão: ./views)
app.set("views", "./views");

app.listen(3000);
```

### Estrutura de Pastas

```
projeto/
├── app.js
├── views/
│   ├── index.ejs
│   ├── sobre.ejs
│   └── usuarios.ejs
├── public/
└── package.json
```

### Tags do EJS

```ejs
<% %>    → Código JavaScript (não exibe)
<%= %>   → Exibe valor escapado (seguro contra XSS)
<%- %>   → Exibe valor não escapado (HTML cru)
<%# %>   → Comentário (não aparece no HTML final)
```

### Exemplo Básico

**app.js:**

```javascript
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const dados = {
    titulo: "Minha Página",
    usuario: "João Silva",
    idade: 30,
  };

  res.render("index", dados);
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
    <p>Você tem <%= idade %> anos.</p>

    <%# Este é um comentário - não aparece no HTML %> <% if (idade >= 18) { %>
    <p>Você é maior de idade.</p>
    <% } else { %>
    <p>Você é menor de idade.</p>
    <% } %>
  </body>
</html>
```

### Exibindo Listas

**app.js:**

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
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #4caf50;
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>Lista de Produtos</h1>

    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        <% produtos.forEach(produto => { %>
        <tr>
          <td><%= produto.nome %></td>
          <td>R$ <%= produto.preco.toFixed(2) %></td>
        </tr>
        <% }); %>
      </tbody>
    </table>

    <p>Total de produtos: <%= produtos.length %></p>
  </body>
</html>
```

### Escapando HTML

```javascript
app.get("/teste", (req, res) => {
  const dados = {
    textoSeguro: '<script>alert("XSS")</script>',
    htmlPermitido: "<strong>Texto em negrito</strong>",
  };
  res.render("teste", dados);
});
```

```html
<!-- Escapado (seguro) - mostra o código -->
<%= textoSeguro %>
<!-- Resultado: &lt;script&gt;alert("XSS")&lt;/script&gt; -->

<!-- Não escapado (cuidado!) - executa o HTML -->
<%- htmlPermitido %>
<!-- Resultado: <strong>Texto em negrito</strong> -->
```

### Operações JavaScript

```html
<!-- Concatenar strings -->
<h1>Olá, <%= primeiroNome + ' ' + sobrenome %>!</h1>

<!-- Operações matemáticas -->
<p>Total: R$ <%= preco * quantidade %></p>

<!-- Métodos de string -->
<p><%= nome.toUpperCase() %></p>
<p><%= email.toLowerCase() %></p>

<!-- Ternário -->
<p>Status: <%= ativo ? 'Ativo' : 'Inativo' %></p>

<!-- Formatar data -->
<p>Data: <%= new Date().toLocaleDateString('pt-BR') %></p>
```

---

## Pug (antigo Jade)

### O que é Pug?

**Pug** é uma template engine que usa indentação em vez de tags HTML.

### Instalação

```bash
npm install pug
```

### Configuração

```javascript
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.listen(3000);
```

### Sintaxe Básica

**HTML Tradicional:**

```html
<div class="container">
  <h1>Título</h1>
  <p>Parágrafo</p>
</div>
```

**Pug:**

```pug
.container
  h1 Título
  p Parágrafo
```

### Exemplo com Dados

**app.js:**

```javascript
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Minha Página",
    usuario: "João",
  });
});
```

**views/index.pug:**

```pug
doctype html
html
  head
    title= titulo
  body
    h1 Olá, #{usuario}!
    p Bem-vindo ao site

    - const idade = 30
    if idade >= 18
      p Você é maior de idade
    else
      p Você é menor de idade
```

### Listas em Pug

```pug
doctype html
html
  head
    title Produtos
  body
    h1 Lista de Produtos

    ul
      each produto in produtos
        li= produto.nome + ' - R$ ' + produto.preco
```

---

## Handlebars

### O que é Handlebars?

**Handlebars** é uma template engine que usa `{{ }}` para inserir dados.

### Instalação

```bash
npm install express-handlebars
```

### Configuração

```javascript
const express = require("express");
const {engine} = require("express-handlebars");
const app = express();

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.listen(3000);
```

### Sintaxe Básica

**views/index.handlebars:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{titulo}}</title>
  </head>
  <body>
    <h1>Olá, {{usuario}}!</h1>
    <p>Email: {{email}}</p>

    {{#if ativo}}
    <p>Conta ativa</p>
    {{else}}
    <p>Conta inativa</p>
    {{/if}}
  </body>
</html>
```

### Listas em Handlebars

```html
<ul>
  {{#each produtos}}
  <li>{{this.nome}} - R$ {{this.preco}}</li>
  {{/each}}
</ul>
```

---

## Passando Dados para Views

### Formas de Passar Dados

#### 1. Objeto Direto

```javascript
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Home",
    usuario: "João",
    idade: 30,
  });
});
```

#### 2. Variável com Dados

```javascript
app.get("/perfil", (req, res) => {
  const usuario = {
    nome: "João Silva",
    email: "joao@email.com",
    idade: 30,
    cidade: "São Paulo",
  };

  res.render("perfil", {usuario});
});
```

**views/perfil.ejs:**

```html
<h1>Perfil de <%= usuario.nome %></h1>
<p>Email: <%= usuario.email %></p>
<p>Idade: <%= usuario.idade %></p>
<p>Cidade: <%= usuario.cidade %></p>
```

#### 3. Múltiplos Dados

```javascript
app.get("/dashboard", (req, res) => {
  const dados = {
    usuario: {nome: "João", tipo: "admin"},
    estatisticas: {vendas: 150, clientes: 50},
    produtos: [
      {nome: "Produto 1", estoque: 10},
      {nome: "Produto 2", estoque: 5},
    ],
  };

  res.render("dashboard", dados);
});
```

#### 4. Dados de Banco de Dados (Simulado)

```javascript
app.get("/usuarios/:id", async (req, res) => {
  // Simular busca no banco
  const usuario = await buscarUsuario(req.params.id);
  const posts = await buscarPosts(req.params.id);

  res.render("usuario", {
    usuario,
    posts,
    total: posts.length,
  });
});
```

---

## Estruturas de Controle

### Condicionais (if/else)

```html
<!-- EJS -->
<% if (usuario.logado) { %>
<p>Bem-vindo, <%= usuario.nome %>!</p>
<a href="/logout">Sair</a>
<% } else { %>
<p>Visitante</p>
<a href="/login">Entrar</a>
<% } %>

<!-- if/else if/else -->
<% if (nota >= 7) { %>
<p>Aprovado!</p>
<% } else if (nota >= 5) { %>
<p>Recuperação</p>
<% } else { %>
<p>Reprovado</p>
<% } %>
```

### Loops (forEach, for, while)

```html
<!-- forEach -->
<ul>
  <% produtos.forEach(produto => { %>
  <li><%= produto.nome %></li>
  <% }); %>
</ul>

<!-- for tradicional -->
<ol>
  <% for (let i = 0; i < itens.length; i++) { %>
  <li>Item <%= i + 1 %>: <%= itens[i] %></li>
  <% } %>
</ol>

<!-- for...of -->
<div>
  <% for (const produto of produtos) { %>
  <div class="card">
    <h3><%= produto.nome %></h3>
    <p>R$ <%= produto.preco %></p>
  </div>
  <% } %>
</div>
```

### Lista Vazia

```html
<% if (produtos.length > 0) { %>
<ul>
  <% produtos.forEach(p => { %>
  <li><%= p.nome %></li>
  <% }); %>
</ul>
<% } else { %>
<p>Nenhum produto encontrado.</p>
<% } %>
```

### Switch/Case

```html
<% switch(status) { case 'pendente': %>
<span class="badge amarelo">Pendente</span>
<% break; case 'aprovado': %>
<span class="badge verde">Aprovado</span>
<% break; case 'rejeitado': %>
<span class="badge vermelho">Rejeitado</span>
<% break; default: %>
<span class="badge cinza">Desconhecido</span>
<% } %>
```

---

## Layouts e Partials

### O que são Layouts?

**Layouts** são templates "mãe" que definem a estrutura geral da página (header, footer, etc).

### O que são Partials?

**Partials** são pedaços de HTML reutilizáveis (componentes).

### Estrutura com Layouts

```
views/
├── layouts/
│   └── main.ejs
├── partials/
│   ├── header.ejs
│   ├── footer.ejs
│   └── nav.ejs
├── index.ejs
├── sobre.ejs
└── contato.ejs
```

### Layout Principal (EJS)

**views/layouts/main.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title><%= titulo || 'Meu Site' %></title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <%- include('../partials/header') %> <%- include('../partials/nav') %>

    <main><%- body %></main>

    <%- include('../partials/footer') %>

    <script src="/js/script.js"></script>
  </body>
</html>
```

### Partials (Componentes)

**views/partials/header.ejs:**

```html
<header>
  <div class="container">
    <h1><%= siteName || 'Meu Site' %></h1>
    <p><%= tagline || 'Bem-vindo!' %></p>
  </div>
</header>
```

**views/partials/nav.ejs:**

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/sobre">Sobre</a></li>
    <li><a href="/contato">Contato</a></li>
  </ul>
</nav>
```

**views/partials/footer.ejs:**

```html
<footer>
  <p>
    &copy; <%= new Date().getFullYear() %> Meu Site. Todos os direitos
    reservados.
  </p>
</footer>
```

### Usando Includes

**views/index.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Home</title>
  </head>
  <body>
    <%- include('partials/header') %> <%- include('partials/nav') %>

    <main>
      <h2>Página Inicial</h2>
      <p>Conteúdo da página inicial...</p>
    </main>

    <%- include('partials/footer') %>
  </body>
</html>
```

### Includes com Dados

```html
<!-- Passar dados para o partial -->
<%- include('partials/card', { titulo: 'Meu Card', descricao: 'Descrição do
card', link: '/saiba-mais' }) %>
```

**views/partials/card.ejs:**

```html
<div class="card">
  <h3><%= titulo %></h3>
  <p><%= descricao %></p>
  <a href="<%= link %>">Saiba mais</a>
</div>
```

### Express EJS Layouts (Biblioteca)

```bash
npm install express-ejs-layouts
```

```javascript
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);

// Definir layout padrão
app.set("layout", "layouts/main");

app.get("/", (req, res) => {
  res.render("index", {titulo: "Home"});
});

app.listen(3000);
```

**views/layouts/main.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= titulo %></title>
  </head>
  <body>
    <%- include('../partials/header') %> <%- body %> <%-
    include('../partials/footer') %>
  </body>
</html>
```

**views/index.ejs:**

```html
<h1>Página Inicial</h1>
<p>Conteúdo específico desta página.</p>
```

---

## Exemplos Práticos

### Exemplo 1: Blog Completo

**app.js:**

```javascript
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// Banco de dados simulado
const posts = [
  {
    id: 1,
    titulo: "Primeiro Post",
    resumo: "Este é o primeiro post do blog",
    conteudo: "Lorem ipsum dolor sit amet...",
    autor: "João Silva",
    data: new Date("2026-01-01"),
    categoria: "Tecnologia",
    comentarios: 5,
  },
  {
    id: 2,
    titulo: "Segundo Post",
    resumo: "Aprendendo Express.js",
    conteudo: "Express é um framework...",
    autor: "Maria Santos",
    data: new Date("2026-01-05"),
    categoria: "Programação",
    comentarios: 3,
  },
  {
    id: 3,
    titulo: "Terceiro Post",
    resumo: "Template engines são úteis",
    conteudo: "EJS permite criar...",
    autor: "Pedro Costa",
    data: new Date("2026-01-10"),
    categoria: "Web",
    comentarios: 8,
  },
];

// Página inicial - lista de posts
app.get("/", (req, res) => {
  res.render("blog/index", {
    titulo: "Blog - Home",
    posts,
    siteName: "Meu Blog",
  });
});

// Post individual
app.get("/post/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).render("404", {
      titulo: "Post não encontrado",
    });
  }

  res.render("blog/post", {
    titulo: post.titulo,
    post,
    siteName: "Meu Blog",
  });
});

// Posts por categoria
app.get("/categoria/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const postsFiltrados = posts.filter(
    (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
  );

  res.render("blog/categoria", {
    titulo: `Categoria: ${categoria}`,
    categoria,
    posts: postsFiltrados,
    siteName: "Meu Blog",
  });
});

// Busca
app.get("/busca", (req, res) => {
  const termo = req.query.q || "";
  const resultados = posts.filter(
    (p) =>
      p.titulo.toLowerCase().includes(termo.toLowerCase()) ||
      p.conteudo.toLowerCase().includes(termo.toLowerCase())
  );

  res.render("blog/busca", {
    titulo: `Busca: ${termo}`,
    termo,
    resultados,
    siteName: "Meu Blog",
  });
});

app.listen(3000, () => {
  console.log("Blog rodando em http://localhost:3000");
});
```

**views/partials/header.ejs:**

```html
<header class="header">
  <div class="container">
    <h1><a href="/"><%= siteName %></a></h1>
    <form action="/busca" method="GET" class="busca">
      <input type="text" name="q" placeholder="Buscar..." />
      <button type="submit">🔍</button>
    </form>
  </div>
</header>
```

**views/partials/post-card.ejs:**

```html
<article class="post-card">
  <div class="post-meta">
    <span class="categoria"><%= post.categoria %></span>
    <span class="data"><%= post.data.toLocaleDateString('pt-BR') %></span>
  </div>

  <h2><a href="/post/<%= post.id %>"><%= post.titulo %></a></h2>

  <p class="resumo"><%= post.resumo %></p>

  <div class="post-footer">
    <span class="autor">Por <%= post.autor %></span>
    <span class="comentarios">💬 <%= post.comentarios %></span>
  </div>

  <a href="/post/<%= post.id %>" class="btn">Ler mais →</a>
</article>
```

**views/blog/index.ejs:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= titulo %></title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <%- include('../partials/header') %>

    <main class="container">
      <section class="posts-grid">
        <h2>Últimos Posts</h2>

        <% if (posts.length > 0) { %>
        <div class="grid">
          <% posts.forEach(post => { %> <%- include('../partials/post-card', {
          post }) %> <% }); %>
        </div>
        <% } else { %>
        <p>Nenhum post encontrado.</p>
        <% } %>
      </section>

      <aside class="sidebar">
        <h3>Categorias</h3>
        <ul>
          <li><a href="/categoria/tecnologia">Tecnologia</a></li>
          <li><a href="/categoria/programacao">Programação</a></li>
          <li><a href="/categoria/web">Web</a></li>
        </ul>

        <h3>Posts Populares</h3>
        <ul>
          <% posts.sort((a, b) => b.comentarios - a.comentarios).slice(0,
          3).forEach(p => { %>
          <li>
            <a href="/post/<%= p.id %>"><%= p.titulo %></a>
            <small>(<%= p.comentarios %> comentários)</small>
          </li>
          <% }); %>
        </ul>
      </aside>
    </main>

    <%- include('../partials/footer') %>
  </body>
</html>
```

**views/blog/post.ejs:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title><%= titulo %></title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <%- include('../partials/header') %>

    <main class="container">
      <article class="post-completo">
        <header class="post-header">
          <span class="categoria"><%= post.categoria %></span>
          <h1><%= post.titulo %></h1>
          <div class="post-meta">
            <span>Por <%= post.autor %></span>
            <span>em <%= post.data.toLocaleDateString('pt-BR') %></span>
            <span>💬 <%= post.comentarios %> comentários</span>
          </div>
        </header>

        <div class="post-conteudo">
          <p><%= post.conteudo %></p>
        </div>

        <footer class="post-footer">
          <a href="/" class="btn">← Voltar para o blog</a>
        </footer>
      </article>
    </main>

    <%- include('../partials/footer') %>
  </body>
</html>
```

**public/css/style.css:**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header h1 a {
  color: white;
  text-decoration: none;
}

.busca {
  margin-top: 10px;
}

.busca input {
  padding: 8px;
  border: none;
  border-radius: 4px 0 0 4px;
  width: 250px;
}

.busca button {
  padding: 8px 15px;
  border: none;
  background: #fff;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-top: 30px;
}

.posts-grid {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

.post-card {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.post-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.categoria {
  background: #667eea;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85em;
}

.data {
  color: #666;
  font-size: 0.9em;
}

.post-card h2 {
  margin: 10px 0;
}

.post-card h2 a {
  color: #333;
  text-decoration: none;
}

.post-card h2 a:hover {
  color: #667eea;
}

.resumo {
  color: #666;
  margin: 10px 0;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.btn {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s;
}

.btn:hover {
  background: #764ba2;
}

.sidebar {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.sidebar h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #667eea;
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.sidebar a {
  color: #333;
  text-decoration: none;
}

.sidebar a:hover {
  color: #667eea;
}

footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
}

.post-completo {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  grid-column: 1 / -1;
}

.post-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.post-completo h1 {
  font-size: 2.5em;
  margin: 15px 0;
  color: #333;
}

.post-conteudo {
  font-size: 1.1em;
  line-height: 1.8;
  color: #444;
}

@media (max-width: 768px) {
  main {
    grid-template-columns: 1fr;
  }
}
```

### Exemplo 2: Dashboard Administrativo

**app.js:**

```javascript
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/admin", (req, res) => {
  const estatisticas = {
    vendas: {
      hoje: 1250,
      semana: 8500,
      mes: 45000,
    },
    usuarios: {
      total: 523,
      ativos: 412,
      novos: 38,
    },
    produtos: {
      total: 156,
      estoque_baixo: 12,
    },
    pedidos: {
      pendentes: 23,
      processando: 15,
      concluidos: 342,
    },
  };

  const vendasRecentes = [
    {id: 1001, cliente: "João Silva", valor: 250, status: "Pago"},
    {id: 1002, cliente: "Maria Santos", valor: 180, status: "Pendente"},
    {id: 1003, cliente: "Pedro Costa", valor: 420, status: "Pago"},
    {id: 1004, cliente: "Ana Lima", valor: 95, status: "Cancelado"},
  ];

  res.render("admin/dashboard", {
    titulo: "Dashboard Administrativo",
    estatisticas,
    vendasRecentes,
    usuario: {nome: "Admin", tipo: "Administrador"},
  });
});

app.listen(3000);
```

**views/admin/dashboard.ejs:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title><%= titulo %></title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        background: #f5f5f5;
      }

      .dashboard {
        display: grid;
        grid-template-columns: 250px 1fr;
        min-height: 100vh;
      }

      .sidebar {
        background: #2c3e50;
        color: white;
        padding: 20px;
      }

      .sidebar h2 {
        margin-bottom: 30px;
        padding-bottom: 10px;
        border-bottom: 2px solid #34495e;
      }

      .sidebar nav ul {
        list-style: none;
      }

      .sidebar nav li {
        padding: 12px;
        margin: 5px 0;
        border-radius: 4px;
        cursor: pointer;
      }

      .sidebar nav li:hover {
        background: #34495e;
      }

      .content {
        padding: 30px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }

      .card {
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .card h3 {
        color: #666;
        font-size: 0.9em;
        margin-bottom: 10px;
        text-transform: uppercase;
      }

      .card .valor {
        font-size: 2em;
        font-weight: bold;
        color: #2c3e50;
      }

      .card .detalhes {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #eee;
        font-size: 0.9em;
        color: #666;
      }

      .card.verde {
        border-left: 4px solid #27ae60;
      }
      .card.azul {
        border-left: 4px solid #3498db;
      }
      .card.laranja {
        border-left: 4px solid #f39c12;
      }
      .card.roxo {
        border-left: 4px solid #9b59b6;
      }

      .tabela-container {
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background: #f8f9fa;
        font-weight: 600;
        color: #2c3e50;
      }

      .status {
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 0.85em;
        font-weight: 600;
      }

      .status.pago {
        background: #d4edda;
        color: #155724;
      }
      .status.pendente {
        background: #fff3cd;
        color: #856404;
      }
      .status.cancelado {
        background: #f8d7da;
        color: #721c24;
      }
    </style>
  </head>
  <body>
    <div class="dashboard">
      <aside class="sidebar">
        <h2>📊 Admin Panel</h2>
        <nav>
          <ul>
            <li>🏠 Dashboard</li>
            <li>👥 Usuários</li>
            <li>📦 Produtos</li>
            <li>🛒 Pedidos</li>
            <li>📊 Relatórios</li>
            <li>⚙️ Configurações</li>
          </ul>
        </nav>
        <div style="position: absolute; bottom: 20px;">
          <p><%= usuario.nome %></p>
          <p style="font-size: 0.85em; color: #95a5a6;"><%= usuario.tipo %></p>
        </div>
      </aside>

      <main class="content">
        <div class="header">
          <h1><%= titulo %></h1>
          <div>
            <%= new Date().toLocaleDateString('pt-BR', { weekday: 'long', year:
            'numeric', month: 'long', day: 'numeric' }) %>
          </div>
        </div>

        <div class="cards">
          <div class="card verde">
            <h3>💰 Vendas do Mês</h3>
            <div class="valor">
              R$ <%= estatisticas.vendas.mes.toLocaleString('pt-BR') %>
            </div>
            <div class="detalhes">
              Hoje: R$ <%= estatisticas.vendas.hoje.toLocaleString('pt-BR')
              %><br />
              Esta semana: R$ <%=
              estatisticas.vendas.semana.toLocaleString('pt-BR') %>
            </div>
          </div>

          <div class="card azul">
            <h3>👥 Usuários</h3>
            <div class="valor"><%= estatisticas.usuarios.total %></div>
            <div class="detalhes">
              Ativos: <%= estatisticas.usuarios.ativos %><br />
              Novos: <%= estatisticas.usuarios.novos %>
            </div>
          </div>

          <div class="card laranja">
            <h3>📦 Produtos</h3>
            <div class="valor"><%= estatisticas.produtos.total %></div>
            <div class="detalhes">
              Estoque baixo: <%= estatisticas.produtos.estoque_baixo %>
            </div>
          </div>

          <div class="card roxo">
            <h3>🛒 Pedidos</h3>
            <div class="valor"><%= estatisticas.pedidos.pendentes %></div>
            <div class="detalhes">
              Processando: <%= estatisticas.pedidos.processando %><br />
              Concluídos: <%= estatisticas.pedidos.concluidos %>
            </div>
          </div>
        </div>

        <div class="tabela-container">
          <h2 style="margin-bottom: 20px;">📋 Vendas Recentes</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <% vendasRecentes.forEach(venda => { %>
              <tr>
                <td>#<%= venda.id %></td>
                <td><%= venda.cliente %></td>
                <td>R$ <%= venda.valor.toFixed(2) %></td>
                <td>
                  <span class="status <%= venda.status.toLowerCase() %>">
                    <%= venda.status %>
                  </span>
                </td>
              </tr>
              <% }); %>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </body>
</html>
```

---

## Boas Práticas

### 1. Organize suas Views

```
views/
├── layouts/
│   └── main.ejs
├── partials/
│   ├── header.ejs
│   ├── footer.ejs
│   └── nav.ejs
├── pages/
│   ├── index.ejs
│   ├── sobre.ejs
│   └── contato.ejs
├── admin/
│   ├── dashboard.ejs
│   └── usuarios.ejs
└── erros/
    ├── 404.ejs
    └── 500.ejs
```

### 2. Sempre Escape HTML

```html
<!-- ✅ Bom - escapado (seguro) -->
<%= usuario.nome %>

<!-- ❌ Ruim - não escapado (perigoso!) -->
<%- usuario.nome %>
```

### 3. Valide Dados Antes de Renderizar

```javascript
app.get("/usuario/:id", (req, res) => {
  const usuario = buscarUsuario(req.params.id);

  // ✅ Validar antes de renderizar
  if (!usuario) {
    return res.status(404).render("404", {
      titulo: "Usuário não encontrado",
    });
  }

  res.render("usuario", {usuario});
});
```

### 4. Use Valores Padrão

```html
<!-- ✅ Bom - com valor padrão -->
<title><%= titulo || 'Meu Site' %></title>

<!-- ❌ Ruim - pode quebrar se titulo for undefined -->
<title><%= titulo %></title>
```

### 5. Separe Lógica da View

```javascript
// ❌ Ruim - lógica na view
<%
const precoFinal = produto.preco * (1 - produto.desconto / 100);
%>
<p>R$ <%= precoFinal %></p>

// ✅ Bom - lógica no controller
app.get('/produto/:id', (req, res) => {
  const produto = buscarProduto(req.params.id);
  produto.precoFinal = produto.preco * (1 - produto.desconto / 100);
  res.render('produto', { produto });
});
```

### 6. Cache de Views em Produção

```javascript
// Em produção
app.set("view cache", true);

// Em desenvolvimento
if (process.env.NODE_ENV !== "production") {
  app.set("view cache", false);
}
```

### 7. Use Helpers/Funções Auxiliares

```javascript
// Criar helpers globais
app.locals.formatarData = (data) => {
  return data.toLocaleDateString("pt-BR");
};

app.locals.formatarDinheiro = (valor) => {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
};
```

**Na view:**

```html
<p>Data: <%= formatarData(produto.data) %></p>
<p>Preço: <%= formatarDinheiro(produto.preco) %></p>
```

### 8. Mantenha Views Simples

```html
<!-- ✅ Bom - simples e legível -->
<% if (usuario.logado) { %>
<p>Olá, <%= usuario.nome %>!</p>
<% } %>

<!-- ❌ Ruim - muito complexo -->
<% if (usuario.logado && usuario.tipo === 'admin' &&
usuario.permissoes.includes('editar')) { const mensagem = `Bem-vindo,
${usuario.nome}! Você tem ${usuario.notificacoes.length} notificações.`; %>
<p><%= mensagem %></p>
<% } %>
```

---

## 📊 Resumo Comparativo

### Template Engines

| Feature      | EJS            | Pug        | Handlebars     |
| ------------ | -------------- | ---------- | -------------- |
| Sintaxe      | HTML + `<% %>` | Indentação | HTML + `{{ }}` |
| Curva        | Fácil          | Média      | Fácil          |
| JavaScript   | Total          | Limitado   | Limitado       |
| Performance  | Alta           | Alta       | Média          |
| Popularidade | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐   | ⭐⭐⭐⭐       |

### Quando Usar Cada Um

**EJS:**

- Familiaridade com HTML/JavaScript
- Máxima flexibilidade
- Lógica complexa nas views

**Pug:**

- Prefere sintaxe concisa
- Projetos novos
- Gosta de indentação

**Handlebars:**

- Quer separação estrita lógica/apresentação
- Templates simples
- Migração de Mustache

---

## ✅ Checklist

- [ ] Instalar template engine (`npm install ejs`)
- [ ] Configurar no Express (`app.set('view engine', 'ejs')`)
- [ ] Criar pasta `views/`
- [ ] Criar layouts e partials
- [ ] Passar dados do controller para view
- [ ] Usar escape de HTML (<%=)
- [ ] Implementar condicionais e loops
- [ ] Organizar views em subpastas
- [ ] Criar helpers globais
- [ ] Testar em diferentes navegadores

---

## 🎓 Conclusão

Renderizar HTML dinâmico no servidor é essencial para criar aplicações web completas. Com template engines como EJS, você pode:

✅ Criar páginas personalizadas para cada usuário  
✅ Melhorar SEO (search engines veem todo o conteúdo)  
✅ Reduzir JavaScript no frontend  
✅ Reutilizar componentes (partials)  
✅ Manter código organizado e manutenível

**Próximos passos:**

- 🗄️ Integrar com banco de dados real
- 🔐 Adicionar autenticação e sessões
- 📱 Tornar responsivo com CSS
- ⚡ Adicionar interatividade com JavaScript
- 🚀 Deploy da aplicação

Pratique criando suas próprias aplicações com views dinâmicas! 🚀
