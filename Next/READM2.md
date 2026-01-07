# Guia Aprofundado: Next.js para Desenvolvedores

Este guia vai além do básico e mergulha nos conceitos arquiteturais e decisões de design do Next.js, especialmente focando em **Server Actions**, **Route Handlers** e **quando usar (ou não) o backend do Next.js**.

## 📚 Índice

1. [Entendendo "Interno" vs "Externo" no Next.js](#1-entendendo-interno-vs-externo-no-nextjs)
2. [Contextos de Execução](#2-contextos-de-execução)
3. [Server Actions em Profundidade](#3-server-actions-em-profundidade)
4. [Route Handlers vs Server Actions](#4-route-handlers-vs-server-actions)
5. [Limitações do Backend Next.js](#5-limitações-do-backend-nextjs)
6. [Arquitetura para Projetos Grandes](#6-arquitetura-para-projetos-grandes)
7. [Quando Usar o Que](#7-quando-usar-o-que)

---

## 1. Entendendo "Interno" vs "Externo" no Next.js

### 🧠 A Confusão do Iniciante

Você aprendeu que sistemas web têm camadas separadas:

```
💻 Cliente (PC/celular) → 🌐 Servidor (backend) → 🗄️ Banco de dados
```

Aí chega o Next.js e parece que tudo é "interno":

```jsx
// Isso não parece "externo"...
import {db} from "./database";

export default async function Usuarios() {
  const usuarios = await db.query("SELECT * FROM usuarios");
  return <div>{/* renderizar */}</div>;
}
```

### 🔑 A Verdade: "Externo" não é "outro computador"

**Externo significa:**

- ❌ NÃO é: outro IP, outra máquina física
- ✅ É: algo que não roda no mesmo contexto do seu código
- ✅ É: algo que você só acessa via protocolo (HTTP, TCP, etc)

**Exemplos práticos:**

```jsx
// ❌ NÃO é externo (mesmo contexto)
import {db} from "./database";
const dados = await db.usuarios.findMany();

// ✅ É externo (outro contexto)
const dados = await fetch("https://api.externa.com/usuarios");
```

### 🧱 As Camadas Ainda Existem

Mesmo no Next.js, essas camadas continuam presentes:

```
[ Cliente ]  →  [ Servidor da aplicação ]  →  [ Banco de dados ]
               (Next.js Server)           (Postgres, MongoDB, etc)
```

**A diferença:** quem costura essas camadas. O Next.js automatiza a comunicação entre cliente e servidor, mas as camadas permanecem.

### 🔍 O Que é "Interno" no Next.js

| Componente       | É interno? | Por quê                         |
| ---------------- | ---------- | ------------------------------- |
| Server Action    | ✅         | Mesmo código, mesmo runtime     |
| Server Component | ✅         | Mesmo processo Node.js          |
| Import de DB     | ✅         | Biblioteca importada localmente |
| API Route        | ✅         | Seu servidor Next.js            |
| Banco de dados   | ❌         | Serviço externo gerenciado      |
| API de terceiros | ❌         | Fora do seu controle            |

---

## 2. Contextos de Execução

### 🧩 Os 3 Contextos Principais

#### 1️⃣ Cliente (Browser/App)

```jsx
"use client";

import {useState} from "react";

export default function Contador() {
  // Este código roda NO NAVEGADOR
  const [count, setCount] = useState(0);

  // ❌ Não pode acessar banco
  // ❌ Não pode ver variáveis de ambiente secretas
  // ✅ Só pode fazer requisições HTTP

  return <button onClick={() => setCount(count + 1)}>Cliques: {count}</button>;
}
```

**Características:**

- Roda JavaScript no navegador
- NÃO acessa banco de dados
- NÃO vê variáveis secretas (`.env`)
- Só comunica via HTTP
- Precisa de API (explícita ou implícita)

#### 2️⃣ Servidor da Aplicação (Next.js)

```jsx
// Este código roda NO SERVIDOR (Node.js)
import {db} from "@/lib/database";

export default async function Usuarios() {
  // ✅ Pode acessar banco diretamente
  // ✅ Pode usar secrets
  // ✅ Pode importar libs do servidor
  // ✅ Não envia este código ao cliente

  const usuarios = await db.usuarios.findMany();

  return (
    <ul>
      {usuarios.map((user) => (
        <li key={user.id}>{user.nome}</li>
      ))}
    </ul>
  );
}
```

**Características:**

- Roda em Node.js / Edge Runtime
- Acessa banco de dados
- Usa variáveis de ambiente secretas
- Importa bibliotecas do servidor
- Inclui: Server Components, Server Actions, API Routes

#### 3️⃣ Serviços Externos

```jsx
// Banco gerenciado (Postgres, MongoDB Atlas)
const usuario = await prisma.usuario.findUnique({ id: 1 })

// APIs de terceiros
const pagamento = await stripe.charges.create({ ... })

// Mesmo que estejam no mesmo datacenter, são externos
```

**Características:**

- Bancos gerenciados (Supabase, PlanetScale)
- APIs de terceiros (Stripe, Auth0, OpenAI)
- Serviços cloud (S3, Cloudinary)
- **Importante:** Mesmo no mesmo datacenter, ainda são contextos separados

### 🧪 Analogia do Restaurante

Pense num restaurante:

```
🧍 Cliente (você)
   ↓ faz pedido
🧑‍🍳 Cozinha (servidor Next.js)
   ↓ busca ingredientes
🧊 Fornecedor (banco de dados)
```

**Regras:**

- Cliente **nunca** entra na cozinha
- Cozinha fala direto com fornecedor
- Cliente só faz pedido e recebe prato

**Server Actions = pedido direto ao garçom**
Você não precisa escrever o "sistema de pedidos", mas o processo continua existindo.

---

## 3. Server Actions em Profundidade

### 🎯 O Que São Server Actions de Verdade

Server Actions são **funções do servidor expostas de forma segura ao cliente**, sem você precisar criar endpoints manualmente.

### 🔙 Antes das Server Actions

```jsx
// 1. Cliente (componente)
"use client";

export default function Formulario() {
  async function handleSubmit(e) {
    e.preventDefault();

    // 2. Faz requisição HTTP manual
    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nome: "João"}),
    });

    const data = await res.json();
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

```jsx
// 3. Servidor (API Route separada)
// app/api/usuarios/route.js

import {db} from "@/lib/database";

export async function POST(request) {
  const body = await request.json();

  // 4. Código do servidor executado aqui
  const usuario = await db.usuario.create({
    data: {nome: body.nome},
  });

  return Response.json(usuario);
}
```

**Quem executava o código do servidor?**
👉 A **API Route** (`/api/usuarios`)

**O que o componente fazia?**

- Mandava dados via HTTP
- Esperava resposta
- **Não sabia** quem executava
- **Não tinha acesso** à função real

### 🆕 Com Server Actions

```jsx
// 1. Definir a Server Action
// app/actions.js
"use server";

import {db} from "@/lib/database";

export async function criarUsuario(formData) {
  // Este código roda no servidor
  const nome = formData.get("nome");

  const usuario = await db.usuario.create({
    data: {nome},
  });

  return usuario;
}
```

```jsx
// 2. Usar no componente (pode ser Server ou Client Component)
import {criarUsuario} from "./actions";

export default function Formulario() {
  return (
    <form action={criarUsuario}>
      <input name="nome" required />
      <button type="submit">Criar</button>
    </form>
  );
}
```

**Quem executa o código do servidor agora?**
👉 A própria **Server Action**

**O que mudou:**

- ✅ Sem escrever `/api/...`
- ✅ Sem `fetch()` manual
- ✅ Sem JSON.stringify/parse
- ✅ Componente referencia a função diretamente

### 🧠 "Diretamente" - O Que Significa?

A frase **"executar código do servidor diretamente"** é marketing. Vamos traduzir:

**NÃO significa:**

- ❌ Execução na mesma thread
- ❌ Sem passar pela rede
- ❌ Cliente rodando código do servidor

**Significa:**

- ✅ Sem escrever API explícita
- ✅ Next.js cria o endpoint automaticamente
- ✅ Você importa a função como se fosse local

### 🔍 O Que Acontece Por Baixo dos Panos

```jsx
// Você escreve:
<form action={criarUsuario}>
```

```
O Next.js automaticamente:
1. Cria um endpoint HTTP escondido
2. Serializa os dados do form
3. Envia via POST
4. Executa a função no servidor
5. Retorna o resultado
6. Atualiza a UI
```

**A rede ainda existe. Você só não vê.**

### ⚖️ Comparação: API Route vs Server Action

| Aspecto                   | Sem Server Actions | Com Server Actions  |
| ------------------------- | ------------------ | ------------------- |
| **Quem executa**          | API Route          | Server Action       |
| **Quem dispara**          | Componente (fetch) | Componente (import) |
| **Quem escreve HTTP**     | Você               | Next.js             |
| **Quem conhece endpoint** | Você               | Ninguém             |
| **Importa a função**      | ❌ Não pode        | ✅ Pode             |
| **Boilerplate**           | Muito              | Mínimo              |

### 🚀 Server Actions Avançadas

#### Com Progressive Enhancement

```jsx
"use server";

import {revalidatePath} from "next/cache";

export async function criarTarefa(formData) {
  const titulo = formData.get("titulo");

  await db.tarefa.create({
    data: {titulo},
  });

  // Atualiza cache automaticamente
  revalidatePath("/tarefas");

  return {sucesso: true};
}
```

```jsx
"use client";

import {useFormStatus} from "react-dom";
import {criarTarefa} from "./actions";

function BotaoSubmit() {
  const {pending} = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Criando..." : "Criar Tarefa"}
    </button>
  );
}

export default function FormularioTarefa() {
  return (
    <form action={criarTarefa}>
      <input name="titulo" required />
      <BotaoSubmit />
    </form>
  );
}
```

#### Com Validação e Tratamento de Erros

```jsx
"use server";

import {z} from "zod";
import {revalidatePath} from "next/cache";

const schema = z.object({
  email: z.string().email(),
  nome: z.string().min(3),
});

export async function criarUsuario(formData) {
  // Validação
  const dados = schema.parse({
    email: formData.get("email"),
    nome: formData.get("nome"),
  });

  // Verificar duplicata
  const existe = await db.usuario.findUnique({
    where: {email: dados.email},
  });

  if (existe) {
    throw new Error("Email já cadastrado");
  }

  // Criar usuário
  const usuario = await db.usuario.create({
    data: dados,
  });

  revalidatePath("/usuarios");

  return {usuario};
}
```

```jsx
"use client";

import {useFormState} from "react-dom";
import {criarUsuario} from "./actions";

export default function Formulario() {
  const [state, formAction] = useFormState(criarUsuario, null);

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="nome" required />

      {state?.erro && <p className="erro">{state.erro}</p>}

      <button type="submit">Criar</button>
    </form>
  );
}
```

---

## 4. Route Handlers vs Server Actions

### 🧠 A Confusão

Se Server Actions "executam código do servidor diretamente", **para que existem Route Handlers (APIs)?**

### 🎯 A Resposta: Resolvem Problemas Diferentes

#### Server Actions = Comunicação Interna

```jsx
"use server";

export async function atualizarPerfil(formData) {
  // Esta função só pode ser chamada pelo seu app Next.js
  const userId = await getSession();

  await db.usuario.update({
    where: {id: userId},
    data: {
      nome: formData.get("nome"),
    },
  });
}
```

**Características:**

- Privada (só seu app Next.js pode chamar)
- Sem URL fixa
- Não aceita qualquer cliente
- Pensada para mutações internas

#### Route Handlers = Contrato Externo

```jsx
// app/api/webhooks/stripe/route.js

import {headers} from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  // Pode ser chamada por qualquer cliente com a URL
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  // Processar evento...

  return Response.json({received: true});
}
```

**Características:**

- Pública (qualquer cliente HTTP pode chamar)
- URL fixa e documentável
- Aceita autenticação customizada
- Pensada para integrações

### 🔄 Quando Usar Cada Um

#### Use **Server Actions** para:

```jsx
// ✅ Formulários da sua aplicação
<form action={criarPost}>

// ✅ Botões que fazem mutações
<button onClick={() => deletarItem(id)}>

// ✅ Lógica interna do app
export async function marcarComoLido(notificacaoId) {
  await db.notificacao.update(...)
}
```

#### Use **Route Handlers** para:

```jsx
// ✅ Webhooks de terceiros
// app/api/webhooks/github/route.js
export async function POST(req) { ... }

// ✅ API consumida por app mobile
// app/api/posts/route.js
export async function GET(req) { ... }

// ✅ Integrações com parceiros
// app/api/public/dados/route.js
export async function GET(req) { ... }

// ✅ OAuth callbacks
// app/api/auth/callback/route.js
export async function GET(req) { ... }
```

### 🧩 Convivência no Mesmo Projeto

**Arquitetura realista:**

```
Seu Projeto Next.js
├── Server Actions
│   └── Usadas pelo frontend Next.js
│       - Formulários
│       - Botões
│       - Mutações internas
│
└── Route Handlers
    └── APIs públicas
        - App mobile consome
        - Webhooks recebem
        - Integrações externas
```

**Exemplo prático:**

```jsx
// lib/usuarios.js (lógica compartilhada)
export async function criarUsuarioNoBanco(dados) {
  return await db.usuario.create({data: dados});
}
```

```jsx
// app/actions.js (Server Action)
"use server";
import {criarUsuarioNoBanco} from "@/lib/usuarios";

export async function registrar(formData) {
  const dados = {
    nome: formData.get("nome"),
    email: formData.get("email"),
  };

  return await criarUsuarioNoBanco(dados);
}
```

```jsx
// app/api/users/route.js (Route Handler)
import {criarUsuarioNoBanco} from "@/lib/usuarios";

export async function POST(req) {
  const dados = await req.json();

  // Mesma lógica, entrada diferente
  const usuario = await criarUsuarioNoBanco(dados);

  return Response.json(usuario);
}
```

### ⚖️ Comparação Completa

| Característica    | Server Actions         | Route Handlers              |
| ----------------- | ---------------------- | --------------------------- |
| **Quem chama**    | Seu app Next.js        | Qualquer cliente HTTP       |
| **Exposição**     | Privada                | Pública                     |
| **Forma**         | Função importável      | Endpoint HTTP               |
| **URL**           | Gerada automaticamente | Definida por você           |
| **Uso principal** | Mutações internas      | Integrações externas        |
| **Versionamento** | ❌ Não aplicável       | ✅ Versionável (`/api/v1/`) |
| **Documentação**  | ❌ Não necessária      | ✅ OpenAPI, Swagger         |
| **CORS**          | ❌ Não aplicável       | ✅ Configurável             |
| **Rate limiting** | ❌ Não comum           | ✅ Recomendado              |
| **Autenticação**  | Session implícita      | Token, API Key, etc         |
| **Boilerplate**   | Mínimo                 | Médio                       |

---

## 5. Limitações do Backend Next.js

### 🧠 O Mito: "Next.js só serve para projetos simples"

Isso é **meia verdade**. Vamos desmistificar.

### ✅ O Que o Backend Next.js CONSEGUE Fazer

Com Server Actions, Route Handlers e Server Components:

```jsx
// ✅ CRUD completo
export async function criarProduto(dados) { ... }
export async function listarProdutos() { ... }
export async function atualizarProduto(id, dados) { ... }
export async function deletarProduto(id) { ... }

// ✅ Regras de negócio complexas
export async function processarPedido(pedidoId) {
  const pedido = await db.pedido.findUnique(...)

  // Validações complexas
  if (pedido.valor < 100) throw new Error(...)

  // Múltiplas operações
  await db.$transaction([
    db.estoque.update(...),
    db.pedido.update(...),
    db.notificacao.create(...)
  ])

  // Chamar serviço externo
  await enviarEmail(...)
}

// ✅ Autenticação robusta
import { auth } from '@/lib/auth'

export async function areaProtegida() {
  const session = await auth()
  if (!session) throw new Error('Não autorizado')
  ...
}

// ✅ Dashboards complexos
export async function getDashboardData() {
  const [vendas, usuarios, produtos] = await Promise.all([
    db.venda.aggregate(...),
    db.usuario.count(),
    db.produto.findMany(...)
  ])

  return { vendas, usuarios, produtos }
}
```

**Projetos que o Next.js aguenta:**

- ✅ SaaS pequeno/médio
- ✅ Dashboards corporativos
- ✅ E-commerce
- ✅ Plataformas de conteúdo
- ✅ Sistemas internos

### ❌ Limitações Reais (Não São Técnicas)

#### 1️⃣ Acoplamento Frontend ↔ Backend

```
Next.js = Frontend + Backend juntos
├── Deploy é junto
├── Versionamento é junto
└── Mudanças afetam ambos
```

**Problema em times grandes:**

- Time A muda backend → pode quebrar frontend
- Deploy precisa ser sincronizado
- Rollback afeta ambos

**Solução tradicional:**

```
Frontend (Time A)  →  Backend (Time B)
Deploy independente    Deploy independente
```

#### 2️⃣ Múltiplos Consumidores

**Cenário real:**

```
Você tem:
- Web app (Next.js)
- App mobile (React Native)
- App de parceiros
- Integrações (webhooks)
```

**Problema:**

- Server Actions não servem para mobile
- Route Handlers funcionam, mas:
  - Não são pensados para API corporativa
  - Versionamento vira gambiarra
  - Documentação fica fraca
  - Contratos soltos

**Arquitetura melhor:**

```
Web (Next.js) ──┐
Mobile ─────────┼──→ API Backend (NestJS/Express/etc)
Parceiros ──────┘
```

#### 3️⃣ Domínio Complexo (DDD)

**Sistemas grandes precisam de:**

```typescript
// Agregados
class Pedido {
  private itens: ItemPedido[];

  adicionarItem(item: ItemPedido) {
    // Regras de domínio
    if (this.itens.length >= 10) {
      throw new DomainError("Limite de itens");
    }
  }
}

// Eventos de domínio
class PedidoCriadoEvent {
  constructor(public pedidoId: string) {}
}

// Casos de uso
class CriarPedidoUseCase {
  execute(dados: CriarPedidoDTO) {
    // Orquestração complexa
  }
}
```

**Next.js:**

- ❌ Não impede isso
- ❌ Mas não incentiva
- ❌ Não organiza automaticamente
- ❌ Não protege a arquitetura

**Frameworks backend especializados:**

- ✅ NestJS (módulos, injeção de dependência)
- ✅ Spring Boot (camadas bem definidas)
- ✅ .NET (separação clara)

#### 4️⃣ Observabilidade e Controle

**Em produção, você precisa:**

```typescript
// Logs estruturados
logger.info('Pedido criado', {
  pedidoId,
  userId,
  valor,
  timestamp
})

// Tracing distribuído
span.setTag('pedido.id', pedidoId)

// Métricas
metrics.increment('pedidos.criados')

// Retry e circuit breaker
@Retry({ maxAttempts: 3 })
@CircuitBreaker({ threshold: 5 })
async function pagarComStripe() { ... }
```

**Next.js:**

- Até permite (com libs externas)
- Mas não nasce pensado nisso
- Você começa a "forçar" o framework

**Backend dedicado:**

- Ferramentas nativas
- Ecossistema maduro
- Padrões estabelecidos

#### 5️⃣ Escala de Deploy

**Projetos grandes precisam:**

```
API v1 (50% tráfego)  ──┐
API v2 (50% tráfego)  ──┼──→ Load Balancer
                        │
Frontend antigo ────────┤
Frontend novo ──────────┘
```

- Deploy separado por componente
- Rollback independente
- Múltiplas versões simultâneas
- Compatibilidade retroativa

**Next.js:**

- É um bundle monolítico
- Deploy atômico (tudo junto)
- Rollback afeta frontend e backend

### 🎯 Então Qual É o Limite Real?

| Cenário            | Next.js Backend Suficiente? | Por quê                      |
| ------------------ | --------------------------- | ---------------------------- |
| Startup / MVP      | ✅ Sim                      | Velocidade é prioridade      |
| SaaS pequeno/médio | ✅ Sim                      | Um time, um produto          |
| Dashboard interno  | ✅ Sim                      | Usuários controlados         |
| Produto único      | ✅ Sim                      | Frontend + backend acoplados |
| Múltiplos apps     | ❌ Não                      | Precisa API centralizada     |
| Domínio complexo   | ❌ Não                      | Precisa arquitetura DDD      |
| Times grandes (5+) | ❌ Não                      | Precisa independência        |
| API pública        | ❌ Não                      | Precisa contrato sólido      |

---

## 6. Arquitetura para Projetos Grandes

### 🏗️ Padrão 1: Next.js como BFF (Backend For Frontend)

**BFF = Backend For Frontend**

```
┌─────────────────────────────────────────┐
│         Frontend Next.js                │
│  ┌──────────────────────────────────┐   │
│  │    Server Actions / Components   │   │
│  │  (BFF - Backend For Frontend)    │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                  ↓ HTTP
┌─────────────────────────────────────────┐
│         Core Backend (NestJS/Java)      │
│  ┌──────────────────────────────────┐   │
│  │   Regras de negócio              │   │
│  │   Domínio complexo               │   │
│  │   Múltiplos consumidores         │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│            Banco de Dados               │
└─────────────────────────────────────────┘
```

**Código exemplo:**

```jsx
// app/produtos/page.jsx (Frontend Next.js)
import {getProdutos} from "./actions";

export default async function ProdutosPage() {
  const produtos = await getProdutos();
  return <ProdutosList produtos={produtos} />;
}
```

```jsx
// app/produtos/actions.js (BFF no Next.js)
"use server";

export async function getProdutos() {
  // Next.js chama o Core Backend
  const res = await fetch("https://api.empresa.com/produtos", {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const produtos = await res.json();

  // Transforma dados para o frontend
  return produtos.map((p) => ({
    id: p.id,
    nome: p.name, // traduz campo
    preco: p.price / 100, // converte centavos
  }));
}
```

**Vantagens:**

- ✅ Next.js fica leve (só adapta dados)
- ✅ Core Backend independente
- ✅ Mobile pode usar Core Backend direto
- ✅ Times trabalham independentes

### 🏗️ Padrão 2: Microsserviços

```
┌──────────────────┐
│  Frontend Next   │
└──────────────────┘
         ↓
┌──────────────────┐
│   API Gateway    │
└──────────────────┘
    ↓    ↓    ↓
┌────┐ ┌────┐ ┌────┐
│Auth│ │User│ │Prod│  (Serviços)
└────┘ └────┘ └────┘
    ↓    ↓    ↓
┌────────────────────┐
│  Bancos Separados  │
└────────────────────┘
```

**Quando usar:**

- Times muito grandes (10+)
- Domínios totalmente independentes
- Escala diferenciada por serviço

### 🏗️ Padrão 3: Híbrido (Recomendado)

```
┌─────────────────────────────────────┐
│       Frontend Next.js              │
│                                     │
│  Server Actions para:               │
│  - Formulários simples              │
│  - Cache de dados                   │
│  - Renderização                     │
└─────────────────────────────────────┘
         ↓ (algumas calls)
┌─────────────────────────────────────┐
│     Backend Principal (NestJS)      │
│                                     │
│  - Regras de negócio críticas       │
│  - Lógica compartilhada             │
│  - Eventos e filas                  │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         Banco de Dados              │
└─────────────────────────────────────┘
```

**Decisão por funcionalidade:**

| Funcionalidade        | Onde Implementar         |
| --------------------- | ------------------------ |
| Buscar lista de posts | Server Component Next.js |
| Criar post simples    | Server Action Next.js    |
| Processar pagamento   | Backend (NestJS)         |
| Enviar email          | Backend (fila)           |
| Autenticação          | Backend                  |
| Filtrar dados pra UI  | Server Action Next.js    |
| Analytics complexo    | Backend                  |
| Upload de imagem      | Server Action → S3       |

---

## 7. Quando Usar o Que

### 🎯 Guia de Decisão Rápida

#### Use **Server Components** quando:

```jsx
// ✅ Buscar dados sem interatividade
export default async function BlogPosts() {
  const posts = await fetch('...')
  return <PostsList posts={posts} />
}

// ✅ Dados que mudam pouco
export default async function SobrePage() {
  const dados = await db.sobre.findFirst()
  return <div>{dados.texto}</div>
}
```

#### Use **Client Components** quando:

```jsx
'use client'

// ✅ Precisa de estado
const [aberto, setAberto] = useState(false)

// ✅ Precisa de eventos
<button onClick={() => setAberto(true)}>

// ✅ Precisa de hooks
useEffect(() => { ... })

// ✅ APIs do navegador
localStorage.getItem('tema')
```

#### Use **Server Actions** quando:

```jsx
'use server'

// ✅ Mutações de dados (criar, atualizar, deletar)
export async function criarPost(formData) { ... }

// ✅ Operações que precisam de segredos
export async function enviarEmail(para) {
  await mailgun.send({
    apiKey: process.env.MAILGUN_KEY, // segredo
    to: para
  })
}

// ✅ Lógica de negócio interna
export async function calcularFrete(cep) { ... }
```

#### Use **Route Handlers** quando:

```jsx
// ✅ Webhooks
export async function POST(req) {
  // Stripe, GitHub, etc chamam você
}

// ✅ API para app mobile
export async function GET(req) {
  return Response.json({ ... })
}

// ✅ CORS precisa ser configurado
export async function OPTIONS(req) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}

// ✅ OAuth callbacks
export async function GET(req) {
  const code = req.nextUrl.searchParams.get('code')
  // trocar code por token
}
```

#### Use **Backend Separado** quando:

```typescript
// ✅ Múltiplos clientes (web + mobile + parceiros)
@Controller('produtos')
export class ProdutosController {
  @Get()
  findAll() { ... }
}

// ✅ Domínio complexo (DDD)
class PedidoAggregate {
  private eventos: DomainEvent[]

  criarPedido(dados: CriarPedidoDTO) {
    // lógica complexa
    this.eventos.push(new PedidoCriadoEvent())
  }
}

// ✅ Times grandes e independentes
// Time A: Frontend
// Time B: Backend Auth
// Time C: Backend Produtos

// ✅ Escala e deploy independente
// Frontend: deploy 10x/dia
// Backend: deploy 2x/semana
```

### 🧠 Perguntas para Fazer

**Antes de implementar qualquer funcionalidade:**

1. **Quem vai consumir isso?**

   - Só meu frontend Next → Server Action
   - Mobile também → Route Handler ou Backend

2. **Precisa de segredos?**

   - Sim → Server Action ou Backend
   - Não → pode ser Client

3. **É lógica de negócio crítica?**

   - Sim e complexa → Backend separado
   - Sim mas simples → Server Action
   - Não → Client Component

4. **Vai ser chamado por terceiros?**

   - Sim → Route Handler com auth
   - Não → Server Action

5. **Precisa de observabilidade avançada?**
   - Sim → Backend com APM
   - Não → Next.js serve

---

## 🎓 Conclusão

### O Next.js Não Elimina Arquitetura

Ele **encurta o caminho mental** para funcionalidades comuns, mas não substitui decisões arquiteturais em sistemas complexos.

### Mentalidade de Engenheiro vs Programador

**Programador pensa:**

- "Preciso criar uma API?"

**Engenheiro pensa:**

- "Onde esse código deve rodar?"
- "Quem vai consumir isso?"
- "Como isso escala?"
- "Qual o custo de manutenção?"

### Regra de Ouro

> **Não pense em "interno vs externo".** > **Pense em "contexto de execução".**

Quando você domina isso, framework nenhum te confunde mais.

---

## 📚 Recursos Adicionais

- [Documentação oficial Next.js](https://nextjs.org/docs)
- [Padrões de arquitetura Next.js](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Quando usar Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Domain-Driven Design (DDD)](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Padrão BFF](https://samnewman.io/patterns/architectural/bff/)

---

**Criado para desenvolvedores que querem ir além do tutorial básico 🚀**
