# Aplicações Web com Node.js - HTTP e Programação Web

## 📚 Índice

1. [Introdução ao HTTP](#introdução-ao-http)
2. [Como a Web Funciona](#como-a-web-funciona)
3. [Protocolo HTTP](#protocolo-http)
4. [Métodos HTTP](#métodos-http)
5. [Status Codes](#status-codes)
6. [Headers HTTP](#headers-http)
7. [URLs e Rotas](#urls-e-rotas)
8. [Request e Response](#request-e-response)
9. [Servidor HTTP com Node.js](#servidor-http-com-nodejs)
10. [Exemplos Práticos](#exemplos-práticos)
11. [REST API](#rest-api)
12. [Boas Práticas](#boas-práticas)

---

## Introdução ao HTTP

### O que é HTTP?

**HTTP** (HyperText Transfer Protocol) é o protocolo de comunicação usado para transferir dados na web. É a linguagem que browsers e servidores usam para "conversar".

### 🎯 Analogia

Pense no HTTP como uma **conversa em um restaurante**:

```
Cliente (Browser):     "Olá, gostaria do menu, por favor" (REQUEST)
                       ↓
Garçom (Servidor):     "Aqui está o menu!" (RESPONSE)
                       ↓
Cliente:               "Quero um hambúrguer" (REQUEST)
                       ↓
Garçom:                "Aqui está seu hambúrguer!" (RESPONSE)
```

### Características do HTTP

✅ **Stateless** - Cada requisição é independente (o servidor não "lembra" de você)  
✅ **Cliente-Servidor** - Um pede, outro responde  
✅ **Baseado em Texto** - Mensagens legíveis por humanos  
✅ **Independente de Plataforma** - Funciona em qualquer sistema

---

## Como a Web Funciona

### Arquitetura Cliente-Servidor

```
┌─────────────┐                    ┌─────────────┐
│   CLIENTE   │                    │  SERVIDOR   │
│  (Browser)  │                    │  (Node.js)  │
│             │                    │             │
│  1. REQUEST │ ──────────────────>│             │
│             │                    │ 2. PROCESSA │
│             │<────────────────── │             │
│  4. RENDERIZA│  3. RESPONSE      │             │
└─────────────┘                    └─────────────┘
```

### Passo a Passo de uma Requisição Web

1. **Você digita** `www.exemplo.com` no browser
2. **DNS converte** o domínio em endereço IP (ex: 192.168.1.1)
3. **Browser envia** uma requisição HTTP para o servidor
4. **Servidor processa** a requisição
5. **Servidor responde** com HTML, CSS, JS
6. **Browser renderiza** a página na tela

### Exemplo Visual

```
Usuário: Digite "google.com" → Enter
   ↓
Browser: "Preciso do endereço IP de google.com"
   ↓
DNS: "O IP é 142.250.190.78"
   ↓
Browser: GET / HTTP/1.1
         Host: google.com
   ↓
Servidor Google: HTTP/1.1 200 OK
                 Content-Type: text/html
                 <html>...</html>
   ↓
Browser: Renderiza a página
```

---

## Protocolo HTTP

### Estrutura de uma Requisição HTTP

```
┌──────────────────────────────────────────┐
│ MÉTODO  CAMINHO  VERSÃO                  │ ← Linha de Requisição
├──────────────────────────────────────────┤
│ Host: www.exemplo.com                    │
│ User-Agent: Mozilla/5.0                  │ ← Headers
│ Accept: text/html                        │
├──────────────────────────────────────────┤
│                                          │
│ { "nome": "João" }                       │ ← Body (opcional)
│                                          │
└──────────────────────────────────────────┘
```

### Exemplo Real

```http
GET /api/usuarios/123 HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer token123
Accept: application/json
```

### Estrutura de uma Resposta HTTP

```
┌──────────────────────────────────────────┐
│ VERSÃO  STATUS  MENSAGEM                 │ ← Linha de Status
├──────────────────────────────────────────┤
│ Content-Type: application/json           │
│ Content-Length: 45                       │ ← Headers
│ Set-Cookie: sessionId=abc123             │
├──────────────────────────────────────────┤
│                                          │
│ { "id": 123, "nome": "João" }            │ ← Body
│                                          │
└──────────────────────────────────────────┘
```

### Exemplo Real

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 45

{
  "id": 123,
  "nome": "João Silva"
}
```

---

## Métodos HTTP

### Principais Métodos (Verbos HTTP)

| Método      | Significado | Uso                    | Exemplo              |
| ----------- | ----------- | ---------------------- | -------------------- |
| **GET**     | Buscar/Ler  | Obter dados            | `GET /usuarios`      |
| **POST**    | Criar       | Criar novo recurso     | `POST /usuarios`     |
| **PUT**     | Atualizar   | Atualizar completo     | `PUT /usuarios/1`    |
| **PATCH**   | Atualizar   | Atualizar parcial      | `PATCH /usuarios/1`  |
| **DELETE**  | Deletar     | Remover recurso        | `DELETE /usuarios/1` |
| **HEAD**    | Cabeçalhos  | Só headers, sem body   | `HEAD /usuarios`     |
| **OPTIONS** | Opções      | Ver métodos permitidos | `OPTIONS /usuarios`  |

### GET - Buscar Dados

```javascript
// Browser faz:
GET /
  api /
  produtos[
    // Servidor responde:
    ({id: 1, nome: "Notebook", preco: 3000}, {id: 2, nome: "Mouse", preco: 50})
  ];
```

**Características:**

- ✅ Não modifica dados
- ✅ Pode ser cacheado
- ✅ Fica no histórico do browser
- ❌ Não deve ter body

### POST - Criar Dados

```javascript
// Browser envia:
POST /api/produtos
Content-Type: application/json

{
  "nome": "Teclado",
  "preco": 150
}

// Servidor responde:
HTTP/1.1 201 Created
Location: /api/produtos/3

{
  "id": 3,
  "nome": "Teclado",
  "preco": 150
}
```

**Características:**

- ✅ Cria novo recurso
- ✅ Tem body com dados
- ❌ Não é idempotente (múltiplas chamadas criam múltiplos recursos)

### PUT - Atualizar Completo

```javascript
// Browser envia:
PUT /api/produtos/3
Content-Type: application/json

{
  "nome": "Teclado Mecânico",
  "preco": 200,
  "estoque": 10
}

// Servidor responde:
HTTP/1.1 200 OK

{
  "id": 3,
  "nome": "Teclado Mecânico",
  "preco": 200,
  "estoque": 10
}
```

**Características:**

- ✅ Substitui recurso completo
- ✅ Idempotente (mesma chamada sempre = mesmo resultado)

### PATCH - Atualizar Parcial

```javascript
// Browser envia:
PATCH /api/produtos/3
Content-Type: application/json

{
  "preco": 180
}

// Servidor responde:
HTTP/1.1 200 OK

{
  "id": 3,
  "nome": "Teclado Mecânico",
  "preco": 180,  // ← Só isso mudou
  "estoque": 10
}
```

### DELETE - Remover Dados

```javascript
// Browser envia:
DELETE /api/produtos/3

// Servidor responde:
HTTP/1.1 204 No Content
```

**Características:**

- ✅ Remove recurso
- ✅ Geralmente sem body na resposta
- ✅ Idempotente

---

## Status Codes

### Categorias de Status

| Código  | Categoria        | Significado                |
| ------- | ---------------- | -------------------------- |
| **1xx** | Informação       | Processamento em andamento |
| **2xx** | Sucesso          | Tudo deu certo ✅          |
| **3xx** | Redirecionamento | Recurso movido 🔄          |
| **4xx** | Erro do Cliente  | Você errou ❌              |
| **5xx** | Erro do Servidor | Servidor errou 💥          |

### Status Codes Mais Comuns

#### 2xx - Sucesso

| Código  | Nome       | Quando Usar                     |
| ------- | ---------- | ------------------------------- |
| **200** | OK         | GET, PUT, PATCH bem-sucedidos   |
| **201** | Created    | POST criou recurso com sucesso  |
| **204** | No Content | DELETE bem-sucedido sem retorno |

```javascript
// 200 OK
res.statusCode = 200;
res.end(JSON.stringify({mensagem: "Sucesso!"}));

// 201 Created
res.statusCode = 201;
res.setHeader("Location", "/usuarios/123");
res.end(JSON.stringify({id: 123, nome: "João"}));

// 204 No Content
res.statusCode = 204;
res.end();
```

#### 3xx - Redirecionamento

| Código  | Nome              | Quando Usar                 |
| ------- | ----------------- | --------------------------- |
| **301** | Moved Permanently | Recurso mudou para sempre   |
| **302** | Found             | Redirecionamento temporário |
| **304** | Not Modified      | Use versão em cache         |

```javascript
// 301 Moved Permanently
res.statusCode = 301;
res.setHeader("Location", "https://novo-site.com");
res.end();

// 302 Found (temporário)
res.statusCode = 302;
res.setHeader("Location", "/login");
res.end();
```

#### 4xx - Erro do Cliente

| Código  | Nome               | Quando Usar                    |
| ------- | ------------------ | ------------------------------ |
| **400** | Bad Request        | Dados inválidos/malformados    |
| **401** | Unauthorized       | Não autenticado (sem login)    |
| **403** | Forbidden          | Autenticado mas sem permissão  |
| **404** | Not Found          | Recurso não existe             |
| **405** | Method Not Allowed | Método HTTP não permitido      |
| **409** | Conflict           | Conflito (ex: email já existe) |

```javascript
// 400 Bad Request
res.statusCode = 400;
res.end(JSON.stringify({erro: "Email inválido"}));

// 401 Unauthorized
res.statusCode = 401;
res.end(JSON.stringify({erro: "Faça login primeiro"}));

// 404 Not Found
res.statusCode = 404;
res.end(JSON.stringify({erro: "Usuário não encontrado"}));
```

#### 5xx - Erro do Servidor

| Código  | Nome                  | Quando Usar                        |
| ------- | --------------------- | ---------------------------------- |
| **500** | Internal Server Error | Erro genérico no servidor          |
| **502** | Bad Gateway           | Gateway/proxy com erro             |
| **503** | Service Unavailable   | Servidor sobrecarregado/manutenção |

```javascript
// 500 Internal Server Error
try {
  // código que pode dar erro
} catch (erro) {
  res.statusCode = 500;
  res.end(JSON.stringify({erro: "Erro interno do servidor"}));
}
```

---

## Headers HTTP

### O que são Headers?

**Headers** são metadados enviados junto com requisições e respostas HTTP. Eles contêm informações adicionais sobre a mensagem.

### Headers Comuns de Request

```http
GET /api/usuarios HTTP/1.1
Host: api.exemplo.com                    ← Domínio do servidor
User-Agent: Mozilla/5.0                  ← Navegador/cliente
Accept: application/json                 ← Formato aceito
Accept-Language: pt-BR                   ← Idioma preferido
Authorization: Bearer token123           ← Token de autenticação
Content-Type: application/json           ← Tipo do body
Cookie: sessionId=abc123                 ← Cookies
```

### Headers Comuns de Response

```http
HTTP/1.1 200 OK
Content-Type: application/json           ← Tipo do conteúdo
Content-Length: 1234                     ← Tamanho em bytes
Set-Cookie: sessionId=abc123             ← Definir cookie
Cache-Control: max-age=3600              ← Controle de cache
Access-Control-Allow-Origin: *           ← CORS
Location: /usuarios/123                  ← Redirecionamento
```

### Exemplos em Node.js

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  // LER headers da requisição
  console.log("Host:", req.headers.host);
  console.log("User-Agent:", req.headers["user-agent"]);
  console.log("Authorization:", req.headers.authorization);

  // DEFINIR headers da resposta
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Powered-By", "Node.js");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.end(JSON.stringify({mensagem: "OK"}));
});

server.listen(3000);
```

### Content-Type Importantes

| Content-Type                        | Uso                |
| ----------------------------------- | ------------------ |
| `text/html`                         | Páginas HTML       |
| `text/plain`                        | Texto puro         |
| `application/json`                  | Dados JSON (APIs)  |
| `application/xml`                   | Dados XML          |
| `multipart/form-data`               | Upload de arquivos |
| `application/x-www-form-urlencoded` | Formulários        |
| `image/jpeg`, `image/png`           | Imagens            |

---

## URLs e Rotas

### Anatomia de uma URL

```
https://api.exemplo.com:443/usuarios/123?ativo=true&ordem=nome#secao1
└─┬─┘  └──────┬────────┘└┬┘ └────┬────┘ └──────┬───────────┘ └──┬──┘
Protocolo   Domínio    Porta  Caminho      Query String      Fragment
```

**Componentes:**

- **Protocolo**: `http://` ou `https://`
- **Domínio**: `api.exemplo.com`
- **Porta**: `:443` (padrão 80 para HTTP, 443 para HTTPS)
- **Caminho**: `/usuarios/123`
- **Query String**: `?ativo=true&ordem=nome`
- **Fragment**: `#secao1` (apenas no browser)

### Rotas (Paths)

```javascript
// Rotas comuns em uma API REST

GET    /usuarios           → Lista todos os usuários
GET    /usuarios/123       → Busca usuário com ID 123
POST   /usuarios           → Cria novo usuário
PUT    /usuarios/123       → Atualiza usuário 123
DELETE /usuarios/123       → Remove usuário 123

GET    /usuarios/123/posts → Lista posts do usuário 123
POST   /usuarios/123/posts → Cria post para usuário 123
```

### Query Parameters

```javascript
// URL: /produtos?categoria=eletronicos&preco_max=1000&ordenar=preco

const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  console.log(query.categoria); // 'eletronicos'
  console.log(query.preco_max); // '1000'
  console.log(query.ordenar); // 'preco'

  // Usar os parâmetros para filtrar dados
  // ...
});
```

### Route Parameters

```javascript
// URL: /usuarios/123/posts/456
//       └── userId ──┘ └postId┘

const server = http.createServer((req, res) => {
  const path = req.url.split("?")[0]; // Remove query string
  const parts = path.split("/").filter((p) => p); // ['usuarios', '123', 'posts', '456']

  if (parts[0] === "usuarios" && parts[2] === "posts") {
    const userId = parts[1]; // '123'
    const postId = parts[3]; // '456'

    console.log(`Buscando post ${postId} do usuário ${userId}`);
  }
});
```

---

## Request e Response

### Objeto Request (req)

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  // PROPRIEDADES PRINCIPAIS
  console.log("Método:", req.method); // 'GET', 'POST', etc
  console.log("URL:", req.url); // '/usuarios?nome=joao'
  console.log("Headers:", req.headers); // { host: '...', ... }

  // LER BODY (para POST, PUT, PATCH)
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    console.log("Body:", body);

    // Se for JSON
    if (req.headers["content-type"] === "application/json") {
      const dados = JSON.parse(body);
      console.log("Dados:", dados);
    }
  });
});
```

### Objeto Response (res)

```javascript
const server = http.createServer((req, res) => {
  // DEFINIR STATUS
  res.statusCode = 200;

  // DEFINIR HEADERS
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Custom-Header", "Valor");

  // ENVIAR RESPOSTA
  res.end(JSON.stringify({mensagem: "Sucesso!"}));

  // OU usar writeHead para status + headers de uma vez
  res.writeHead(200, {
    "Content-Type": "application/json",
    "X-Custom-Header": "Valor",
  });
  res.end(JSON.stringify({mensagem: "Sucesso!"}));
});
```

### Exemplo Completo: Request + Response

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Rota: GET /
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<h1>Bem-vindo!</h1>");
  }

  // Rota: GET /api/status
  else if (req.method === "GET" && req.url === "/api/status") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "online", versao: "1.0.0"}));
  }

  // Rota: POST /api/mensagem
  else if (req.method === "POST" && req.url === "/api/mensagem") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const dados = JSON.parse(body);
      console.log("Mensagem recebida:", dados.texto);

      res.writeHead(201, {"Content-Type": "application/json"});
      res.end(
        JSON.stringify({
          sucesso: true,
          mensagem: dados.texto,
        })
      );
    });
  }

  // 404 - Not Found
  else {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({erro: "Rota não encontrada"}));
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
```

---

## Servidor HTTP com Node.js

### Criar Servidor Básico

```javascript
const http = require("http");

// Criar servidor
const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
  res.end("Olá, mundo!");
});

// Iniciar servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### Servidor com Roteamento

```javascript
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Roteamento
  if (method === "GET" && pathname === "/") {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<h1>Página Inicial</h1>");
  } else if (method === "GET" && pathname === "/sobre") {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<h1>Sobre Nós</h1>");
  } else if (method === "GET" && pathname === "/api/dados") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({nome: "João", idade: 30}));
  } else {
    res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<h1>404 - Página não encontrada</h1>");
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
```

### Servir Arquivos Estáticos

```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Caminho do arquivo
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extensão do arquivo
  const extname = path.extname(filePath);

  // Content-Type baseado na extensão
  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
  };

  const contentType = contentTypes[extname] || "text/plain";

  // Ler e servir arquivo
  fs.readFile(filePath, (erro, conteudo) => {
    if (erro) {
      if (erro.code === "ENOENT") {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>404 - Arquivo não encontrado</h1>");
      } else {
        res.writeHead(500);
        res.end("Erro no servidor");
      }
    } else {
      res.writeHead(200, {"Content-Type": contentType});
      res.end(conteudo);
    }
  });
});

server.listen(3000);
```

---

## Exemplos Práticos

### Exemplo 1: API CRUD de Usuários

```javascript
const http = require("http");
const url = require("url");

// "Banco de dados" em memória
let usuarios = [
  {id: 1, nome: "João Silva", email: "joao@email.com"},
  {id: 2, nome: "Maria Santos", email: "maria@email.com"},
];
let proximoId = 3;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // GET /usuarios - Listar todos
  if (method === "GET" && pathname === "/usuarios") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(usuarios));
  }

  // GET /usuarios/:id - Buscar um
  else if (method === "GET" && pathname.startsWith("/usuarios/")) {
    const id = parseInt(pathname.split("/")[2]);
    const usuario = usuarios.find((u) => u.id === id);

    if (usuario) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(usuario));
    } else {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({erro: "Usuário não encontrado"}));
    }
  }

  // POST /usuarios - Criar novo
  else if (method === "POST" && pathname === "/usuarios") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const novoUsuario = JSON.parse(body);
      novoUsuario.id = proximoId++;
      usuarios.push(novoUsuario);

      res.writeHead(201, {
        "Content-Type": "application/json",
        Location: `/usuarios/${novoUsuario.id}`,
      });
      res.end(JSON.stringify(novoUsuario));
    });
  }

  // PUT /usuarios/:id - Atualizar
  else if (method === "PUT" && pathname.startsWith("/usuarios/")) {
    const id = parseInt(pathname.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const dadosAtualizados = JSON.parse(body);
      const index = usuarios.findIndex((u) => u.id === id);

      if (index !== -1) {
        usuarios[index] = {...usuarios[index], ...dadosAtualizados, id};
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(usuarios[index]));
      } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({erro: "Usuário não encontrado"}));
      }
    });
  }

  // DELETE /usuarios/:id - Remover
  else if (method === "DELETE" && pathname.startsWith("/usuarios/")) {
    const id = parseInt(pathname.split("/")[2]);
    const index = usuarios.findIndex((u) => u.id === id);

    if (index !== -1) {
      usuarios.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({erro: "Usuário não encontrado"}));
    }
  }

  // 404
  else {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({erro: "Rota não encontrada"}));
  }
});

