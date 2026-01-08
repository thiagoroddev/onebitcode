# Guia Completo do Módulo `fs` (File System) no Node.js

O módulo `fs` (File System) é um dos módulos principais do Node.js, fornecendo uma API completa para interagir com o sistema de arquivos. Ele permite ler, escrever, modificar e excluir arquivos e diretórios de forma síncrona, assíncrona (callback) ou com Promises.

## Importando o Módulo

```javascript
// CommonJS
const fs = require('fs');
const fsPromises = require('fs/promises');

// ES Modules
import fs from 'fs';
import fsPromises from 'fs/promises';
```

## Principais Formas de Uso

O módulo `fs` oferece três abordagens para trabalhar com arquivos:

1. **Assíncrona com Callbacks** - Ideal para operações não-bloqueantes
2. **Síncrona** - Bloqueia a execução até completar (sufixo `Sync`)
3. **Baseada em Promises** - Usando `fs/promises` ou `util.promisify()`

## Operações Fundamentais

### Leitura de Arquivos

```javascript
// Assíncrona (callback)
fs.readFile('arquivo.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Síncrona
const data = fs.readFileSync('arquivo.txt', 'utf8');

// Com Promises
const data = await fsPromises.readFile('arquivo.txt', 'utf8');
```

### Escrita de Arquivos

```javascript
// Assíncrona (callback)
fs.writeFile('arquivo.txt', 'Conteúdo', err => {
  if (err) throw err;
  console.log('Arquivo salvo!');
});

// Síncrona
fs.writeFileSync('arquivo.txt', 'Conteúdo');

// Com Promises
await fsPromises.writeFile('arquivo.txt', 'Conteúdo');
```

### Adicionar Conteúdo (Append)

```javascript
// Assíncrona
fs.appendFile('log.txt', 'Nova linha\n', err => {
  if (err) throw err;
});

// Com Promises
await fsPromises.appendFile('log.txt', 'Nova linha\n');
```

### Excluir Arquivos

```javascript
// Assíncrona
fs.unlink('arquivo.txt', err => {
  if (err) throw err;
});

// Com Promises
await fsPromises.unlink('arquivo.txt');
```

## Trabalhando com Diretórios

### Criar Diretório

```javascript
// Criar diretório simples
fs.mkdir('nova-pasta', err => {
  if (err) throw err;
});

// Criar diretórios recursivamente
await fsPromises.mkdir('pasta/subpasta/profunda', { recursive: true });
```

### Listar Conteúdo de Diretório

```javascript
// Listar arquivos
fs.readdir('./pasta', (err, files) => {
  if (err) throw err;
  console.log(files);
});

// Com informações detalhadas
const files = await fsPromises.readdir('./pasta', { withFileTypes: true });
files.forEach(file => {
  console.log(file.name, file.isDirectory() ? 'DIR' : 'FILE');
});
```

### Remover Diretório

```javascript
// Diretório vazio
await fsPromises.rmdir('pasta');

// Diretório com conteúdo (recursivo)
await fsPromises.rm('pasta', { recursive: true, force: true });
```

## Verificação de Existência e Informações

### Verificar se Arquivo Existe

```javascript
// Usando access (recomendado)
fs.access('arquivo.txt', fs.constants.F_OK, err => {
  if (err) {
    console.log('Arquivo não existe');
  } else {
    console.log('Arquivo existe');
  }
});

// Com Promises
try {
  await fsPromises.access('arquivo.txt');
  console.log('Arquivo existe');
} catch {
  console.log('Arquivo não existe');
}
```

### Obter Informações do Arquivo

```javascript
const stats = await fsPromises.stat('arquivo.txt');

console.log(stats.isFile()); // É um arquivo?
console.log(stats.isDirectory()); // É um diretório?
console.log(stats.size); // Tamanho em bytes
console.log(stats.mtime); // Data de modificação
console.log(stats.birthtime); // Data de criação
```

## Operações Avançadas

### Copiar Arquivos

