# Requisições POST e Redirecionamentos em Express

## 📚 Índice

1. [Introdução](#introdução)
2. [GET vs POST](#get-vs-post)
3. [Requisições POST](#requisições-post)
4. [Body Parsers](#body-parsers)
5. [Formulários HTML](#formulários-html)
6. [Recebendo Dados POST](#recebendo-dados-post)
7. [Validação de Dados](#validação-de-dados)
8. [Redirecionamentos](#redirecionamentos)
9. [Padrão PRG (Post-Redirect-Get)](#padrão-prg-post-redirect-get)
10. [Upload de Arquivos](#upload-de-arquivos)
11. [Flash Messages](#flash-messages)
12. [Exemplos Práticos](#exemplos-práticos)
13. [Boas Práticas](#boas-práticas)

---

## Introdução

### O que são Requisições POST?

**POST** é um método HTTP usado para **enviar dados** ao servidor. Diferente do GET (que busca dados), o POST **cria ou modifica** recursos.

### 🎯 Analogia

```
GET = Pedir cardápio no restaurante
├── Você apenas consulta
├── Não muda nada
└── Idempotente (pode repetir)

POST = Fazer pedido de comida
├── Você envia informação nova
├── Cria algo no sistema
└── Não-idempotente (cada vez é um pedido novo)
```

### Casos de Uso Comuns

```
POST é usado para:
✅ Enviar formulários (login, cadastro)
✅ Criar novos recursos (usuário, post, produto)
✅ Upload de arquivos
✅ Processar pagamentos
✅ Enviar emails
✅ Fazer autenticação
```

---

## GET vs POST

### Comparação Completa

| Característica           | GET                   | POST                   |
| ------------------------ | --------------------- | ---------------------- |
| **Propósito**            | Buscar dados          | Enviar/criar dados     |
| **Dados na URL**         | ✅ Sim (query string) | ❌ Não                 |
| **Dados no body**        | ❌ Não                | ✅ Sim                 |
| **Visível no histórico** | ✅ Sim                | ❌ Não                 |
| **Pode ser cacheado**    | ✅ Sim                | ❌ Não                 |
| **Limite de dados**      | ~2KB (URL)            | Praticamente ilimitado |
| **Segurança**            | ❌ Menos seguro       | ✅ Mais seguro         |
| **Idempotente**          | ✅ Sim                | ❌ Não                 |
| **Bookmarkable**         | ✅ Sim                | ❌ Não                 |

### Exemplos Visuais

#### GET - Dados na URL

```
URL: https://site.com/busca?q=express&categoria=nodejs&page=2
                            └─────────────────┬─────────────────┘
                                        Query String
                                        (visível)

Browser:
┌────────────────────────────────────────┐
│ https://site.com/busca?q=express...    │ ← Aparece na barra
└────────────────────────────────────────┘
```

#### POST - Dados no Body

```
URL: https://site.com/login
     (limpa, sem dados)

Browser:
┌────────────────────────────────────────┐
│ https://site.com/login                 │ ← URL limpa
└────────────────────────────────────────┘

Body (invisível):
{
  "email": "usuario@email.com",
  "senha": "senhaSecreta123"
}
```

### Quando Usar Cada Um?

```
Use GET quando:
✅ Buscar/ler dados
✅ Filtros e pesquisas
✅ Paginação
✅ URLs compartilháveis
Exemplo: /produtos?categoria=eletronicos&preco_max=1000

Use POST quando:
✅ Criar novos recursos
✅ Enviar dados sensíveis (senhas)
✅ Upload de arquivos
✅ Dados grandes (>2KB)
Exemplo: Formulário de cadastro
```

---

## Requisições POST

### Como Funciona uma Requisição POST

```
1. Usuário preenche formulário
        ↓
2. Clica em "Enviar"
        ↓
3. Browser envia POST com dados no body
        ↓
4. Express recebe a requisição
        ↓
5. Body parser converte dados
        ↓
6. Rota POST processa os dados
        ↓
7. Servidor responde (geralmente com redirect)
```

### Estrutura Básica

```javascript
const express = require("express");
const app = express();

// ✅ IMPORTANTE: Configurar body parser
app.use(express.urlencoded({extended: true})); // Para formulários
app.use(express.json()); // Para JSON

// Rota GET - Mostrar formulário
app.get("/cadastro", (req, res) => {
  res.send(`
    <form method="POST" action="/cadastro">
      <input name="nome" placeholder="Nome" required>
      <input name="email" type="email" placeholder="Email" required>
      <button type="submit">Cadastrar</button>
    </form>
  `);
});

// Rota POST - Processar dados
app.post("/cadastro", (req, res) => {
  const {nome, email} = req.body;
  console.log("Dados recebidos:", {nome, email});
  res.send("Cadastro realizado!");
});

app.listen(3000);
```

---

## Body Parsers

### O que são Body Parsers?

**Body Parsers** são middlewares que convertem os dados brutos do body da requisição em formatos utilizáveis (objetos JavaScript).

### Tipos de Body Parsers

```javascript
const express = require("express");
const app = express();

// 1. URL-encoded (formulários HTML)
app.use(express.urlencoded({extended: true}));
// Converte: nome=João&email=joao@email.com
// Para: { nome: 'João', email: 'joao@email.com' }

// 2. JSON (APIs)
app.use(express.json());
// Converte: {"nome":"João","email":"joao@email.com"}
// Para: { nome: 'João', email: 'joao@email.com' }

// 3. Raw (dados brutos - raro)
app.use(express.raw());

// 4. Text (texto puro - raro)
app.use(express.text());
```

### Extended: true vs false

```javascript
// extended: false (querystring library)
// Suporta apenas: string=valor&numero=123

// extended: true (qs library) ✅ RECOMENDADO
// Suporta objetos e arrays aninhados:
// pessoa[nome]=João&pessoa[idade]=30
// → { pessoa: { nome: 'João', idade: '30' } }
```

### Sem Body Parser (Erro Comum!)

```javascript
// ❌ ERRO: Esqueceu de configurar body parser
app.post("/cadastro", (req, res) => {
  console.log(req.body); // undefined !!!
  res.send("Erro!");
});
```

**Resultado:** `req.body` será `undefined`!

### Com Body Parser (Correto!)

```javascript
// ✅ CORRETO: Configurou body parser
app.use(express.urlencoded({extended: true}));

app.post("/cadastro", (req, res) => {
  console.log(req.body); // { nome: 'João', email: 'joao@email.com' }
  res.send("Sucesso!");
});
```

---

## Formulários HTML

### Formulário Básico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Cadastro</title>
  </head>
  <body>
    <h1>Formulário de Cadastro</h1>

    <!-- 
    method="POST" → Usar método POST
    action="/cadastro" → Enviar para esta rota
  -->
    <form method="POST" action="/cadastro">
      <!-- Input de texto -->
      <label>Nome:</label>
      <input type="text" name="nome" required />
      <br /><br />

      <!-- Input de email -->
      <label>Email:</label>
      <input type="email" name="email" required />
      <br /><br />

      <!-- Input de senha -->
      <label>Senha:</label>
      <input type="password" name="senha" required minlength="6" />
      <br /><br />

      <!-- Select -->
      <label>País:</label>
      <select name="pais">
        <option value="BR">Brasil</option>
        <option value="US">Estados Unidos</option>
        <option value="PT">Portugal</option>
      </select>
      <br /><br />

      <!-- Checkbox -->
      <label>
        <input type="checkbox" name="aceita_termos" value="sim" />
        Aceito os termos
      </label>
      <br /><br />

      <!-- Radio buttons -->
      <label>Gênero:</label>
      <label><input type="radio" name="genero" value="M" /> Masculino</label>
      <label><input type="radio" name="genero" value="F" /> Feminino</label>
      <label><input type="radio" name="genero" value="O" /> Outro</label>
      <br /><br />

      <!-- Textarea -->
      <label>Mensagem:</label>
      <textarea name="mensagem" rows="4"></textarea>
      <br /><br />

      <!-- Submit button -->
      <button type="submit">Enviar</button>
    </form>
  </body>
</html>
```

### Atributos Importantes

```html
<!-- method: GET ou POST -->
<form method="POST">
  <!-- action: Para onde enviar -->
  <form action="/processar">
    <!-- enctype: Tipo de codificação -->
    <form enctype="application/x-www-form-urlencoded">
      <!-- Padrão -->
      <form enctype="multipart/form-data">
        <!-- Upload de arquivos -->
        <form enctype="text/plain">
          <!-- Texto puro (raro) -->

          <!-- name: Nome do campo (IMPORTANTE!) -->
          <input name="email" />
          <!-- req.body.email -->

          <!-- required: Campo obrigatório -->
          <input required />

          <!-- pattern: Validação regex -->
          <input pattern="[0-9]{5}-[0-9]{3}" />
          <!-- CEP -->

          <!-- minlength/maxlength -->
          <input minlength="3" maxlength="50" />

          <!-- min/max (números) -->
          <input type="number" min="0" max="100" />
        </form>
      </form>
    </form>
  </form>
</form>
```

---

## Recebendo Dados POST

### Exemplo Completo

**app.js:**

```javascript
const express = require("express");
const app = express();

// Configurar body parser
app.use(express.urlencoded({extended: true}));

// Servir formulário
app.get("/cadastro", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cadastro</title>
      <style>
        body { font-family: Arial; max-width: 500px; margin: 50px auto; }
        input, select, textarea { width: 100%; padding: 8px; margin: 5px 0; }
        button { background: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; }
        button:hover { background: #45a049; }
      </style>
    </head>
    <body>
      <h1>Cadastro de Usuário</h1>
      <form method="POST" action="/cadastro">
        <label>Nome:</label>
        <input type="text" name="nome" required>
        
        <label>Email:</label>
        <input type="email" name="email" required>
        
        <label>Idade:</label>
        <input type="number" name="idade" min="0" max="120">
        
        <label>Cidade:</label>
        <input type="text" name="cidade">
        
        <label>Interesses:</label>
        <label><input type="checkbox" name="interesses" value="tecnologia"> Tecnologia</label>
        <label><input type="checkbox" name="interesses" value="esportes"> Esportes</label>
        <label><input type="checkbox" name="interesses" value="musica"> Música</label>
        
        <label>Comentários:</label>
        <textarea name="comentarios" rows="4"></textarea>
        
        <br><br>
        <button type="submit">Cadastrar</button>
      </form>
    </body>
    </html>
  `);
});

// Processar dados
app.post("/cadastro", (req, res) => {
  console.log("Dados recebidos:", req.body);
  /*
  {
    nome: 'João Silva',
    email: 'joao@email.com',
    idade: '30',
    cidade: 'São Paulo',
    interesses: ['tecnologia', 'musica'], // Array se múltiplos checkboxes
    comentarios: 'Gostaria de receber novidades'
  }
  */

  const {nome, email, idade, cidade, interesses, comentarios} = req.body;

  // Fazer algo com os dados
  // (salvar no banco, enviar email, etc)

  res.send(`
    <h1>Cadastro Realizado!</h1>
    <p>Obrigado, ${nome}!</p>
    <p>Enviamos um email para ${email}</p>
    <a href="/cadastro">Cadastrar outro</a>
  `);
});

app.listen(3000, () => {
  console.log("Servidor em http://localhost:3000");
});
```

### Tipos de Dados Recebidos

```javascript
app.post("/teste", (req, res) => {
  // STRING
  console.log(req.body.nome); // 'João Silva'

  // NÚMERO (sempre vem como string!)
  console.log(req.body.idade); // '30' (string!)
  console.log(parseInt(req.body.idade)); // 30 (número)

  // CHECKBOX (único)
  console.log(req.body.aceita_termos); // 'sim' ou undefined

  // CHECKBOXES (múltiplos com mesmo name)
  console.log(req.body.interesses); // ['tecnologia', 'musica'] ou 'tecnologia' (se só um)

  // RADIO
  console.log(req.body.genero); // 'M', 'F' ou 'O'

  // SELECT
  console.log(req.body.pais); // 'BR'

  // TEXTAREA
  console.log(req.body.comentarios); // 'Texto longo...'
});
```

### Tratando Dados

```javascript
app.post("/cadastro", (req, res) => {
  // Converter tipos
  const idade = parseInt(req.body.idade) || 0;
  const preco = parseFloat(req.body.preco) || 0;

  // Normalizar strings
  const nome = req.body.nome.trim();
  const email = req.body.email.toLowerCase().trim();

  // Garantir array
  let interesses = req.body.interesses || [];
  if (!Array.isArray(interesses)) {
    interesses = [interesses];
  }

  // Booleano
  const aceitaTermos = req.body.aceita_termos === "sim";

  console.log({
    nome,
    email,
    idade,
    preco,
    interesses,
    aceitaTermos,
  });

  res.send("OK");
});
```

---

## Validação de Dados

### Validação Manual

```javascript
app.post("/cadastro", (req, res) => {
  const {nome, email, idade, senha} = req.body;
  const erros = [];

  // Validar nome
  if (!nome || nome.trim().length === 0) {
    erros.push("Nome é obrigatório");
  } else if (nome.length < 3) {
    erros.push("Nome deve ter pelo menos 3 caracteres");
  }

  // Validar email
  if (!email || !email.includes("@")) {
    erros.push("Email inválido");
  }

  // Validar idade
  const idadeNum = parseInt(idade);
  if (isNaN(idadeNum) || idadeNum < 0 || idadeNum > 120) {
    erros.push("Idade inválida");
  }

  // Validar senha
  if (!senha || senha.length < 6) {
    erros.push("Senha deve ter pelo menos 6 caracteres");
  }

  // Se houver erros
  if (erros.length > 0) {
    return res.status(400).send(`
      <h1>Erros no formulário:</h1>
      <ul>
        ${erros.map((erro) => `<li>${erro}</li>`).join("")}
      </ul>
      <a href="/cadastro">Voltar</a>
    `);
  }

  // Processar dados
  res.send("Cadastro realizado com sucesso!");
});
```

### Validação com Express-Validator

```bash
npm install express-validator
```

```javascript
const {body, validationResult} = require("express-validator");

app.post(
  "/cadastro",
  // Validações
  body("nome")
    .trim()
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({min: 3})
    .withMessage("Nome muito curto"),

  body("email").trim().normalizeEmail().isEmail().withMessage("Email inválido"),

  body("idade")
    .optional()
    .isInt({min: 0, max: 120})
    .withMessage("Idade inválida"),

  body("senha")
    .isLength({min: 6})
    .withMessage("Senha deve ter 6+ caracteres")
    .matches(/\d/)
    .withMessage("Senha deve conter número"),

  // Handler
  (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({erros: erros.array()});
    }

    // Processar dados válidos
    res.send("Cadastro realizado!");
  }
);
```

### Função Helper de Validação

```javascript
function validarCadastro(dados) {
  const erros = {};

  // Nome
  if (!dados.nome || dados.nome.trim().length < 3) {
    erros.nome = "Nome deve ter pelo menos 3 caracteres";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!dados.email || !emailRegex.test(dados.email)) {
    erros.email = "Email inválido";
  }

  // Idade
  const idade = parseInt(dados.idade);
  if (isNaN(idade) || idade < 0 || idade > 120) {
    erros.idade = "Idade deve estar entre 0 e 120";
  }

  // Senha
  if (!dados.senha || dados.senha.length < 6) {
    erros.senha = "Senha deve ter pelo menos 6 caracteres";
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
}

app.post("/cadastro", (req, res) => {
  const validacao = validarCadastro(req.body);

  if (!validacao.valido) {
    return res.status(400).json({
      sucesso: false,
      erros: validacao.erros,
    });
  }

  // Processar dados
  res.json({sucesso: true, mensagem: "Cadastro realizado!"});
});
```

---

## Redirecionamentos

### O que são Redirecionamentos?

**Redirecionamento** é quando o servidor diz ao browser para fazer uma nova requisição para outra URL.

### Sintaxe Básica

```javascript
// Redirecionamento simples (302 Found)
res.redirect("/outra-pagina");

// Com status code específico
res.redirect(301, "/nova-url"); // Permanente
res.redirect(302, "/temp-url"); // Temporário (padrão)
res.redirect(303, "/sucesso"); // See Other

// URL completa
res.redirect("https://www.google.com");

// Voltar para página anterior
res.redirect("back");
```

### Tipos de Redirecionamento

```javascript
// 301 - Moved Permanently
// Use quando a URL mudou para sempre
app.get("/antiga-rota", (req, res) => {
  res.redirect(301, "/nova-rota");
});

// 302 - Found (Temporário) - PADRÃO
// Use para redirecionamentos normais
app.get("/temp", (req, res) => {
  res.redirect("/outra"); // 302 por padrão
});

// 303 - See Other
// Use após POST (padrão PRG)
app.post("/criar", (req, res) => {
  // Criar recurso
  res.redirect(303, "/sucesso");
});

// 307 - Temporary Redirect
// Mantém o método HTTP (POST continua POST)
app.post("/processar", (req, res) => {
  res.redirect(307, "/outro-endpoint");
});
```

### Exemplos Práticos

```javascript
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

// Formulário de login
app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method="POST" action="/login">
      <input name="email" type="email" placeholder="Email" required>
      <input name="senha" type="password" placeholder="Senha" required>
      <button>Entrar</button>
    </form>
  `);
});

// Processar login
app.post("/login", (req, res) => {
  const {email, senha} = req.body;

  // Validar credenciais (exemplo simplificado)
  if (email === "admin@admin.com" && senha === "123456") {
    // Login bem-sucedido → redirecionar para dashboard
    res.redirect("/dashboard");
  } else {
    // Login falhou → voltar para login
    res.redirect("/login?erro=credenciais_invalidas");
  }
});

// Dashboard (protegido)
app.get("/dashboard", (req, res) => {
  res.send("<h1>Dashboard</h1><p>Bem-vindo!</p>");
});

// Logout
app.get("/logout", (req, res) => {
  // Limpar sessão
  res.redirect("/login");
});

app.listen(3000);
```

### Redirecionamento com Query String

```javascript
app.post("/cadastro", (req, res) => {
  const {nome} = req.body;

  // Redirecionar com parâmetros
  res.redirect(`/sucesso?nome=${encodeURIComponent(nome)}`);
});

app.get("/sucesso", (req, res) => {
  const nome = req.query.nome || "Usuário";
  res.send(`<h1>Sucesso!</h1><p>Obrigado, ${nome}!</p>`);
});
```

---

## Padrão PRG (Post-Redirect-Get)

### O que é PRG?

**Post-Redirect-Get** é um padrão de design web que evita reenvio duplicado de formulários.

### Problema sem PRG

```
Usuário:
1. Preenche formulário
2. Clica "Enviar" (POST)
3. Servidor processa e retorna página de sucesso
4. Usuário atualiza a página (F5)
5. ⚠️ Browser revia o POST (formulário duplicado!)

Resultado: Cadastro duplicado, pagamento duplicado, etc.
```

### Solução com PRG

```
Usuário:
1. Preenche formulário
2. Clica "Enviar" (POST)
3. Servidor processa
4. Servidor REDIRECIONA (303) para página de sucesso
5. Browser faz GET para página de sucesso
6. Usuário atualiza a página (F5)
7. ✅ Browser refaz apenas o GET (seguro!)

Resultado: Sem duplicação!
```

### Implementação

```javascript
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

let usuarios = [];

// ❌ SEM PRG - ERRADO
app.post("/cadastro-errado", (req, res) => {
  const usuario = req.body;
  usuarios.push(usuario);

  // Retorna HTML diretamente (RUIM!)
  res.send(`
    <h1>Cadastro realizado!</h1>
    <p>Usuário: ${usuario.nome}</p>
  `);
  // Se usuário apertar F5, duplica cadastro!
});

// ✅ COM PRG - CORRETO
app.post("/cadastro", (req, res) => {
  const usuario = req.body;
  usuarios.push(usuario);

  // Redireciona para GET (BOM!)
  res.redirect(303, `/sucesso?nome=${encodeURIComponent(usuario.nome)}`);
});

app.get("/sucesso", (req, res) => {
  const nome = req.query.nome;
  res.send(`
    <h1>Cadastro realizado!</h1>
    <p>Usuário: ${nome}</p>
    <p>Pode atualizar a página sem problemas!</p>
  `);
  // Se usuário apertar F5, apenas recarrega a página (seguro!)
});

app.listen(3000);
```

### PRG com Sessions (Melhor Prática)

```bash
npm install express-session
```

```javascript
const session = require("express-session");

app.use(
  session({
    secret: "meu-segredo",
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/cadastro", (req, res) => {
  const usuario = req.body;
  usuarios.push(usuario);

  // Salvar mensagem na sessão
  req.session.mensagem = `Usuário ${usuario.nome} cadastrado com sucesso!`;

  // Redirecionar
  res.redirect("/sucesso");
});

app.get("/sucesso", (req, res) => {
  const mensagem = req.session.mensagem;

  // Limpar mensagem (usar apenas uma vez)
  delete req.session.mensagem;

  res.send(`
    <h1>${mensagem || "Sucesso!"}</h1>
    <a href="/cadastro">Cadastrar outro</a>
  `);
});
```

---

## Upload de Arquivos

### Configurar Multer

```bash
npm install multer
```

### Upload Simples

```javascript
const express = require("express");
const multer = require("multer");
const app = express();

// Configurar Multer
const upload = multer({dest: "uploads/"});

// Formulário
app.get("/upload", (req, res) => {
  res.send(`
    <h1>Upload de Arquivo</h1>
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="arquivo" required>
      <button>Enviar</button>
    </form>
  `);
});

// Processar upload (arquivo único)
app.post("/upload", upload.single("arquivo"), (req, res) => {
  console.log("Arquivo:", req.file);
  /*
  {
    fieldname: 'arquivo',
    originalname: 'foto.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads/',
    filename: 'abc123.jpg',
    path: 'uploads/abc123.jpg',
    size: 45678
  }
  */

  res.send(`
    <h1>Arquivo enviado!</h1>
    <p>Nome: ${req.file.originalname}</p>
    <p>Tamanho: ${(req.file.size / 1024).toFixed(2)} KB</p>
    <a href="/upload">Enviar outro</a>
  `);
});

app.listen(3000);
```

### Upload com Configuração Personalizada

```javascript
const multer = require("multer");
const path = require("path");

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Nome único: timestamp + nome original
    const nomeUnico = Date.now() + "-" + file.originalname;
    cb(null, nomeUnico);
  },
});

// Filtro de tipos permitidos
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|gif/;
  const extname = tiposPermitidos.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = tiposPermitidos.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas!"));
  }
};

const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024}, // 5MB
  fileFilter: fileFilter,
});

// Usar
app.post("/upload", upload.single("imagem"), (req, res) => {
  res.send("Imagem enviada com sucesso!");
});
```

### Múltiplos Arquivos

```javascript
// Múltiplos arquivos (mesmo campo)
app.post("/upload-multi", upload.array("fotos", 5), (req, res) => {
  console.log("Arquivos:", req.files);
  // req.files é um array
  res.send(`${req.files.length} arquivos enviados!`);
});

// Múltiplos campos
const uploadCampos = upload.fields([
  {name: "avatar", maxCount: 1},
  {name: "documentos", maxCount: 5},
]);

app.post("/upload-campos", uploadCampos, (req, res) => {
  console.log("Avatar:", req.files["avatar"]);
  console.log("Documentos:", req.files["documentos"]);
  res.send("Arquivos enviados!");
});
```

---

## Flash Messages

### O que são Flash Messages?

**Flash Messages** são mensagens que aparecem uma única vez após redirecionamento.

### Instalar Connect-Flash

```bash
npm install express-session connect-flash
```

### Configuração

```javascript
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

app.use(express.urlencoded({extended: true}));

// Configurar sessão
app.use(
  session({
    secret: "meu-segredo",
    resave: false,
    saveUninitialized: false,
  })
);

// Configurar flash
app.use(flash());

// Middleware para disponibilizar flash nas views
app.use((req, res, next) => {
  res.locals.mensagens = req.flash();
  next();
});

app.set("view engine", "ejs");

app.listen(3000);
```

### Uso Básico

```javascript
// Definir mensagem flash
app.post("/cadastro", (req, res) => {
  // Processar cadastro

  // Definir mensagem de sucesso
  req.flash("sucesso", "Usuário cadastrado com sucesso!");

  // Redirecionar
  res.redirect("/dashboard");
});

// Mostrar mensagem
app.get("/dashboard", (req, res) => {
  const mensagens = req.flash("sucesso");
  res.render("dashboard", {mensagens});
});
```

### Template com Flash Messages

**views/layout.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Site</title>
    <style>
      .flash {
        padding: 15px;
        margin: 10px 0;
        border-radius: 4px;
      }
      .flash.sucesso {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
      .flash.erro {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
      .flash.aviso {
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
      }
    </style>
  </head>
  <body>
    <!-- Mostrar flash messages -->
    <% if (mensagens.sucesso) { %> <% mensagens.sucesso.forEach(msg => { %>
    <div class="flash sucesso"><%= msg %></div>
    <% }); %> <% } %> <% if (mensagens.erro) { %> <% mensagens.erro.forEach(msg
    => { %>
    <div class="flash erro"><%= msg %></div>
    <% }); %> <% } %> <% if (mensagens.aviso) { %> <%
    mensagens.aviso.forEach(msg => { %>
    <div class="flash aviso"><%= msg %></div>
    <% }); %> <% } %> <%- body %>
  </body>
</html>
```

### Tipos de Mensagens

```javascript
// Sucesso
req.flash("sucesso", "Operação realizada!");

// Erro
req.flash("erro", "Algo deu errado!");

// Aviso
req.flash("aviso", "Atenção: verifique seus dados");

// Info
req.flash("info", "Nova atualização disponível");

// Múltiplas mensagens
req.flash("sucesso", "Mensagem 1");
req.flash("sucesso", "Mensagem 2");
```

---

## Exemplos Práticos

### Exemplo 1: Sistema de Login Completo

```javascript
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(
  session({
    secret: "segredo-super-secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.set("view engine", "ejs");

// "Banco de dados" simulado
const usuarios = [
  {id: 1, email: "admin@admin.com", senha: "123456", nome: "Admin"},
];

// Middleware de autenticação
function auth(req, res, next) {
  if (req.session.usuarioId) {
    next();
  } else {
    req.flash("erro", "Você precisa fazer login primeiro");
    res.redirect("/login");
  }
}

// Página inicial
app.get("/", (req, res) => {
  res.render("home", {
    usuario: req.session.usuario,
    mensagens: {
      sucesso: req.flash("sucesso"),
      erro: req.flash("erro"),
    },
  });
});

// Formulário de login
app.get("/login", (req, res) => {
  if (req.session.usuarioId) {
    return res.redirect("/dashboard");
  }

  res.render("login", {
    mensagens: {
      erro: req.flash("erro"),
    },
  });
});

// Processar login
app.post("/login", (req, res) => {
  const {email, senha} = req.body;

  // Buscar usuário
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

  if (usuario) {
    // Login bem-sucedido
    req.session.usuarioId = usuario.id;
    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };

    req.flash("sucesso", `Bem-vindo, ${usuario.nome}!`);
    res.redirect("/dashboard");
  } else {
    // Login falhou
    req.flash("erro", "Email ou senha incorretos");
    res.redirect("/login");
  }
});

// Dashboard (protegido)
app.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    usuario: req.session.usuario,
    mensagens: {
      sucesso: req.flash("sucesso"),
    },
  });
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  req.flash("sucesso", "Logout realizado com sucesso");
  res.redirect("/");
});

// Formulário de cadastro
app.get("/cadastro", (req, res) => {
  res.render("cadastro", {
    mensagens: {
      erro: req.flash("erro"),
    },
  });
});

// Processar cadastro
app.post("/cadastro", (req, res) => {
  const {nome, email, senha, confirmarSenha} = req.body;

  // Validações
  if (!nome || !email || !senha) {
    req.flash("erro", "Todos os campos são obrigatórios");
    return res.redirect("/cadastro");
  }

  if (senha !== confirmarSenha) {
    req.flash("erro", "As senhas não coincidem");
    return res.redirect("/cadastro");
  }

  if (senha.length < 6) {
    req.flash("erro", "Senha deve ter pelo menos 6 caracteres");
    return res.redirect("/cadastro");
  }

  // Verificar se email já existe
  if (usuarios.find((u) => u.email === email)) {
    req.flash("erro", "Email já cadastrado");
    return res.redirect("/cadastro");
  }

  // Criar usuário
  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha,
  };

  usuarios.push(novoUsuario);

  req.flash("sucesso", "Cadastro realizado! Faça login para continuar");
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Servidor em http://localhost:3000");
});
```

**views/login.ejs:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Login</title>
    <style>
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
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 400px;
      }
      h1 {
        text-align: center;
        color: #333;
        margin-bottom: 30px;
      }
      .form-group {
        margin-bottom: 20px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        color: #666;
        font-weight: 500;
      }
      input {
        width: 100%;
        padding: 12px;
        border: 2px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        transition: border 0.3s;
      }
      input:focus {
        outline: none;
        border-color: #667eea;
      }
      button {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
      }
      button:hover {
        transform: translateY(-2px);
      }
      .alert {
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 5px;
      }
      .alert-erro {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
      .links {
        text-align: center;
        margin-top: 20px;
      }
      .links a {
        color: #667eea;
        text-decoration: none;
      }
      .links a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🔐 Login</h1>

      <% if (mensagens.erro && mensagens.erro.length > 0) { %> <%
      mensagens.erro.forEach(msg => { %>
      <div class="alert alert-erro"><%= msg %></div>
      <% }); %> <% } %>

      <form method="POST" action="/login">
        <div class="form-group">
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <div class="form-group">
          <label>Senha:</label>
          <input type="password" name="senha" required />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <div class="links">
        <p>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
        <p><a href="/">Voltar para home</a></p>
      </div>
    </div>
  </body>
</html>
```

### Exemplo 2: CRUD de Tarefas

```javascript
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

let tarefas = [
  {id: 1, titulo: "Estudar Express", concluida: false},
  {id: 2, titulo: "Fazer exercícios", concluida: false},
];
let proximoId = 3;

// Listar tarefas
app.get("/", (req, res) => {
  res.render("tarefas/index", {tarefas});
});

// Formulário de nova tarefa
app.get("/tarefas/nova", (req, res) => {
  res.render("tarefas/nova");
});

// Criar tarefa
app.post("/tarefas", (req, res) => {
  const novaTarefa = {
    id: proximoId++,
    titulo: req.body.titulo,
    concluida: false,
  };

  tarefas.push(novaTarefa);
  res.redirect("/");
});

// Marcar como concluída
app.post("/tarefas/:id/concluir", (req, res) => {
  const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
  }
  res.redirect("/");
});

// Deletar tarefa
app.post("/tarefas/:id/deletar", (req, res) => {
  tarefas = tarefas.filter((t) => t.id !== parseInt(req.params.id));
  res.redirect("/");
});

// Formulário de edição
app.get("/tarefas/:id/editar", (req, res) => {
  const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
  res.render("tarefas/editar", {tarefa});
});

// Atualizar tarefa
app.post("/tarefas/:id", (req, res) => {
  const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
  if (tarefa) {
    tarefa.titulo = req.body.titulo;
  }
  res.redirect("/");
});

app.listen(3000);
```

---

## Boas Práticas

### 1. Sempre Configure Body Parsers

```javascript
// ✅ SEMPRE no início
app.use(express.urlencoded({extended: true}));
app.use(express.json());
```

### 2. Use PRG (Post-Redirect-Get)

```javascript
// ✅ Sempre redirecione após POST
app.post("/criar", (req, res) => {
  // Processar
  res.redirect("/sucesso");
});

// ❌ Nunca retorne HTML direto após POST
app.post("/criar", (req, res) => {
  res.send("<h1>Criado!</h1>"); // RUIM!
});
```

### 3. Valide Todos os Dados

```javascript
// ✅ Sempre valide
app.post("/cadastro", (req, res) => {
  if (!req.body.email || !req.body.email.includes("@")) {
    return res.status(400).send("Email inválido");
  }
  // Processar
});
```

### 4. Sanitize Inputs

```javascript
// Remover espaços, converter para lowercase, etc
const email = req.body.email.trim().toLowerCase();
const nome = req.body.nome.trim();
```

### 5. Use HTTPS em Produção

```javascript
// Forçar HTTPS
app.use((req, res, next) => {
  if (req.protocol !== "https" && process.env.NODE_ENV === "production") {
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    next();
  }
});
```

### 6. Limite Tamanho do Body

```javascript
// Evitar ataques de payload grande
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
```

### 7. Use Flash Messages

```javascript
// Melhor UX
req.flash("sucesso", "Operação realizada!");
res.redirect("/dashboard");
```

### 8. Normalize Dados

```javascript
// ✅ Converter tipos
const idade = parseInt(req.body.idade) || 0;
const preco = parseFloat(req.body.preco) || 0;
const ativo = req.body.ativo === "true";
```

### 9. Trate Erros

```javascript
app.post("/criar", (req, res, next) => {
  try {
    // Processar
    res.redirect("/sucesso");
  } catch (erro) {
    next(erro);
  }
});
```

### 10. Use Status Codes Corretos

```javascript
// 201 - Created
res.status(201).json(novoUsuario);

// 400 - Bad Request
res.status(400).json({erro: "Dados inválidos"});

// 303 - See Other (PRG)
res.redirect(303, "/sucesso");
```

---

## 📊 Resumo

### POST vs GET

```
GET:  Buscar dados, visível na URL, cacheável
POST: Enviar dados, invisível, não-cacheável
```

### Body Parsers

```javascript
app.use(express.urlencoded({extended: true})); // Forms
app.use(express.json()); // JSON
```

### Redirecionamentos

```javascript
res.redirect("/rota"); // 302 (temporário)
res.redirect(301, "/permanente"); // 301 (permanente)
res.redirect(303, "/sucesso"); // 303 (após POST)
```

### Padrão PRG

```
POST → Processar → REDIRECT → GET → Mostrar
(evita reenvio duplicado)
```

---

## ✅ Checklist

- [ ] Configurar `express.urlencoded()` e `express.json()`
- [ ] Validar todos os dados recebidos
- [ ] Usar PRG após POST
- [ ] Sanitize inputs (trim, toLowerCase)
- [ ] Converter tipos (parseInt, parseFloat)
- [ ] Usar flash messages
- [ ] Tratar erros
- [ ] Limitar tamanho do body
- [ ] Usar status codes corretos
- [ ] Testar formulários em diferentes browsers

---

## 🎓 Conclusão

Requisições POST e redirecionamentos são fundamentais para criar aplicações web interativas. Com body parsers, você pode receber dados de formulários facilmente. O padrão PRG evita problemas de reenvio duplicado. Flash messages melhoram a UX mostrando feedback ao usuário.

**Próximos passos:**

- 🔐 Autenticação e sessões
- 📦 Banco de dados (MongoDB, PostgreSQL)
- ✅ Validação avançada (Joi, express-validator)
- 🔒 Segurança (Helmet, CSRF protection)
- 📤 Upload avançado de arquivos

Pratique criando formulários completos e você estará pronto para aplicações web reais! 🚀
