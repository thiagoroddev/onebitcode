# Guia Introdutório: Next.js para Iniciantes

Bem-vindo ao guia completo de Next.js! Este documento foi criado para ajudar iniciantes a entenderem os conceitos fundamentais do framework React mais popular para desenvolvimento web.

## 📚 Índice

1. [Como trabalhar com imagens e fontes](#1-como-trabalhar-com-imagens-e-fontes)
2. [Como utilizar o App Router](#2-como-utilizar-o-app-router)
3. [React Server Components](#3-react-server-components)
4. [Sistema de layout](#4-sistema-de-layout)
5. [Como construir APIs com os Route Handlers](#5-como-construir-apis-com-os-route-handlers)
6. [Server Actions](#6-server-actions)
7. [Tratamento de erro](#7-tratamento-de-erro)
8. [Estados de carregamento](#8-estados-de-carregamento)
9. [Deploy na Vercel](#9-deploy-na-vercel)

---

## 1. Como trabalhar com imagens e fontes

### Imagens no Next.js

O Next.js oferece o componente `Image` que otimiza automaticamente suas imagens:

```jsx
import Image from "next/image";

export default function Pagina() {
  return (
    <Image
      src="/caminho/para/imagem.jpg"
      alt="Descrição da imagem"
      width={500}
      height={300}
      priority // Carrega a imagem com prioridade
    />
  );
}
```

**Benefícios:**

- Otimização automática de tamanho
- Lazy loading por padrão
- Prevenção de Layout Shift
- Suporte a formatos modernos (WebP, AVIF)

### Fontes no Next.js

Use o módulo `next/font` para carregar fontes do Google ou locais:

```jsx
import {Inter, Roboto} from "next/font/google";

const inter = Inter({subsets: ["latin"]});
const roboto = Roboto({weight: "400", subsets: ["latin"]});

export default function Layout({children}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Vantagens:**

- Zero layout shift
- Carregamento otimizado
- Sem requisições externas (auto-hospedagem)

---

## 2. Como utilizar o App Router

O App Router é a nova forma de criar rotas no Next.js (versão 13+).

### Estrutura de pastas

```
app/
├── page.js          # Página inicial (/)
├── about/
│   └── page.js      # /about
├── blog/
│   ├── page.js      # /blog
│   └── [slug]/
│       └── page.js  # /blog/meu-post
└── layout.js        # Layout compartilhado
```

### Exemplo de página

```jsx
// app/about/page.js
export default function About() {
  return (
    <main>
      <h1>Sobre Nós</h1>
      <p>Bem-vindo à página sobre!</p>
    </main>
  );
}
```

### Rotas dinâmicas

```jsx
// app/blog/[slug]/page.js
export default function BlogPost({params}) {
  return <h1>Post: {params.slug}</h1>;
}
```

---

## 3. React Server Components

Os Server Components são componentes que rodam no servidor, reduzindo o JavaScript enviado ao cliente.

### Server Component (padrão)

```jsx
// app/usuarios/page.js
async function Usuarios() {
  const res = await fetch("https://api.exemplo.com/usuarios");
  const usuarios = await res.json();

  return (
    <ul>
      {usuarios.map((user) => (
        <li key={user.id}>{user.nome}</li>
      ))}
    </ul>
  );
}
```

### Client Component

Use quando precisar de interatividade:

```jsx
"use client"; // Diretiva obrigatória

import {useState} from "react";

export default function Contador() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Cliques: {count}</button>;
}
```

**Quando usar cada um:**

| Server Components              | Client Components                  |
| ------------------------------ | ---------------------------------- |
| Buscar dados                   | Interatividade (onClick, onChange) |
| Acessar backend                | Hooks (useState, useEffect)        |
| Proteger informações sensíveis | APIs do navegador                  |
| Reduzir bundle JS              | Event listeners                    |

---

## 4. Sistema de layout

Layouts permitem compartilhar UI entre múltiplas páginas.

### Layout raiz

```jsx
// app/layout.js
export const metadata = {
  title: "Meu App",
  description: "Descrição do meu aplicativo",
};

export default function RootLayout({children}) {
  return (
    <html lang="pt-BR">
      <body>
        <nav>Menu de navegação</nav>
        {children}
        <footer>Rodapé</footer>
      </body>
    </html>
  );
}
```

### Layout aninhado

```jsx
// app/dashboard/layout.js
export default function DashboardLayout({children}) {
  return (
    <div>
      <aside>Sidebar do Dashboard</aside>
      <main>{children}</main>
    </div>
  );
}
```

**Características:**

- Layouts não re-renderizam na navegação
- Podem ser aninhados
- Compartilham estado entre páginas

---

## 5. Como construir APIs com os Route Handlers

Route Handlers permitem criar endpoints de API personalizados.

### Criando uma API

```jsx
// app/api/usuarios/route.js
export async function GET(request) {
  const usuarios = [
    {id: 1, nome: "João"},
    {id: 2, nome: "Maria"},
  ];

  return Response.json(usuarios);
}

export async function POST(request) {
  const body = await request.json();

  // Processar dados

  return Response.json(
    {
      mensagem: "Usuário criado com sucesso",
      dados: body,
    },
    {status: 201}
  );
}
```

### Rotas dinâmicas

```jsx
// app/api/usuarios/[id]/route.js
export async function GET(request, {params}) {
  const usuario = await buscarUsuario(params.id);

  if (!usuario) {
    return Response.json({erro: "Usuário não encontrado"}, {status: 404});
  }

  return Response.json(usuario);
}
```

---

## 6. Server Actions

Server Actions permitem executar código do servidor diretamente de componentes.

### Criando uma Server Action

```jsx
// app/actions.js
"use server";

export async function criarTarefa(formData) {
  const titulo = formData.get("titulo");

  // Salvar no banco de dados
  await db.tarefas.create({titulo});

  revalidatePath("/tarefas");
}
```

### Usando em um componente

```jsx
// app/tarefas/page.js
import {criarTarefa} from "./actions";

export default function Tarefas() {
  return (
    <form action={criarTarefa}>
      <input name="titulo" required />
      <button type="submit">Adicionar</button>
    </form>
  );
}
```

### Com Client Components

```jsx
"use client";

import {criarTarefa} from "./actions";

export default function FormularioTarefa() {
  return (
    <form action={criarTarefa}>
      <input name="titulo" required />
      <button type="submit">Criar</button>
    </form>
  );
}
```

**Vantagens:**

- Sem necessidade de criar APIs separadas
- Tipagem automática com TypeScript
- Segurança integrada

---

## 7. Tratamento de erro

O Next.js oferece formas padronizadas de tratar erros.

### Página de erro personalizada

```jsx
// app/error.js
"use client";

export default function Error({error, reset}) {
  return (
    <div>
      <h2>Algo deu errado!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Tentar novamente</button>
    </div>
  );
}
```

### Erro 404 personalizado

```jsx
// app/not-found.js
export default function NotFound() {
  return (
    <div>
      <h2>Página não encontrada</h2>
      <p>A página que você procura não existe.</p>
    </div>
  );
}
```

### Tratamento em componentes

```jsx
// app/usuarios/error.js
"use client";

export default function UsuariosError({error}) {
  return (
    <div>
      <h2>Erro ao carregar usuários</h2>
      <p>{error.message}</p>
    </div>
  );
}
```

---

## 8. Estados de carregamento

Mostre feedback visual enquanto dados são carregados.

### Loading UI

```jsx
// app/loading.js
export default function Loading() {
  return (
    <div className="spinner">
      <p>Carregando...</p>
    </div>
  );
}
```

### Streaming com Suspense

```jsx
import {Suspense} from "react";

async function ListaProdutos() {
  const produtos = await fetch("...");
  return <div>{/* Renderizar produtos */}</div>;
}

export default function Loja() {
  return (
    <div>
      <h1>Nossa Loja</h1>
      <Suspense fallback={<p>Carregando produtos...</p>}>
        <ListaProdutos />
      </Suspense>
    </div>
  );
}
```

### Loading em rotas específicas

```jsx
// app/blog/loading.js
export default function BlogLoading() {
  return (
    <div>
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}
```

---

## 9. Deploy na Vercel

A Vercel é a plataforma ideal para hospedar aplicações Next.js.

### Passo a passo

1. **Instale a Vercel CLI**

```bash
npm i -g vercel
```

2. **Faça login**

```bash
vercel login
```

3. **Deploy o projeto**

```bash
vercel
```

### Deploy via GitHub

1. Conecte seu repositório na [Vercel](https://vercel.com)
2. Selecione o projeto
3. Configure variáveis de ambiente (se necessário)
4. Clique em "Deploy"

**Recursos automáticos:**

- HTTPS automático
- Preview deployments para PRs
- Rollbacks instantâneos
- Edge Network global
- Analytics integrado

### Variáveis de ambiente

```bash
# .env.local (não commitar!)
DATABASE_URL=sua_url_aqui
API_KEY=sua_chave_aqui
```

Na Vercel, adicione em: Settings → Environment Variables

---

## 🚀 Próximos passos

Agora que você conhece os fundamentos do Next.js, explore:

- **Middleware**: Intercepte requisições antes de completarem
- **Internacionalização**: Suporte a múltiplos idiomas
- **Otimização**: Análise de bundle e performance
- **Testes**: Jest e React Testing Library
- **TypeScript**: Adicione tipagem estática

## 📖 Recursos úteis

- [Documentação oficial do Next.js](https://nextjs.org/docs)
- [Tutorial Learn Next.js](https://nextjs.org/learn)
- [Exemplos oficiais](https://github.com/vercel/next.js/tree/canary/examples)
- [Next.js Discord](https://discord.gg/nextjs)

---

**Feito com ❤️ para a comunidade Next.js brasileira**
