# Módulo `os` do Node.js

## O que é o módulo `os`?

O módulo `os` (Operating System) é um módulo nativo do Node.js que fornece informações sobre o sistema operacional onde sua aplicação está rodando. Com ele, você pode obter dados sobre CPU, memória, usuário, rede, e muito mais.

## Por que usar o `os`?

O módulo `os` é útil quando você precisa:

- Saber em qual sistema operacional sua aplicação está rodando
- Monitorar recursos do sistema (memória, CPU)
- Adaptar comportamentos conforme o ambiente
- Criar ferramentas de diagnóstico e monitoramento
- Obter informações sobre o usuário e a máquina

## Como importar

```javascript
// CommonJS (padrão no Node.js)
const os = require("os");

// ES Modules (se você usar "type": "module" no package.json)
import os from "os";
```

## Principais métodos e quando usá-los

### 1. Informações do Sistema Operacional

#### `os.platform()` - Descobrir o sistema operacional

**Quando usar:** Para executar código específico para cada sistema.

```javascript
const os = require("os");

console.log(os.platform());
// 'darwin'  → macOS
// 'win32'   → Windows
// 'linux'   → Linux
// 'freebsd' → FreeBSD

// Exemplo prático: executar comando específico
if (os.platform() === "win32") {
  console.log("Rodando no Windows");
  // Executar comandos específicos do Windows
} else if (os.platform() === "darwin") {
  console.log("Rodando no macOS");
} else {
  console.log("Rodando no Linux");
}
```

#### `os.type()` - Tipo do sistema operacional

```javascript
console.log(os.type());
// 'Windows_NT' → Windows
// 'Darwin'     → macOS
// 'Linux'      → Linux
```

#### `os.release()` - Versão do sistema

```javascript
console.log(os.release());
// Windows: '10.0.19041'
// Linux: '5.4.0-42-generic'
// macOS: '20.6.0'
```

#### `os.arch()` - Arquitetura do processador

```javascript
console.log(os.arch());
// 'x64'   → 64 bits
// 'arm'   → ARM
// 'arm64' → ARM 64 bits
// 'x32'   → 32 bits
```

### 2. Informações de Memória

#### `os.totalmem()` - Memória total do sistema

**Quando usar:** Para verificar recursos disponíveis ou criar dashboards de monitoramento.

```javascript
const totalMemoria = os.totalmem();
console.log(totalMemoria); // Em bytes
// 17179869184

// Converter para formato legível
function formatarBytes(bytes) {
  const gb = bytes / 1024 ** 3;
  return gb.toFixed(2) + " GB";
}

console.log("Memória total:", formatarBytes(totalMemoria));
// Memória total: 16.00 GB
```

#### `os.freemem()` - Memória livre disponível

```javascript
const memoriaLivre = os.freemem();
console.log("Memória livre:", formatarBytes(memoriaLivre));
// Memória livre: 8.45 GB

// Calcular porcentagem de uso
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const percentualUso = (usedMem / totalMem) * 100;

console.log(`Uso de memória: ${percentualUso.toFixed(2)}%`);
// Uso de memória: 47.19%
```

### 3. Informações da CPU

#### `os.cpus()` - Informações sobre processadores

**Quando usar:** Para análise de performance ou distribuição de tarefas.

```javascript
const cpus = os.cpus();

console.log(`Número de núcleos: ${cpus.length}`);

// Informações do primeiro núcleo
console.log(cpus[0]);
/*
{
  model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
  speed: 2600, // MHz
  times: {
    user: 252020,
    nice: 0,
    sys: 30340,
    idle: 1070356870,
    irq: 0
  }
}
*/

// Calcular uso médio da CPU
function calcularUsoCPU() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((cpu) => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  const uso = 100 - (100 * idle) / total;

  return uso.toFixed(2);
}

console.log(`Uso da CPU: ${calcularUsoCPU()}%`);
```

### 4. Informações de Rede

#### `os.networkInterfaces()` - Interfaces de rede

**Quando usar:** Para obter endereços IP ou diagnosticar conexões.

```javascript
const redes = os.networkInterfaces();

console.log(redes);
/*
{
  lo: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true
    }
  ],
  eth0: [
    {
      address: '192.168.1.10',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '01:02:03:0a:0b:0c',
      internal: false
    }
  ]
}
*/

// Exemplo: Pegar IP local da máquina
function obterIPLocal() {
  const redes = os.networkInterfaces();

  for (let nome in redes) {
    for (let rede of redes[nome]) {
      // Pular endereços internos e IPv6
      if (rede.family === "IPv4" && !rede.internal) {
        return rede.address;
      }
    }
  }
  return "127.0.0.1";
}

console.log("IP local:", obterIPLocal());
// IP local: 192.168.1.10
```

### 5. Informações do Usuário e Sistema

#### `os.userInfo()` - Informações do usuário atual

