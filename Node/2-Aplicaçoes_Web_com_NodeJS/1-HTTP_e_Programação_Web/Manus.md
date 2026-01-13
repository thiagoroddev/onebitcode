# Aplicações Web com NodeJS: Revisão de HTTP e Programação Web

Este documento serve como um material de revisão sobre os conceitos fundamentais de **HTTP** e da **programação web**, com foco em sua aplicação no ecossistema **NodeJS**. O objetivo é fornecer uma base sólida para desenvolvedores que estão iniciando ou aprimorando suas habilidades na construção de aplicações web robustas e eficientes.

## 1. O Protocolo HTTP: A Base da Comunicação Web

O **Protocolo de Transferência de Hipertexto (HTTP)** é o alicerce sobre o qual a World Wide Web foi construída. Ele opera como um protocolo de requisição-resposta no modelo cliente-servidor, onde o cliente (geralmente um navegador web) envia uma requisição a um servidor, que por sua vez processa a informação e retorna uma resposta. Compreender seu funcionamento é crucial para qualquer desenvolvedor web.

> O HTTP é um protocolo sem estado (stateless), o que significa que cada requisição é um evento independente e o servidor não retém informações sobre as requisições anteriores do mesmo cliente. Para gerenciar sessões de usuário, são utilizadas técnicas como Cookies e Tokens [1].

### 1.1. Métodos de Requisição (Verbos HTTP)

Os métodos HTTP definem a ação que o cliente deseja realizar no servidor. Embora existam vários, os mais comuns são:

| Método  | Descrição                                                                                             | Propriedades      |
| :------ | :---------------------------------------------------------------------------------------------------- | :---------------- |
| `GET`     | Solicita a representação de um recurso específico. É usado apenas para recuperar dados.                 | Seguro, Idempotente |
| `POST`    | Envia dados a um servidor para criar um novo recurso. Geralmente utilizado em formulários e uploads.     | Não Seguro        |
| `PUT`     | Substitui todas as representações atuais do recurso de destino pela carga de dados da requisição.     | Idempotente       |
| `DELETE`  | Remove um recurso específico.                                                                         | Idempotente       |
| `PATCH`   | Aplica modificações parciais a um recurso.                                                            | Não Idempotente   |

### 1.2. Códigos de Status de Resposta

Os códigos de status HTTP indicam se uma requisição foi concluída com sucesso ou não. Eles são agrupados em cinco classes:

- **1xx (Respostas de Informação):** A requisição foi recebida e o processo continua.
- **2xx (Respostas de Sucesso):** A requisição foi recebida, compreendida e aceita com sucesso (ex: `200 OK`, `201 Created`).
- **3xx (Redirecionamentos):** Ações adicionais são necessárias para completar a requisição (ex: `301 Moved Permanently`).
- **4xx (Erros do Cliente):** A requisição contém sintaxe incorreta ou não pode ser atendida (ex: `404 Not Found`, `400 Bad Request`).
- **5xx (Erros do Servidor):** O servidor falhou em atender a uma requisição aparentemente válida (ex: `500 Internal Server Error`).

## 2. NodeJS e o Módulo `http`

**NodeJS** é um ambiente de execução JavaScript do lado do servidor que permite a construção de aplicações de rede escaláveis. Uma de suas características mais poderosas é a sua arquitetura orientada a eventos e não-bloqueante (non-blocking I/O), ideal para lidar com múltiplas conexões simultâneas [2].

O módulo `http` nativo do NodeJS fornece as ferramentas essenciais para criar um servidor HTTP, permitindo que uma aplicação NodeJS escute requisições e envie respostas.

### 2.1. Criando um Servidor Básico

O código abaixo demonstra a criação de um servidor HTTP simples que responde "Olá, Mundo!" a qualquer requisição.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá, Mundo!\n');
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
```

Neste exemplo, o método `http.createServer()` cria uma nova instância de servidor. A função de callback passada para ele é executada a cada requisição recebida, recebendo os objetos `req` (requisição) e `res` (resposta) como argumentos.

## 3. Frameworks Web: Abstraindo a Complexidade

Embora seja possível construir aplicações web completas apenas com o módulo `http`, a tarefa pode se tornar complexa e repetitiva. Frameworks como **Express**, **Koa** e **Fastify** surgiram para abstrair essas complexidades, oferecendo funcionalidades como roteamento, gerenciamento de middleware e tratamento de erros de forma mais organizada e produtiva.

O **Express** é o framework mais popular e um excelente ponto de partida. Ele simplifica a criação de rotas e o gerenciamento de requisições e respostas, permitindo que o desenvolvedor foque na lógica de negócio da aplicação.

### Exemplo com Express

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Olá, Mundo com Express!');
});

app.listen(port, () => {
  console.log(`Exemplo de app escutando na porta ${port}`);
});
```

Este código, utilizando Express, atinge o mesmo objetivo do exemplo anterior, mas com uma sintaxe mais limpa e declarativa, demonstrando o poder e a simplicidade que os frameworks agregam ao desenvolvimento web com NodeJS.

---

## Referências

[1] Mozilla Developer Network. "HTTP cookies". Acessado em 10 de janeiro de 2026. [https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies)
[2] NodeJS Documentation. "About NodeJS". Acessado em 10 de janeiro de 2026. [https://nodejs.org/en/about](https://nodejs.org/en/about)
