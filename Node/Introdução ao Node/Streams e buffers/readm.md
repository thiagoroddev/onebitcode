# Streams e Buffers no Node.js

## 📚 Índice

1. [O que são Buffers?](#o-que-são-buffers)
2. [O que são Streams?](#o-que-são-streams)
3. [Quando usar cada um?](#quando-usar-cada-um)
4. [Buffers - Guia Completo](#buffers---guia-completo)
5. [Streams - Guia Completo](#streams---guia-completo)
6. [Exemplos Práticos](#exemplos-práticos)
7. [Comparação e Boas Práticas](#comparação-e-boas-práticas)

---

## O que são Buffers?

### 🎯 Conceito Simples

**Buffer** é uma área temporária de memória que armazena dados binários (bytes). Pense em um buffer como um **balde** que você enche completamente antes de fazer algo com o conteúdo.

### 📦 Analogia do Mundo Real

Imagine que você precisa transportar água de um poço para sua casa:

- **COM BUFFER**: Você enche um BALDE COMPLETO de água, depois carrega tudo de uma vez até sua casa.
- Você só começa a caminhar quando o balde está cheio.
- Usa mais memória (o balde todo), mas faz tudo de uma vez.

### 💻 No Node.js

```javascript
// Buffer armazena dados binários em memória
const buffer = Buffer.from("Olá, mundo!");

console.log(buffer);
// <Buffer 4f 6c c3 a1 2c 20 6d 75 6e 64 6f 21>

// Cada par (4f, 6c, etc) é um byte em hexadecimal
```

### ✅ Quando usar Buffers?

- Arquivos pequenos (imagens, PDFs pequenos)
- Quando você precisa de todos os dados ao mesmo tempo
- Operações que exigem manipulação completa dos dados
- Quando a performance de leitura única é importante

---

## O que são Streams?

### 🎯 Conceito Simples

**Stream** é um fluxo contínuo de dados que são processados em **pedaços** (chunks). Pense em uma stream como uma **mangueira** que vai despejando água aos poucos.

### 📦 Analogia do Mundo Real

Voltando ao exemplo da água:

- **COM STREAM**: Você usa uma MANGUEIRA que vai transportando água continuamente.
- A água vai fluindo aos poucos, você não precisa esperar encher nada.
- Usa menos memória (só o que está passando no momento), mas leva mais tempo no total.

### 💻 No Node.js

```javascript
const fs = require("fs");

// Stream lê o arquivo em pedaços
const stream = fs.createReadStream("arquivo-grande.txt");

stream.on("data", (pedaco) => {
  console.log(`Recebi ${pedaco.length} bytes`);
  // Processa cada pedaço conforme vai chegando
});
```

### ✅ Quando usar Streams?

- Arquivos grandes (vídeos, arquivos ZIP grandes, logs enormes)
- Quando você quer processar dados conforme chegam
- Upload/Download de arquivos
- Quando a memória é limitada
- Processamento em tempo real

---

## Quando usar cada um?

### 📊 Tabela de Decisão

| Situação                  | Use Buffer | Use Stream       |
| ------------------------- | ---------- | ---------------- |
| Arquivo pequeno (< 1MB)   | ✅ Sim     | ❌ Desnecessário |
| Arquivo grande (> 10MB)   | ❌ Não     | ✅ Sim           |
| Precisa de todos os dados | ✅ Sim     | ❌ Complicado    |
| Processar aos poucos      | ❌ Não     | ✅ Sim           |
| Baixa memória disponível  | ❌ Não     | ✅ Sim           |
| Transformar dados         | ❌ Não     | ✅ Sim           |
| Upload/Download           | ❌ Não     | ✅ Sim           |

### 🎯 Regra Prática

- **Arquivo < 10MB**: Buffer está OK
- **Arquivo > 10MB**: Use Stream
- **Não sabe o tamanho**: Use Stream (por segurança)

---

## Buffers - Guia Completo

### 1. Criando Buffers

```javascript
const buffer1 = Buffer.from("Olá!"); // De uma string
const buffer2 = Buffer.from([72, 101, 108, 108, 111]); // De array de bytes
const buffer3 = Buffer.alloc(10); // Buffer vazio de 10 bytes
const buffer4 = Buffer.allocUnsafe(10); // Mais rápido, mas não limpo

console.log(buffer1.toString()); // 'Olá!'
console.log(buffer2.toString()); // 'Hello'
```

### 2. Manipulando Buffers

```javascript
const buf = Buffer.from("Node.js");

// Comprimento em bytes
console.log(buf.length); // 7

// Acessar bytes individuais
console.log(buf[0]); // 78 (código do 'N')

// Converter para string
console.log(buf.toString()); // 'Node.js'
console.log(buf.toString("hex")); // '4e6f64652e6a73'
console.log(buf.toString("base64")); // 'Tm9kZS5qcw=='

// Fatiar buffer
const slice = buf.slice(0, 4);
console.log(slice.toString()); // 'Node'
```

### 3. Concatenando Buffers

```javascript
const buf1 = Buffer.from("Hello ");
const buf2 = Buffer.from("World");

const resultado = Buffer.concat([buf1, buf2]);
console.log(resultado.toString()); // 'Hello World'
```

### 4. Comparando Buffers

```javascript
const buf1 = Buffer.from("ABC");
const buf2 = Buffer.from("ABD");

console.log(buf1.compare(buf2)); // -1 (buf1 vem antes)
console.log(buf1.equals(buf2)); // false
```

### 5. Exemplo Prático: Ler arquivo pequeno

```javascript
const fs = require("fs");

// Ler arquivo inteiro no buffer
const conteudo = fs.readFileSync("imagem.jpg");

console.log(`Arquivo tem ${conteudo.length} bytes`);
console.log(`Tipo: ${conteudo instanceof Buffer}`); // true

// Salvar em outro lugar
fs.writeFileSync("copia.jpg", conteudo);
```

### 6. Trabalhando com JSON

```javascript
const dados = {nome: "João", idade: 30};

// Objeto → Buffer
const buffer = Buffer.from(JSON.stringify(dados));
console.log(buffer);

// Buffer → Objeto
const objeto = JSON.parse(buffer.toString());
console.log(objeto); // { nome: 'João', idade: 30 }
```

---

## Streams - Guia Completo

### Tipos de Streams

1. **Readable** - Para leitura (ex: ler arquivo)
2. **Writable** - Para escrita (ex: escrever arquivo)
3. **Duplex** - Leitura e escrita (ex: socket TCP)
4. **Transform** - Transforma dados durante o fluxo (ex: compressão)

### 1. Readable Stream (Leitura)

```javascript
const fs = require("fs");

// Criar stream de leitura
const readStream = fs.createReadStream("arquivo.txt", {
  encoding: "utf8",
  highWaterMark: 16 * 1024, // Tamanho de cada pedaço (16KB)
});

// Evento: quando dados chegam
readStream.on("data", (pedaco) => {
  console.log("Recebi um pedaço:");
  console.log(pedaco);
});

// Evento: quando terminar
readStream.on("end", () => {
  console.log("Leitura concluída!");
});

// Evento: se houver erro
readStream.on("error", (erro) => {
  console.error("Erro:", erro);
});
```

### 2. Writable Stream (Escrita)

```javascript
const fs = require("fs");

// Criar stream de escrita
const writeStream = fs.createWriteStream("saida.txt");

// Escrever dados
writeStream.write("Primeira linha\n");
writeStream.write("Segunda linha\n");
writeStream.write("Terceira linha\n");

// Finalizar (importante!)
writeStream.end("Última linha\n");

// Evento: quando terminar
writeStream.on("finish", () => {
  console.log("Escrita concluída!");
});
```

### 3. Pipe - Conectando Streams

**Pipe** é como conectar uma mangueira em outra. Os dados fluem automaticamente!

```javascript
const fs = require("fs");

// Ler de um arquivo e escrever em outro
const readStream = fs.createReadStream("entrada.txt");
const writeStream = fs.createWriteStream("saida.txt");

// Conectar as streams (copiar arquivo)
readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Arquivo copiado!");
});
```

### 4. Transform Stream - Transformar dados

```javascript
const {Transform} = require("stream");

// Criar stream que converte para maiúsculas
const maiuscula = new Transform({
  transform(pedaco, encoding, callback) {
    // Transformar o pedaço
    const transformado = pedaco.toString().toUpperCase();

    // Passar para frente
    this.push(transformado);
    callback();
  },
});

// Usar a transformação
process.stdin.pipe(maiuscula).pipe(process.stdout);

// Digite algo no terminal e verá em maiúsculas!
```

### 5. Múltiplos Pipes (Cadeia)

```javascript
const fs = require("fs");
const zlib = require("zlib");

// Ler → Comprimir → Escrever
fs.createReadStream("entrada.txt")
  .pipe(zlib.createGzip()) // Comprimir
  .pipe(fs.createWriteStream("saida.txt.gz"));

console.log("Comprimindo arquivo...");
```

### 6. Controlando o Fluxo

```javascript
const fs = require("fs");

const readStream = fs.createReadStream("grande.txt");

readStream.on("data", (pedaco) => {
  console.log(`Processando ${pedaco.length} bytes`);

  // Pausar a stream
  readStream.pause();

  // Processar (simulado com timeout)
  setTimeout(() => {
    console.log("Processamento concluído");

    // Retomar a stream
    readStream.resume();
  }, 1000);
});
```

---

## Exemplos Práticos

### Exemplo 1: Copiar arquivo (Buffer vs Stream)

#### ❌ Com Buffer (arquivos pequenos)

```javascript
const fs = require("fs");

// Lê TUDO de uma vez (usa muita memória!)
const conteudo = fs.readFileSync("video.mp4");
fs.writeFileSync("copia.mp4", conteudo);

console.log("Copiado com Buffer!");
```

#### ✅ Com Stream (arquivos grandes)

```javascript
const fs = require("fs");

// Lê e escreve em pedaços (pouca memória!)
const readStream = fs.createReadStream("video.mp4");
const writeStream = fs.createWriteStream("copia.mp4");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Copiado com Stream!");
});
```

### Exemplo 2: Servidor HTTP com Upload

#### ❌ Com Buffer (problema com arquivos grandes)

```javascript
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      let body = Buffer.alloc(0);

      req.on("data", (chunk) => {
        // Concatena buffers (INEFICIENTE!)
        body = Buffer.concat([body, chunk]);
      });

      req.on("end", () => {
        fs.writeFileSync("upload.bin", body);
        res.end("Upload concluído!");
      });
    }
  })
  .listen(3000);
```

#### ✅ Com Stream (eficiente)

```javascript
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      const writeStream = fs.createWriteStream("upload.bin");

      // Pipe direto! Sem usar memória extra
      req.pipe(writeStream);

      writeStream.on("finish", () => {
        res.end("Upload concluído!");
      });
    }
  })
  .listen(3000);
```

### Exemplo 3: Processar CSV grande

```javascript
const fs = require("fs");
const {Transform} = require("stream");

// Transform para processar linha por linha
const processarLinha = new Transform({
  transform(chunk, encoding, callback) {
    const linhas = chunk.toString().split("\n");

    linhas.forEach((linha) => {
      if (linha.trim()) {
        // Processar cada linha
        const processada = linha.toUpperCase();
        this.push(processada + "\n");
      }
    });

    callback();
  },
});

// Processar arquivo CSV gigante
fs.createReadStream("dados-gigantes.csv")
  .pipe(processarLinha)
  .pipe(fs.createWriteStream("dados-processados.csv"));

console.log("Processando arquivo...");
```

### Exemplo 4: Download com Progresso

```javascript
const fs = require("fs");
const https = require("https");

const arquivo = fs.createWriteStream("download.zip");
let baixado = 0;

https.get("https://exemplo.com/arquivo.zip", (response) => {
  const tamanhoTotal = parseInt(response.headers["content-length"], 10);

  response.on("data", (pedaco) => {
    baixado += pedaco.length;
    const progresso = ((baixado / tamanhoTotal) * 100).toFixed(2);
    console.log(`Progresso: ${progresso}%`);
  });

  response.pipe(arquivo);

  arquivo.on("finish", () => {
    arquivo.close();
    console.log("Download concluído!");
  });
});
```

### Exemplo 5: Comprimir e Descomprimir

```javascript
const fs = require("fs");
const zlib = require("zlib");

// COMPRIMIR
function comprimir() {
  fs.createReadStream("arquivo.txt")
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream("arquivo.txt.gz"))
    .on("finish", () => console.log("Comprimido!"));
}

// DESCOMPRIMIR
function descomprimir() {
  fs.createReadStream("arquivo.txt.gz")
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream("arquivo-descomprimido.txt"))
    .on("finish", () => console.log("Descomprimido!"));
}

comprimir();
// descomprimir();
```

### Exemplo 6: Contar linhas em arquivo enorme

```javascript
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("arquivo-enorme.txt"),
  crlfDelay: Infinity,
});

let contador = 0;

rl.on("line", (linha) => {
  contador++;

  // Processar a linha se necessário
  if (linha.includes("erro")) {
    console.log(`Erro na linha ${contador}: ${linha}`);
  }
});

rl.on("close", () => {
  console.log(`Total de linhas: ${contador}`);
});
```

---

## Comparação e Boas Práticas

### 🔄 Buffer vs Stream - Diferenças Visuais

```
BUFFER (Tudo de uma vez):
Arquivo → [■■■■■■■■■■] → Memória → Processar
          Todo o arquivo

STREAM (Pedaço por pedaço):
Arquivo → [■■] → [■■] → [■■] → [■■] → Processar
          Chunks pequenos
```

### 📊 Comparação de Uso de Memória

```javascript
// Arquivo de 1GB

// ❌ COM BUFFER: Usa ~1GB de RAM
const buffer = fs.readFileSync("1gb.txt");

// ✅ COM STREAM: Usa ~64KB de RAM
const stream = fs.createReadStream("1gb.txt");
stream.on("data", (chunk) => {
  // Processa chunk de 64KB por vez
});
```

### ⚡ Performance Comparison

| Operação      | Buffer   | Stream | Vencedor  |
| ------------- | -------- | ------ | --------- |
| Arquivo 1KB   | 0.5ms    | 2ms    | Buffer ⚡ |
| Arquivo 10MB  | 50ms     | 60ms   | Buffer 🤔 |
| Arquivo 100MB | 500ms    | 550ms  | Empate    |
| Arquivo 1GB   | ❌ Crash | 5s     | Stream ⚡ |
| Arquivo 10GB  | ❌ Crash | 50s    | Stream ⚡ |

### 🎯 Boas Práticas

#### 1. Sempre trate erros

```javascript
const stream = fs.createReadStream("arquivo.txt");

stream.on("error", (erro) => {
  console.error("Erro na stream:", erro);
  // Fazer cleanup
});
```

#### 2. Feche streams corretamente

```javascript
const writeStream = fs.createWriteStream("saida.txt");

writeStream.write("dados");
writeStream.end(); // ✅ Sempre feche!

writeStream.on("finish", () => {
  console.log("Stream fechada corretamente");
});
```

#### 3. Use highWaterMark apropriadamente

```javascript
// Ajustar tamanho do chunk conforme necessário
const stream = fs.createReadStream("arquivo.txt", {
  highWaterMark: 64 * 1024, // 64KB (padrão é 16KB)
});
```

#### 4. Prefira pipe quando possível

```javascript
// ❌ Manual (mais código, mais chance de erro)
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

// ✅ Pipe (simples e seguro)
readStream.pipe(writeStream);
```

#### 5. Limite memória com streams encadeadas

```javascript
const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");

// Várias transformações sem usar muita memória!
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip()) // Comprimir
  .pipe(crypto.createCipher("aes192", "senha")) // Criptografar
  .pipe(fs.createWriteStream("output.enc.gz")); // Salvar
```

---

## 🎓 Resumo Final

### Buffer

- 📦 Armazena dados binários em memória
- ✅ Ótimo para arquivos pequenos
- ❌ Problemático para arquivos grandes
- 🎯 Use quando: precisa de todos os dados de uma vez

### Stream

- 🌊 Processa dados em fluxo contínuo
- ✅ Ótimo para arquivos grandes
- ✅ Econômico em memória
- 🎯 Use quando: arquivos grandes ou processamento contínuo

### Regra de Ouro

> "Se o arquivo cabe confortavelmente na memória (< 10MB), use Buffer.
> Se o arquivo é grande ou você não sabe o tamanho, use Stream."

---

## 📚 Métodos Principais

### Buffer

- `Buffer.from()` - Criar buffer
- `Buffer.alloc()` - Alocar memória
- `Buffer.concat()` - Concatenar buffers
- `.toString()` - Converter para string
- `.slice()` - Fatiar buffer

### Stream

- `fs.createReadStream()` - Ler arquivo
- `fs.createWriteStream()` - Escrever arquivo
- `.pipe()` - Conectar streams
- `.on('data')` - Receber dados
- `.on('end')` - Fim da stream
- `.pause()` / `.resume()` - Controlar fluxo

---

## 💡 Quando usar o quê?

```
Lendo configuração JSON? → Buffer
Processando vídeo de 4GB? → Stream
Fazendo upload de imagem? → Stream (mesmo pequena, por segurança)
Lendo arquivo .env? → Buffer
API que retorna CSV gigante? → Stream
Salvando screenshot? → Buffer
Download de arquivo? → Stream
Manipulando string pequena? → Buffer
Log em tempo real? → Stream
```

---

## ✅ Conclusão

Buffers e Streams são ferramentas complementares:

- **Buffers** são como **baldes** - você enche e carrega tudo
- **Streams** são como **mangueiras** - o fluxo é contínuo

Escolha a ferramenta certa para o trabalho certo, e suas aplicações Node.js serão eficientes e escaláveis! 🚀