```javascript
const usuario = os.userInfo();

console.log(usuario);
/*
{
  uid: 1000,
  gid: 1000,
  username: 'joao',
  homedir: '/home/joao',
  shell: '/bin/bash'
}
*/

console.log(`Usuário: ${usuario.username}`);
console.log(`Pasta home: ${usuario.homedir}`);
```

#### `os.hostname()` - Nome da máquina

```javascript
console.log("Nome da máquina:", os.hostname());
// Nome da máquina: notebook-joao
```

#### `os.homedir()` - Diretório home do usuário

```javascript
console.log("Diretório home:", os.homedir());
// Linux/Mac: /home/joao
// Windows: C:\Users\joao
```

#### `os.tmpdir()` - Diretório temporário

**Quando usar:** Para salvar arquivos temporários de forma segura.

```javascript
console.log("Pasta temporária:", os.tmpdir());
// Linux: /tmp
// Windows: C:\Users\joao\AppData\Local\Temp
// macOS: /var/folders/...

// Exemplo: Criar arquivo temporário
const path = require("path");
const fs = require("fs");

const arquivoTemp = path.join(os.tmpdir(), "meu-arquivo-temp.txt");
fs.writeFileSync(arquivoTemp, "Dados temporários");
console.log("Arquivo criado em:", arquivoTemp);
```

### 6. Outras Informações Úteis

#### `os.uptime()` - Tempo que o sistema está ligado

```javascript
const uptime = os.uptime();

console.log(`Sistema ligado há ${uptime} segundos`);

// Converter para formato legível
function formatarUptime(segundos) {
  const dias = Math.floor(segundos / 86400);
  const horas = Math.floor((segundos % 86400) / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);

  return `${dias}d ${horas}h ${minutos}m`;
}

console.log("Uptime:", formatarUptime(uptime));
// Uptime: 5d 12h 34m
```

#### `os.loadavg()` - Carga média do sistema (apenas Unix)

```javascript
// Retorna média de 1, 5 e 15 minutos
const carga = os.loadavg();
console.log(carga);
// [1.2, 1.5, 1.8]

// Nota: Retorna [0, 0, 0] no Windows
```

#### `os.endianness()` - Ordem de bytes do processador

```javascript
console.log(os.endianness());
// 'BE' → Big Endian
// 'LE' → Little Endian (mais comum)
```

#### `os.EOL` - Caractere de fim de linha

```javascript
console.log("Fim de linha:", JSON.stringify(os.EOL));
// Windows: "\r\n"
// Linux/Mac: "\n"

// Exemplo: Criar texto multiplataforma
const texto = `Linha 1${os.EOL}Linha 2${os.EOL}Linha 3`;
console.log(texto);
```

## Exemplos práticos completos

### Exemplo 1: Monitor de sistema simples

```javascript
const os = require("os");

function monitorarSistema() {
  console.clear();
  console.log("=== MONITOR DO SISTEMA ===\n");

  // Sistema
  console.log("Sistema Operacional:", os.type());
  console.log("Plataforma:", os.platform());
  console.log("Arquitetura:", os.arch());
  console.log("Hostname:", os.hostname());
  console.log("Uptime:", formatarUptime(os.uptime()));
  console.log();

  // CPU
  const cpus = os.cpus();
  console.log(`CPU: ${cpus[0].model}`);
  console.log(`Núcleos: ${cpus.length}`);
  console.log();

  // Memória
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const percentMem = ((usedMem / totalMem) * 100).toFixed(2);

  console.log("Memória Total:", formatarBytes(totalMem));
  console.log("Memória Livre:", formatarBytes(freeMem));
  console.log("Memória Usada:", formatarBytes(usedMem));
  console.log(`Uso: ${percentMem}%`);
  console.log();

  // Rede
  console.log("IP Local:", obterIPLocal());
}

function formatarBytes(bytes) {
  return (bytes / 1024 ** 3).toFixed(2) + " GB";
}

function formatarUptime(segundos) {
  const dias = Math.floor(segundos / 86400);
  const horas = Math.floor((segundos % 86400) / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  return `${dias}d ${horas}h ${minutos}m`;
}

function obterIPLocal() {
  const redes = os.networkInterfaces();
  for (let nome in redes) {
    for (let rede of redes[nome]) {
      if (rede.family === "IPv4" && !rede.internal) {
        return rede.address;
      }
    }
  }
  return "127.0.0.1";
}

// Executar
monitorarSistema();

// Atualizar a cada 5 segundos
setInterval(monitorarSistema, 5000);
```

### Exemplo 2: Verificar requisitos do sistema

