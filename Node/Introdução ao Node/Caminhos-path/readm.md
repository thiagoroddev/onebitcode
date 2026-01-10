# Módulo `path` do Node.js

## O que é o módulo `path`?

O módulo `path` é um módulo nativo do Node.js que fornece utilitários para trabalhar com caminhos de arquivos e diretórios. Ele resolve automaticamente as diferenças entre sistemas operacionais (Windows usa `\`, Linux/Mac usam `/`) e torna seu código mais seguro e portável.

## Por que usar o `path`?

Imagine que você precisa juntar dois pedaços de um caminho de arquivo. Você poderia fazer assim:

```javascript
// ❌ Forma errada - não funciona em todos os sistemas
const caminho = "pasta" + "/" + "arquivo.txt";
```

Mas isso pode causar problemas no Windows! O módulo `path` resolve isso:

```javascript
// ✅ Forma correta - funciona em todos os sistemas
const path = require("path");
const caminho = path.join("pasta", "arquivo.txt");
```

## Como importar

```javascript
// CommonJS (padrão no Node.js)
const path = require("path");

// ES Modules (se você usar "type": "module" no package.json)
import path from "path";
```

## Principais métodos e quando usá-los

### 1. `path.join()` - Juntar caminhos

**Quando usar:** Sempre que precisar combinar várias partes de um caminho.

```javascript
const path = require("path");

// Junta pedaços de caminho de forma segura
const arquivo = path.join("usuarios", "documentos", "relatorio.pdf");
console.log(arquivo);
// Linux/Mac: usuarios/documentos/relatorio.pdf
// Windows: usuarios\documentos\relatorio.pdf

// Útil com __dirname (diretório atual do arquivo)
const caminhoCompleto = path.join(__dirname, "uploads", "imagem.jpg");
console.log(caminhoCompleto);
// Exemplo: /home/usuario/projeto/uploads/imagem.jpg
```

### 2. `path.resolve()` - Criar caminho absoluto

**Quando usar:** Quando você precisa do caminho completo (absoluto) de um arquivo.

```javascript
// Cria um caminho absoluto a partir do diretório atual
const caminhoAbsoluto = path.resolve("pasta", "arquivo.txt");
console.log(caminhoAbsoluto);
// Exemplo: /home/usuario/projeto/pasta/arquivo.txt

// Diferença entre join e resolve:
// join apenas une, resolve cria caminho absoluto
console.log(path.join("pasta", "arquivo.txt")); // pasta/arquivo.txt
console.log(path.resolve("pasta", "arquivo.txt")); // /caminho/completo/pasta/arquivo.txt
```

### 3. `path.basename()` - Pegar nome do arquivo

**Quando usar:** Para extrair apenas o nome do arquivo de um caminho completo.

```javascript
const caminhoCompleto = "/usuarios/joao/documentos/relatorio.pdf";

// Pega o nome do arquivo
console.log(path.basename(caminhoCompleto));
// relatorio.pdf

// Pega o nome sem a extensão
console.log(path.basename(caminhoCompleto, ".pdf"));
// relatorio
```

### 4. `path.dirname()` - Pegar diretório pai

**Quando usar:** Para descobrir em qual pasta um arquivo está.

```javascript
const arquivo = "/usuarios/joao/documentos/relatorio.pdf";

console.log(path.dirname(arquivo));
// /usuarios/joao/documentos
```

### 5. `path.extname()` - Pegar extensão do arquivo

**Quando usar:** Para verificar o tipo de arquivo ou validar extensões.

```javascript
const arquivo = "foto.jpg";

console.log(path.extname(arquivo));
// .jpg

// Exemplo prático: validar tipo de imagem
const extensao = path.extname(arquivo);
if (extensao === ".jpg" || extensao === ".png") {
  console.log("É uma imagem válida!");
}
```

### 6. `path.parse()` e `path.format()` - Decompor/Compor caminhos

**Quando usar:** Para manipular partes específicas de um caminho.

```javascript
const arquivo = "/home/usuario/documentos/relatorio.pdf";

// Decompor o caminho em partes
const partes = path.parse(arquivo);
console.log(partes);
/*
{
  root: '/',
  dir: '/home/usuario/documentos',
  base: 'relatorio.pdf',
  ext: '.pdf',
  name: 'relatorio'
}
*/

// Compor de volta
const caminhoNovo = path.format({
  dir: "/home/usuario/imagens",
  name: "foto",
  ext: ".png",
});
console.log(caminhoNovo);
// /home/usuario/imagens/foto.png
```

### 7. `path.isAbsolute()` - Verificar se é caminho absoluto

**Quando usar:** Para validar se um caminho é absoluto ou relativo.

```javascript
console.log(path.isAbsolute("/home/usuario")); // true
console.log(path.isAbsolute("pasta/arquivo.txt")); // false
console.log(path.isAbsolute("C:\\Users")); // true (Windows)
```

### 8. `path.normalize()` - Normalizar caminhos

**Quando usar:** Para limpar caminhos com barras extras ou inconsistências.

```javascript
// Remove barras duplicadas e resolve .. (volta diretório)
const caminhoDesordenado = "/home//usuario/../joao/./documentos";
console.log(path.normalize(caminhoDesordenado));
// /home/joao/documentos
```

## Exemplo prático completo

Aqui está um exemplo real de como usar o `path` em um projeto Node.js:

```javascript
const path = require("path");
const fs = require("fs");

// Função para salvar um arquivo de upload
function salvarArquivo(nomeArquivo, dados) {
  // 1. Criar caminho seguro para a pasta de uploads
  const pastaUploads = path.join(__dirname, "uploads");

  // 2. Validar extensão do arquivo
  const extensao = path.extname(nomeArquivo);
  const extensoesPermitidas = [".jpg", ".png", ".pdf"];

  if (!extensoesPermitidas.includes(extensao)) {
    console.log("Extensão não permitida!");
    return false;
  }

  // 3. Criar nome único para o arquivo
  const nomeBase = path.basename(nomeArquivo, extensao);
  const timestamp = Date.now();
  const novoNome = `${nomeBase}_${timestamp}${extensao}`;

  // 4. Montar caminho completo do arquivo
  const caminhoCompleto = path.join(pastaUploads, novoNome);

  // 5. Salvar o arquivo
  fs.writeFileSync(caminhoCompleto, dados);

  console.log(`Arquivo salvo em: ${caminhoCompleto}`);
  return caminhoCompleto;
}

// Uso
salvarArquivo("foto.jpg", "dados do arquivo...");
// Arquivo salvo em: /home/usuario/projeto/uploads/foto_1704988800000.jpg
```

## Variáveis úteis relacionadas

```javascript
// __dirname - Diretório do arquivo atual
console.log(__dirname);
// /home/usuario/projeto

// __filename - Caminho completo do arquivo atual
console.log(__filename);
// /home/usuario/projeto/app.js

// process.cwd() - Diretório onde o Node foi executado
console.log(process.cwd());
// /home/usuario
```

## Dicas importantes

1. **Sempre use `path.join()` ao invés de concatenar strings** para garantir compatibilidade entre sistemas operacionais.

2. **Use `__dirname` com `path.join()`** para caminhos relativos ao seu arquivo:

   ```javascript
   const config = path.join(__dirname, "config", "settings.json");
   ```

3. **Evite barra hardcoded**: Nunca use `'/'` ou `'\\'` diretamente. Use `path.sep` se realmente precisar:

   ```javascript
   console.log(path.sep); // '/' no Linux/Mac, '\' no Windows
   ```

4. **Para APIs web**, caminhos sempre usam `/`, mas para arquivos locais, use `path`:

   ```javascript
   // URL (sempre barra normal)
   const url = "/api/usuarios";

   // Arquivo local (use path)
   const arquivo = path.join("pasta", "arquivo.txt");
   ```

## Resumo rápido

| Método       | Para que serve   | Exemplo                               |
| ------------ | ---------------- | ------------------------------------- |
| `join()`     | Juntar caminhos  | `path.join('a', 'b')` → `a/b`         |
| `resolve()`  | Caminho absoluto | `path.resolve('a')` → `/home/user/a`  |
| `basename()` | Nome do arquivo  | `path.basename('/a/b.txt')` → `b.txt` |
| `dirname()`  | Pasta pai        | `path.dirname('/a/b.txt')` → `/a`     |
| `extname()`  | Extensão         | `path.extname('a.txt')` → `.txt`      |
| `parse()`    | Dividir caminho  | Retorna objeto com partes             |
| `format()`   | Montar caminho   | Cria caminho de objeto                |

## Conclusão

O módulo `path` é essencial para qualquer projeto Node.js que trabalhe com arquivos. Ele garante que seu código funcione em qualquer sistema operacional e evita erros comuns ao manipular caminhos de arquivos. Use-o sempre que precisar trabalhar com caminhos, e seu código será mais robusto e profissional!
