# 🌐 Aplicações Web com Node.js - Revisão: HTTP e Programação Web

Este repositório contém materiais de estudo, exemplos de código e anotações focadas na revisão dos fundamentos de aplicações web utilizando **Node.js**, com ênfase no protocolo **HTTP** e conceitos arquiteturais de programação web.

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [O Protocolo HTTP](#o-protocolo-http)
  - [Ciclo Requisição e Resposta](#ciclo-requisição-e-resposta)
  - [Verbos HTTP (Métodos)](#verbos-http-métodos)
  - [Códigos de Status](#códigos-de-status)
- [Node.js na Web](#nodejs-na-web)
- [Exemplo Prático (Express)](#exemplo-prático-express)
- [Como Executar](#como-executar)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## 🔍 Visão Geral

A programação web backend consiste, fundamentalmente, em receber requisições de clientes (browsers, apps mobile), processar dados e retornar respostas adequadas. O **Node.js** permite fazer isso utilizando JavaScript fora do navegador, tirando proveito de uma arquitetura orientada a eventos e não-bloqueante.

Este guia cobre:
1.  Como funciona a troca de mensagens na web.
2.  Estruturação de uma API REST simples.
3.  Manipulação de rotas e parâmetros.

---

## 📡 O Protocolo HTTP

O **HyperText Transfer Protocol** é a base da comunicação de dados na World Wide Web. É um protocolo *stateless* (sem estado), onde cada requisição é independente.

### Ciclo Requisição e Resposta

Todo fluxo segue este padrão:
1.  **Client (Cliente):** Envia uma `Request` (com método, URL, headers e body).
2.  **Server (Servidor):** Processa a lógica.
3.  **Server (Servidor):** Retorna uma `Response` (com status code, headers e body).

### Verbos HTTP (Métodos)

Os principais métodos utilizados em arquiteturas RESTful:

| Método | Descrição | Uso Comum |
| :--- | :--- | :--- |
| **GET** | Solicita representação de um recurso. | Buscar dados (leitura). |
| **POST** | Envia dados para serem processados. | Criar novos registros. |
| **PUT** | Substitui todas as atuais representações do recurso. | Atualização completa. |
| **PATCH** | Aplica modificações parciais a um recurso. | Atualização parcial. |
| **DELETE** | Remove um recurso específico. | Exclusão de dados. |

### Códigos de Status

A resposta do servidor sempre inclui um código de três dígitos:

* **2xx (Sucesso):** A requisição foi recebida e processada.
    * `200 OK`: Sucesso padrão.
    * `201 Created`: Recurso criado com sucesso.
* **4xx (Erro do Cliente):** A requisição contém sintaxe incorreta ou não pode ser processada.
    * `400 Bad Request`: Dados inválidos.
    * `401 Unauthorized`: Falta de autenticação.
    * `404 Not Found`: Rota ou recurso não encontrado.
* **5xx (Erro do Servidor):** O servidor falhou ao processar uma requisição válida.
    * `500 Internal Server Error`: Erro genérico no backend.

---

## 🟢 Node.js na Web

O Node.js utiliza o motor V8 do Google Chrome. Diferente de outras linguagens tradicionais de backend (como PHP ou Java antigo), ele opera em uma **Single Thread** com um **Event Loop**.

* **Vantagem:** Alta performance em I/O (Input/Output), perfeito para APIs em tempo real e microsserviços.
* **Ecossistema:** Utiliza o `npm` (Node Package Manager) para gerenciar bibliotecas.

Embora o Node possua um módulo nativo `http`, é comum utilizar frameworks como o **Express** para facilitar o roteamento e gerenciamento de middlewares.

---

## 💻 Exemplo Prático (Express)

Abaixo, um exemplo de servidor básico implementando as rotas de um CRUD.

### Estrutura do Código (`src/index.js`)

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Banco de dados em memória (Array)
const users = [];

// [GET] Listar usuários
app.get('/users', (req, res) => {
  return res.status(200).json(users);
});

// [POST] Criar usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  return res.status(201).json(newUser);
});

// [PUT] Atualizar usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id == id);

  if (userIndex < 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[userIndex] = { id: Number(id), name, email };

  return res.status(200).json(users[userIndex]);
});

// [DELETE] Deletar usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id == id);

  if (userIndex < 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);

  return res.status(204).send();
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});