```javascript
// Copiar arquivo
await fsPromises.copyFile('origem.txt', 'destino.txt');

// Copiar diretório completo (Node.js 16+)
await fsPromises.cp('pasta-origem', 'pasta-destino', { recursive: true });
```

### Renomear/Mover Arquivos

```javascript
await fsPromises.rename('arquivo-antigo.txt', 'arquivo-novo.txt');

// Mover para outro diretório
await fsPromises.rename('arquivo.txt', './outra-pasta/arquivo.txt');
```

### Trabalhar com Streams

Streams são eficientes para arquivos grandes, pois processam dados em pedaços ao invés de carregar tudo na memória.

```javascript
// Read Stream
const readStream = fs.createReadStream('arquivo-grande.txt', 'utf8');

readStream.on('data', chunk => {
  console.log('Chunk recebido:', chunk);
});

readStream.on('end', () => {
  console.log('Leitura concluída');
});

// Write Stream
const writeStream = fs.createWriteStream('saida.txt');
writeStream.write('Primeira linha\n');
writeStream.write('Segunda linha\n');
writeStream.end();

// Pipe (copiar arquivo)
const input = fs.createReadStream('entrada.txt');
const output = fs.createWriteStream('saida.txt');
input.pipe(output);
```

### Watch (Monitorar Alterações)

```javascript
// Monitorar arquivo
fs.watch('arquivo.txt', (eventType, filename) => {
  console.log(`Evento: ${eventType} no arquivo ${filename}`);
});

// Monitorar diretório
const watcher = fs.watch('./pasta', { recursive: true }, (eventType, filename) => {
  console.log(`${filename} foi ${eventType === 'rename' ? 'renomeado' : 'modificado'}`);
});

// Parar de monitorar
watcher.close();
```

## Trabalhando com Permissões

```javascript
// Alterar permissões (chmod)
await fsPromises.chmod('arquivo.txt', 0o755);

// Alterar proprietário (chown)
await fsPromises.chown('arquivo.txt', uid, gid);
```

## Boas Práticas

1. **Prefira Promises ou Async/Await** - Código mais limpo e legível do que callbacks
2. **Evite Operações Síncronas** - Use apenas em scripts CLI ou durante inicialização
3. **Trate Erros Adequadamente** - Sempre use try/catch com Promises ou verifique `err` em callbacks
4. **Use Streams para Arquivos Grandes** - Economiza memória e melhora performance
5. **Valide Caminhos** - Use `path.join()` para evitar problemas multiplataforma
6. **Use `fs.promises` em Código Moderno** - API mais limpa e compatível com async/await

## Exemplo Prático Completo

```javascript
import { promises as fs } from 'fs';
import path from 'path';

async function gerenciadorDeArquivos() {
  try {
    // Criar diretório
    await fs.mkdir('./dados', { recursive: true });
    
    // Escrever arquivo
    const dados = { nome: 'João', idade: 30 };
    await fs.writeFile(
      path.join('./dados', 'usuario.json'),
      JSON.stringify(dados, null, 2)
    );
    
    // Ler arquivo
    const conteudo = await fs.readFile('./dados/usuario.json', 'utf8');
    const usuario = JSON.parse(conteudo);
    console.log('Usuário:', usuario);
    
    // Listar arquivos do diretório
    const arquivos = await fs.readdir('./dados');
    console.log('Arquivos:', arquivos);
    
    // Obter informações
    const stats = await fs.stat('./dados/usuario.json');
    console.log(`Tamanho: ${stats.size} bytes`);
    
  } catch (erro) {
    console.error('Erro:', erro.message);
  }
}

gerenciadorDeArquivos();
```

## Recursos Adicionais

- [Documentação Oficial do Node.js - fs](https://nodejs.org/api/fs.html)
- [Documentação - fs/promises](https://nodejs.org/api/fs.html#promises-api)
- [Stream API](https://nodejs.org/api/stream.html)

---

Este README fornece uma visão abrangente do módulo `fs`, cobrindo desde operações básicas até recursos avançados. Para projetos de produção, considere também usar bibliotecas como `fs-extra` que estendem a funcionalidade do `fs` com métodos adicionais úteis.