server.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
  console.log("Rotas disponíveis:");
  console.log("  GET    /usuarios");
  console.log("  GET    /usuarios/:id");
  console.log("  POST   /usuarios");
  console.log("  PUT    /usuarios/:id");
  console.log("  DELETE /usuarios/:id");
});
```

### Exemplo 2: Servidor com HTML Dinâmico

```javascript
const http = require("http");

const usuarios = [
  {nome: "João", idade: 30},
  {nome: "Maria", idade: 25},
  {nome: "Pedro", idade: 35},
];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Lista de Usuários</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:hover { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>📋 Lista de Usuários</h1>
        <table>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
          </tr>
          ${usuarios
            .map(
              (u) => `
            <tr>
              <td>${u.nome}</td>
              <td>${u.idade}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </body>
      </html>
    `;

    res.end(html);
  } else {
    res.writeHead(404);
    res.end("404 - Não encontrado");
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
```

### Exemplo 3: API com Autenticação Simples

```javascript
const http = require("http");

// Token de autenticação simples (em produção, use JWT)
const TOKENS_VALIDOS = ["token123", "token456"];

function verificarAutenticacao(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return {autenticado: false, erro: "Token não fornecido"};
  }

  const token = authHeader.replace("Bearer ", "");

  if (!TOKENS_VALIDOS.includes(token)) {
    return {autenticado: false, erro: "Token inválido"};
  }

  return {autenticado: true};
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Rota pública
  if (req.url === "/publico") {
    res.writeHead(200);
    res.end(JSON.stringify({mensagem: "Rota pública - sem autenticação"}));
  }

  // Rota protegida
  else if (req.url === "/protegido") {
    const auth = verificarAutenticacao(req);

    if (!auth.autenticado) {
      res.writeHead(401);
      res.end(JSON.stringify({erro: auth.erro}));
    } else {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          mensagem: "Acesso autorizado!",
          dados: {secreto: "Informação confidencial"},
        })
      );
    }
  }

  // 404
  else {
    res.writeHead(404);
    res.end(JSON.stringify({erro: "Rota não encontrada"}));
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("\nTestar:");
  console.log("curl http://localhost:3000/publico");
  console.log("curl http://localhost:3000/protegido");
  console.log(
    'curl -H "Authorization: Bearer token123" http://localhost:3000/protegido'
  );
});
```

---

## REST API

### O que é REST?

**REST** (Representational State Transfer) é um estilo arquitetural para APIs que usa HTTP de forma padronizada.

### Princípios REST

1. **Cliente-Servidor** - Separação de responsabilidades
2. **Stateless** - Cada requisição é independente
3. **Cacheable** - Respostas podem ser cacheadas
4. **Interface Uniforme** - Padrão consistente de URLs
5. **Sistema em Camadas** - Arquitetura em camadas

### Convenções REST

```
Recurso: Usuários