```javascript
const os = require("os");

function verificarRequisitos() {
  const requisitos = {
    memoriaMinima: 4 * 1024 * 1024 * 1024, // 4 GB em bytes
    cpusMinimas: 2,
    plataformasSuportadas: ["linux", "darwin", "win32"],
  };

  const problemas = [];

  // Verificar plataforma
  if (!requisitos.plataformasSuportadas.includes(os.platform())) {
    problemas.push(`Sistema operacional não suportado: ${os.platform()}`);
  }

  // Verificar memória
  if (os.totalmem() < requisitos.memoriaMinima) {
    problemas.push("Memória insuficiente. Mínimo: 4 GB");
  }

  // Verificar CPUs
  if (os.cpus().length < requisitos.cpusMinimas) {
    problemas.push("Número de CPUs insuficiente. Mínimo: 2 núcleos");
  }

  // Verificar memória livre
  const memoriaLivreGB = os.freemem() / 1024 ** 3;
  if (memoriaLivreGB < 1) {
    problemas.push("Pouca memória disponível. Feche alguns programas.");
  }

  // Mostrar resultado
  if (problemas.length === 0) {
    console.log("✅ Sistema atende todos os requisitos!");
    return true;
  } else {
    console.log("❌ Problemas encontrados:");
    problemas.forEach((p) => console.log(`  - ${p}`));
    return false;
  }
}

verificarRequisitos();
```

### Exemplo 3: Criar arquivo de log com informações do sistema

```javascript
const os = require("os");
const fs = require("fs");
const path = require("path");

function criarLogSistema() {
  const info = {
    timestamp: new Date().toISOString(),
    sistema: {
      tipo: os.type(),
      plataforma: os.platform(),
      versao: os.release(),
      arquitetura: os.arch(),
      hostname: os.hostname(),
    },
    hardware: {
      cpus: os.cpus().length,
      modeloCPU: os.cpus()[0].model,
      memoriaTotal: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
      memoriaLivre: `${(os.freemem() / 1024 ** 3).toFixed(2)} GB`,
    },
    usuario: {
      username: os.userInfo().username,
      homedir: os.userInfo().homedir,
    },
    rede: os.networkInterfaces(),
  };

  const arquivo = path.join(os.tmpdir(), "sistema-info.json");
  fs.writeFileSync(arquivo, JSON.stringify(info, null, 2));

  console.log("Log criado em:", arquivo);
  return arquivo;
}

criarLogSistema();
```

## Tabela resumo dos métodos

| Método                | O que retorna         | Exemplo de retorno                    |
| --------------------- | --------------------- | ------------------------------------- |
| `platform()`          | Plataforma do SO      | `'linux'`, `'win32'`, `'darwin'`      |
| `type()`              | Tipo do SO            | `'Linux'`, `'Windows_NT'`, `'Darwin'` |
| `release()`           | Versão do SO          | `'5.4.0-42-generic'`                  |
| `arch()`              | Arquitetura           | `'x64'`, `'arm64'`                    |
| `totalmem()`          | Memória total (bytes) | `17179869184`                         |
| `freemem()`           | Memória livre (bytes) | `8589934592`                          |
| `cpus()`              | Array de CPUs         | Array com info de cada núcleo         |
| `networkInterfaces()` | Interfaces de rede    | Objeto com interfaces                 |
| `userInfo()`          | Info do usuário       | Objeto com username, homedir, etc     |
| `hostname()`          | Nome da máquina       | `'notebook-joao'`                     |
| `homedir()`           | Diretório home        | `'/home/joao'`                        |
| `tmpdir()`            | Diretório temp        | `'/tmp'`                              |
| `uptime()`            | Tempo ligado (seg)    | `432000`                              |
| `loadavg()`           | Carga média (Unix)    | `[1.2, 1.5, 1.8]`                     |
| `EOL`                 | Fim de linha          | `'\n'` ou `'\r\n'`                    |

## Casos de uso comuns

1. **Aplicações multiplataforma**: Adaptar comportamento conforme o SO
2. **Monitoramento**: Criar dashboards e alertas de recursos
3. **Diagnóstico**: Gerar relatórios de problemas
4. **Validação**: Verificar se o sistema atende requisitos
5. **Logs**: Registrar informações do ambiente de execução
6. **Configuração**: Ajustar caminhos e comportamentos por plataforma

## Dicas importantes

1. **Os valores mudam**: Memória livre e carga do sistema mudam constantemente. Se precisar monitorar, use intervalos.

2. **Bytes vs GB**: A maioria dos valores de memória vem em bytes. Sempre converta para um formato legível.

3. **Multiplataforma**: Sempre teste em diferentes sistemas se seu código depende do `os`.

4. **Performance**: `os.cpus()` pode ser "pesado" se chamado muito frequentemente. Cache se possível.

5. **Privacidade**: Tenha cuidado ao logar informações do usuário (`userInfo()`). Respeite a privacidade.

## Conclusão

O módulo `os` é fundamental para criar aplicações Node.js que precisam se adaptar ao ambiente ou monitorar recursos do sistema. Ele é especialmente útil para ferramentas de diagnóstico, aplicações multiplataforma e sistemas de monitoramento. Use-o sempre que precisar conhecer melhor o ambiente onde sua aplicação está rodando!
