# Renderizando Arquivos Estáticos HTML em Express Node.js

Este guia detalha como configurar e servir arquivos estáticos, como HTML, CSS, JavaScript e imagens, usando o framework web Express para Node.js.

## 1. Introdução

Express.js é um framework web minimalista e flexível para Node.js que fornece um conjunto robusto de recursos para desenvolver aplicações web e APIs. Uma das tarefas mais comuns em aplicações web é servir arquivos estáticos, que são arquivos que o cliente (navegador) pode baixar diretamente, como páginas HTML, folhas de estilo CSS, scripts JavaScript e imagens. O Express simplifica essa tarefa com o middleware `express.static()`.

## 2. Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

*   **Node.js**: Versão 14 ou superior.
*   **npm** (Node Package Manager): Geralmente vem junto com a instalação do Node.js.

## 3. Configuração do Projeto

### 3.1. Inicializar um Projeto Node.js

Primeiro, crie um novo diretório para o seu projeto e inicialize-o com npm:

```bash
mkdir meu-app-estatico
cd meu-app-estatico
npm init -y
```

O comando `npm init -y` cria um arquivo `package.json` com configurações padrão.

### 3.2. Instalar Express.js

Instale o Express.js como uma dependência do seu projeto:

```bash
npm install express
```

## 4. Servindo Arquivos Estáticos Básicos

Vamos criar uma estrutura de diretórios simples e um arquivo HTML para servir.

### 4.1. Estrutura de Diretórios

Crie um diretório chamado `public` na raiz do seu projeto. Este será o local onde seus arquivos estáticos serão armazenados.

```
meu-app-estatico/
├── node_modules/
├── package.json
├── package-lock.json
└── public/
    └── index.html
```

### 4.2. Criar `index.html`

Dentro do diretório `public`, crie um arquivo `index.html` com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu App Estático</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <h1>Bem-vindo ao Meu App Estático!</h1>
    <p>Este é um exemplo de arquivo HTML servido pelo Express.</p>
    <img src="/images/logo.png" alt="Logo">
    <script src="/js/main.js"></script>
</body>
</html>
```

Observe que os caminhos para `style.css`, `logo.png` e `main.js` são relativos à raiz do diretório estático que será configurado.

### 4.3. Criar `app.js` (ou `server.js`)

Na raiz do seu projeto, crie um arquivo `app.js` (ou `server.js`) com o seguinte código:

```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

Neste código:

*   `express.static(path.join(__dirname, 'public'))` é o middleware que serve arquivos estáticos. Ele recebe o caminho absoluto para o diretório que contém os arquivos estáticos.
*   `path.join(__dirname, 'public')` constrói o caminho absoluto para o diretório `public`, garantindo que funcione corretamente em diferentes sistemas operacionais.

## 5. Servindo Múltiplos Diretórios Estáticos

Você pode querer servir arquivos estáticos de múltiplos diretórios. Por exemplo, um para arquivos HTML e outro para assets (CSS, JS, imagens). Você pode chamar `express.static()` várias vezes:

```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve arquivos estáticos de uma pasta 'assets' (ex: para CSS, JS, imagens)
// Se houver um arquivo com o mesmo nome em 'public' e 'assets', o que estiver
// configurado primeiro será servido.
app.use(express.static(path.join(__dirname, 'assets')));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

## 6. Usando um Prefixo de Caminho Virtual

Às vezes, você pode querer servir arquivos estáticos sob um prefixo de caminho virtual, o que significa que o caminho no URL não corresponde diretamente ao caminho físico no sistema de arquivos. Por exemplo, para acessar arquivos na pasta `public` através de `/static` no URL:

```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Agora, os arquivos em 'public' serão acessíveis via /static/nome_do_arquivo
// Ex: http://localhost:3000/static/index.html
app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

Com esta configuração, se você tiver `index.html` dentro de `public`, ele será acessível em `http://localhost:3000/static/index.html`.

## 7. Estrutura de Projeto Sugerida

Para um projeto mais organizado, você pode seguir uma estrutura como esta:

```
meu-app-estatico/
├── node_modules/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── logo.png
│   ├── js/
│   │   └── main.js
│   └── index.html
├── app.js
├── package.json
└── package-lock.json
```

Para que os links no `index.html` funcionem com esta estrutura, você precisaria garantir que os caminhos no HTML correspondam à forma como o Express está servindo os arquivos. Se `public` for o diretório estático raiz, então `/css/style.css` funcionará.

## 8. Executando a Aplicação

Para iniciar seu servidor Express, execute o seguinte comando no terminal, na raiz do seu projeto:

```bash
node app.js
```

Você deverá ver a mensagem `Servidor rodando em http://localhost:3000`. Abra seu navegador e acesse `http://localhost:3000` (ou `http://localhost:3000/static/index.html` se você usou um prefixo de caminho virtual) para ver seu arquivo HTML sendo servido.

## 9. Conclusão

Servir arquivos estáticos com Express.js é um processo simples e eficiente, graças ao middleware `express.static()`. Ao organizar seus arquivos estáticos em diretórios dedicados e configurar o Express corretamente, você pode gerenciar facilmente os assets de sua aplicação web.