GET    /usuarios           → Listar todos os usuários
GET    /usuarios/123       → Buscar usuário específico
POST   /usuarios           → Criar novo usuário
PUT    /usuarios/123       → Atualizar usuário completo
PATCH  /usuarios/123       → Atualizar parcialmente
DELETE /usuarios/123       → Remover usuário

Sub-recursos:

GET    /usuarios/123/posts       → Posts do usuário
POST   /usuarios/123/posts       → Criar post do usuário
GET    /usuarios/123/posts/456   → Post específico
```

### Boas Práticas REST

✅ **Use substantivos (não verbos)** nos caminhos

```
✅ GET /usuarios
❌ GET /buscarUsuarios
```

✅ **Use plural para coleções**

```
✅ GET /usuarios
❌ GET /usuario
```

✅ **Use hierarquia para relacionamentos**

```
✅ GET /usuarios/123/posts
❌ GET /posts?usuario_id=123
```

✅ **Use query params para filtros/paginação**

```
GET /usuarios?idade_min=18&limite=10&pagina=2
```

✅ **Retorne status codes apropriados**

```
200 OK, 201 Created, 400 Bad Request, 404 Not Found
```

### Exemplo de API REST Completa

```javascript
const http = require("http");
const url = require("url");

// Banco de dados simulado
const database = {
  usuarios: [
    {id: 1, nome: "João", posts: [1, 2]},
    {id: 2, nome: "Maria", posts: [3]},
  ],
  posts: [
    {id: 1, userId: 1, titulo: "Post 1", conteudo: "Conteúdo 1"},
    {id: 2, userId: 1, titulo: "Post 2", conteudo: "Conteúdo 2"},
    {id: 3, userId: 2, titulo: "Post 3", conteudo: "Conteúdo 3"},
  ],
};

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const query = parsedUrl.query;

  res.setHeader("Content-Type", "application/json");

  try {
    // GET /usuarios
    if (method === "GET" && pathname === "/usuarios") {
      let usuarios = database.usuarios;

      // Filtros opcionais
      if (query.nome) {
        usuarios = usuarios.filter((u) =>
          u.nome.toLowerCase().includes(query.nome.toLowerCase())
        );
      }

      res.writeHead(200);
      res.end(JSON.stringify(usuarios));
    }

    // GET /usuarios/:id/posts
    else if (method === "GET" && pathname.match(/^\/usuarios\/\d+\/posts$/)) {
      const userId = parseInt(pathname.split("/")[2]);
      const posts = database.posts.filter((p) => p.userId === userId);

      res.writeHead(200);
      res.end(JSON.stringify(posts));
    }

    // POST /usuarios
    else if (method === "POST" && pathname === "/usuarios") {
      const novoUsuario = await parseBody(req);
      novoUsuario.id = database.usuarios.length + 1;
      novoUsuario.posts = [];
      database.usuarios.push(novoUsuario);

      res.writeHead(201, {Location: `/usuarios/${novoUsuario.id}`});
      res.end(JSON.stringify(novoUsuario));
    }

    // 404
    else {
      res.writeHead(404);
      res.end(JSON.stringify({erro: "Rota não encontrada"}));
    }
  } catch (erro) {
    res.writeHead(500);
    res.end(JSON.stringify({erro: "Erro interno do servidor"}));
  }
});

