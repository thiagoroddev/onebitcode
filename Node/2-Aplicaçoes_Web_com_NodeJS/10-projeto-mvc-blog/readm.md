# 📚 CRUD com Node.js e Express - Guia Completo

Este guia apresenta um passo a passo detalhado para criar um CRUD (Create, Read, Update, Delete) completo usando Node.js e Express, aplicando conceitos fundamentais de desenvolvimento backend.

## 🎯 Objetivo

Criar uma API RESTful para gerenciar artigos de um blog, aplicando os conceitos de:

- Estrutura MVC (Model-View-Controller)
- Rotas e Controllers
- Middlewares
- Validação de dados
- Manipulação de arquivos
- Tratamento de erros

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Editor de código (VS Code recomendado)
- [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar a API

---

## 🚀 Passo a Passo

### **Passo 1: Configuração Inicial do Projeto**

#### 1.1 - Criar a pasta do projeto

```bash
mkdir crud-blog-nodejs
cd crud-blog-nodejs
```

#### 1.2 - Inicializar o projeto Node.js

```bash
npm init -y
```

#### 1.3 - Instalar as dependências necessárias

```bash
npm install express
npm install --save-dev nodemon
```

**Explicação das dependências:**

- `express`: Framework web para criar a API
- `nodemon`: Ferramenta que reinicia automaticamente o servidor quando há mudanças no código

#### 1.4 - Configurar o package.json

Adicione os seguintes scripts no `package.json`:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

---

### **Passo 2: Estrutura de Pastas**

Crie a seguinte estrutura de pastas:

```
crud-blog-nodejs/
│
├── src/
│   ├── controllers/
│   │   └── ArticleController.js
│   ├── models/
│   │   └── Article.js
│   ├── routes/
│   │   └── articleRoutes.js
│   ├── middlewares/
│   │   └── validateArticle.js
│   ├── database/
│   │   └── articles.json
│   └── server.js
│
├── package.json
└── README.md
```

**Crie as pastas:**

```bash
mkdir -p src/controllers src/models src/routes src/middlewares src/database
```

---

### **Passo 3: Criar o Servidor Express**

Crie o arquivo `src/server.js`:

```javascript
const express = require("express");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
const PORT = 3000;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rotas
app.use("/articles", articleRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    message: "API do Blog está funcionando!",
    endpoints: {
      articles: "/articles",
    },
  });
});

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({error: "Rota não encontrada"});
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
```

---

### **Passo 4: Criar o Model (Modelo de Dados)**

Crie o arquivo `src/models/Article.js`:

```javascript
const fs = require("fs");
const path = require("path");

const articlesPath = path.join(__dirname, "../database/articles.json");

class Article {
  constructor(id, title, content, author, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt || new Date().toISOString();
  }

  // Ler todos os artigos
  static getAll() {
    try {
      const data = fs.readFileSync(articlesPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // Buscar artigo por ID
  static findById(id) {
    const articles = this.getAll();
    return articles.find((article) => article.id === parseInt(id));
  }

  // Salvar todos os artigos
  static saveAll(articles) {
    fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  }

  // Criar novo artigo
  static create(articleData) {
    const articles = this.getAll();
    const newId =
      articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;

    const newArticle = new Article(
      newId,
      articleData.title,
      articleData.content,
      articleData.author
    );

    articles.push(newArticle);
    this.saveAll(articles);
    return newArticle;
  }

  // Atualizar artigo
  static update(id, articleData) {
    const articles = this.getAll();
    const index = articles.findIndex((article) => article.id === parseInt(id));

    if (index === -1) return null;

    articles[index] = {
      ...articles[index],
      ...articleData,
      id: parseInt(id),
      createdAt: articles[index].createdAt,
    };

    this.saveAll(articles);
    return articles[index];
  }

  // Deletar artigo
  static delete(id) {
    const articles = this.getAll();
    const filteredArticles = articles.filter(
      (article) => article.id !== parseInt(id)
    );

    if (articles.length === filteredArticles.length) return false;

    this.saveAll(filteredArticles);
    return true;
  }
}

module.exports = Article;
```

---

### **Passo 5: Criar o Arquivo de Banco de Dados**

Crie o arquivo `src/database/articles.json`:

```json
[]
```

---

### **Passo 6: Criar o Middleware de Validação**

Crie o arquivo `src/middlewares/validateArticle.js`:

```javascript
const validateArticle = (req, res, next) => {
  const {title, content, author} = req.body;

  // Validar se os campos obrigatórios existem
  if (!title || !content || !author) {
    return res.status(400).json({
      error: "Campos obrigatórios faltando",
      required: ["title", "content", "author"],
    });
  }

  // Validar tipos de dados
  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof author !== "string"
  ) {
    return res.status(400).json({
      error: "Tipos de dados inválidos",
      expected: {
        title: "string",
        content: "string",
        author: "string",
      },
    });
  }

  // Validar tamanho mínimo
  if (title.trim().length < 3) {
    return res.status(400).json({
      error: "Título deve ter pelo menos 3 caracteres",
    });
  }

  if (content.trim().length < 10) {
    return res.status(400).json({
      error: "Conteúdo deve ter pelo menos 10 caracteres",
    });
  }

  if (author.trim().length < 3) {
    return res.status(400).json({
      error: "Nome do autor deve ter pelo menos 3 caracteres",
    });
  }

  next();
};

module.exports = validateArticle;
```

---

### **Passo 7: Criar o Controller**

Crie o arquivo `src/controllers/ArticleController.js`:

```javascript
const Article = require("../models/Article");

class ArticleController {
  // GET /articles - Listar todos os artigos
  index(req, res) {
    try {
      const articles = Article.getAll();
      res.json({
        total: articles.length,
        articles,
      });
    } catch (error) {
      res.status(500).json({error: "Erro ao buscar artigos"});
    }
  }

  // GET /articles/:id - Buscar artigo por ID
  show(req, res) {
    try {
      const {id} = req.params;
      const article = Article.findById(id);

      if (!article) {
        return res.status(404).json({error: "Artigo não encontrado"});
      }

      res.json(article);
    } catch (error) {
      res.status(500).json({error: "Erro ao buscar artigo"});
    }
  }

  // POST /articles - Criar novo artigo
  store(req, res) {
    try {
      const {title, content, author} = req.body;

      const newArticle = Article.create({
        title,
        content,
        author,
      });

      res.status(201).json({
        message: "Artigo criado com sucesso",
        article: newArticle,
      });
    } catch (error) {
      res.status(500).json({error: "Erro ao criar artigo"});
    }
  }

  // PUT /articles/:id - Atualizar artigo
  update(req, res) {
    try {
      const {id} = req.params;
      const {title, content, author} = req.body;

      const updatedArticle = Article.update(id, {
        title,
        content,
        author,
      });

      if (!updatedArticle) {
        return res.status(404).json({error: "Artigo não encontrado"});
      }

      res.json({
        message: "Artigo atualizado com sucesso",
        article: updatedArticle,
      });
    } catch (error) {
      res.status(500).json({error: "Erro ao atualizar artigo"});
    }
  }

  // DELETE /articles/:id - Deletar artigo
  delete(req, res) {
    try {
      const {id} = req.params;
      const deleted = Article.delete(id);

      if (!deleted) {
        return res.status(404).json({error: "Artigo não encontrado"});
      }

      res.json({message: "Artigo deletado com sucesso"});
    } catch (error) {
      res.status(500).json({error: "Erro ao deletar artigo"});
    }
  }
}

module.exports = new ArticleController();
```

---

### **Passo 8: Criar as Rotas**

Crie o arquivo `src/routes/articleRoutes.js`:

```javascript
const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/ArticleController");
const validateArticle = require("../middlewares/validateArticle");

// Rotas CRUD
router.get("/", ArticleController.index);
router.get("/:id", ArticleController.show);
router.post("/", validateArticle, ArticleController.store);
router.put("/:id", validateArticle, ArticleController.update);
router.delete("/:id", ArticleController.delete);

module.exports = router;
```

---

## 🧪 Testando a API

### Iniciar o servidor

```bash
npm run dev
```

### Endpoints disponíveis:

#### 1. **Listar todos os artigos**

```http
GET http://localhost:3000/articles
```

#### 2. **Buscar artigo por ID**

```http
GET http://localhost:3000/articles/1
```

#### 3. **Criar novo artigo**

```http
POST http://localhost:3000/articles
Content-Type: application/json

{
  "title": "Meu Primeiro Artigo",
  "content": "Este é o conteúdo do meu primeiro artigo sobre Node.js e Express.",
  "author": "João Silva"
}
```

#### 4. **Atualizar artigo**

```http
PUT http://localhost:3000/articles/1
Content-Type: application/json

{
  "title": "Artigo Atualizado",
  "content": "Conteúdo atualizado do artigo.",
  "author": "João Silva"
}
```

#### 5. **Deletar artigo**

```http
DELETE http://localhost:3000/articles/1
```

---

## 📚 Conceitos Aplicados

### **1. MVC (Model-View-Controller)**

- **Model** (`Article.js`): Lógica de dados e manipulação do arquivo JSON
- **Controller** (`ArticleController.js`): Lógica de negócio e resposta às requisições
- **Routes** (`articleRoutes.js`): Definição dos endpoints da API

### **2. Middlewares**

- `express.json()`: Parser de JSON
- `validateArticle`: Validação customizada de dados
- Middleware de erro 404

### **3. RESTful API**

Seguindo os padrões REST:

- GET: Buscar recursos
- POST: Criar recursos
- PUT: Atualizar recursos
- DELETE: Remover recursos

### **4. Validação de Dados**

Verificação de campos obrigatórios, tipos e tamanhos mínimos

### **5. Tratamento de Erros**

Try-catch e respostas HTTP apropriadas (404, 400, 500)

---

## 🎯 Desafios para Praticar

1. **Adicionar paginação** na listagem de artigos
2. **Implementar busca** por título ou autor
3. **Adicionar campo de tags** aos artigos
4. **Criar sistema de categorias**
5. **Implementar contagem de visualizações**
6. **Adicionar data de atualização** (updatedAt)
7. **Criar middleware de log** de requisições
8. **Implementar ordenação** (por data, título, etc.)
9. **Adicionar validação de URL** para campo de imagem
10. **Criar testes unitários** com Jest

---

## 🔄 Próximos Passos

Após dominar este CRUD básico, você pode evoluir para:

1. **Integrar com banco de dados real** (MongoDB, PostgreSQL)
2. **Adicionar autenticação** (JWT, sessions)
3. **Implementar upload de imagens**
4. **Criar relacionamentos** (comentários, categorias)
5. **Adicionar documentação** com Swagger
6. **Implementar testes automatizados**
7. **Criar frontend** com React ou Vue.js
8. **Deploy** na nuvem (Heroku, Railway, Vercel)

---

## 📖 Recursos Adicionais

- [Documentação Express](https://expressjs.com/)
- [Node.js Docs](https://nodejs.org/docs/)
- [MDN - HTTP Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🤝 Contribuindo

Este é um projeto de estudos. Sinta-se livre para:

- Adicionar novas funcionalidades
- Melhorar a documentação
- Reportar problemas
- Compartilhar suas implementações

---

## 📝 Licença

Este projeto é livre para uso educacional e pessoal.

---

**Bons estudos! 🚀**

Se tiver dúvidas, consulte a documentação oficial ou entre em contato com a comunidade.