server.listen(3000);
```

---

## Boas Práticas

### 1. Sempre use Status Codes apropriados

```javascript
// ✅ Bom
res.writeHead(404, {"Content-Type": "application/json"});
res.end(JSON.stringify({erro: "Não encontrado"}));

// ❌ Ruim
res.writeHead(200, {"Content-Type": "application/json"});
res.end(JSON.stringify({erro: "Não encontrado"}));
```

### 2. Valide entrada do usuário

```javascript
// ✅ Bom
const dados = JSON.parse(body);

if (!dados.email || !dados.email.includes("@")) {
  res.writeHead(400);
  res.end(JSON.stringify({erro: "Email inválido"}));
  return;
}
```

### 3. Use Content-Type correto

```javascript
// JSON
res.setHeader("Content-Type", "application/json");

// HTML
res.setHeader("Content-Type", "text/html; charset=utf-8");

// Texto
res.setHeader("Content-Type", "text/plain; charset=utf-8");
```

### 4. Trate erros adequadamente

```javascript
try {
  const dados = JSON.parse(body);
  // processar dados
} catch (erro) {
  res.writeHead(400);
  res.end(JSON.stringify({erro: "JSON inválido"}));
}
```

### 5. Configure CORS quando necessário

```javascript
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
```

### 6. Use logging

```javascript
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // ... resto do código
});
```

### 7. Implemente rate limiting (limite de requisições)

```javascript
const requisicoesPorIP = new Map();

function verificarRateLimit(ip) {
  const agora = Date.now();
  const limite = 100; // 100 requisições
  const janela = 60000; // por minuto

  if (!requisicoesPorIP.has(ip)) {
    requisicoesPorIP.set(ip, []);
  }

  const requisicoes = requisicoesPorIP
    .get(ip)
    .filter((timestamp) => agora - timestamp < janela);

  if (requisicoes.length >= limite) {
    return false;
  }

  requisicoes.push(agora);
  requisicoesPorIP.set(ip, requisicoes);
  return true;
}
```

---

## 📊 Resumo

### HTTP em uma Tabela

| Conceito    | Descrição             | Exemplo                     |
| ----------- | --------------------- | --------------------------- |
| **Métodos** | Verbos de ação        | GET, POST, PUT, DELETE      |
| **Status**  | Resultado da operação | 200, 404, 500               |
| **Headers** | Metadados             | Content-Type, Authorization |
| **Body**    | Conteúdo da mensagem  | JSON, HTML, etc             |
| **URL**     | Endereço do recurso   | /usuarios/123               |

### Estrutura de uma API REST

```
📁 Recurso: Usuários
  ├── GET    /usuarios          → Lista
  ├── POST   /usuarios          → Criar
  ├── GET    /usuarios/:id      → Buscar
  ├── PUT    /usuarios/:id      → Atualizar
  └── DELETE /usuarios/:id      → Remover
```

---

## ✅ Checklist

- [ ] Entender estrutura de requisição/resposta HTTP
- [ ] Conhecer principais métodos (GET, POST, PUT, DELETE)
- [ ] Saber quando usar cada status code
- [ ] Configurar headers corretamente
- [ ] Implementar roteamento básico
- [ ] Validar entrada do usuário
- [ ] Tratar erros adequadamente
- [ ] Seguir convenções REST
- [ ] Usar Content-Type apropriado
- [ ] Implementar CORS quando necessário

---

## 🎓 Conclusão

HTTP é a base da web e entendê-lo é fundamental para desenvolver aplicações web com Node.js. Com os conceitos de métodos, status codes, headers e REST, você pode criar APIs profissionais e escaláveis.

**Próximos passos:**

- Frameworks (Express.js, Fastify)
- Autenticação (JWT, OAuth)
- Banco de dados (MongoDB, PostgreSQL)
- WebSockets para tempo real
- GraphQL como alternativa ao REST

Pratique criando suas próprias APIs e logo você estará desenvolvendo aplicações web completas! 🚀
