# Monitor de Sistema - Node.js

## 📋 Descrição

Monitor de sistema desenvolvido em Node.js que exibe e registra informações detalhadas do computador a cada 1 segundo, utilizando apenas módulos nativos.

## ✨ Funcionalidades

- ✅ Exibe informações do sistema no console a cada 1 segundo
- ✅ Registra todos os dados em arquivo de log
- ✅ Cria automaticamente a pasta de log se não existir
- ✅ Formatação clara e organizada
- ✅ Tratamento de erros
- ✅ Encerramento gracioso com Ctrl+C

## 📊 Informações Monitoradas

1. **Data/Hora** - Timestamp de cada medição
2. **Sistema Operacional** - Nome do SO (Windows, Linux, Darwin)
3. **Arquitetura** - Arquitetura do processador (x64, arm64, etc)
4. **Modelo do Processador** - Modelo completo da CPU
5. **Tempo de Atividade** - Quanto tempo o sistema está ligado
6. **Uso de Memória** - Percentual de memória RAM utilizada

## 🚀 Como Usar

### Requisitos

- Node.js instalado (versão 12 ou superior)
- Permissões para criar pasta na raiz do sistema

### Executar o Monitor

```bash
# Navegue até a pasta do projeto
cd /caminho/do/projeto

# Execute o monitor
node monitor-sistema.js
```

### No Linux/Mac (pode precisar de sudo para criar pasta na raiz)

```bash
sudo node monitor-sistema.js
```

### No Windows (execute como Administrador)

```cmd
node monitor-sistema.js
```

## 📝 Arquivo de Log

- **Localização**: `/log/log.txt` (raiz do sistema de arquivos)
- **Formato**: Texto formatado com separadores visuais
- **Atualização**: Novos registros são adicionados a cada 1 segundo
- **Separação**: Cada registro é separado por uma linha em branco

### Exemplo de Log

```
═════════════════════════════════════════════════════════════
          MONITOR DE SISTEMA - LOG DE ATIVIDADES
          Início: 10/01/2026 14:30:00
═════════════════════════════════════════════════════════════

─────────────────────────────────────────────────────────────
Data/Hora:           10/01/2026 14:30:01
Sistema Operacional: Linux
Arquitetura:         x64
Processador:         Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
Tempo de Atividade:  2d 5h 23m 45s
Uso de Memória:      47.32%
─────────────────────────────────────────────────────────────

─────────────────────────────────────────────────────────────
Data/Hora:           10/01/2026 14:30:02
Sistema Operacional: Linux
Arquitetura:         x64
Processador:         Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
Tempo de Atividade:  2d 5h 23m 46s
Uso de Memória:      47.35%
─────────────────────────────────────────────────────────────
```

## ⌨️ Encerrando o Monitor

Para parar o monitoramento:

- Pressione `Ctrl+C`
- O programa encerrará graciosamente e salvará um registro final no log

## 🏗️ Estrutura do Código

### Funções Principais

1. **`criarPastaLog()`**

   - Cria a pasta `/log` se não existir
   - Trata erros de permissão

2. **`coletarDetalhes()`**

   - Coleta todas as informações do sistema
   - Retorna objeto com os dados formatados

3. **`exibirDetalhes()`**

   - Limpa o console
   - Exibe informações formatadas
   - Atualiza a cada 1 segundo

4. **`registrarLog()`**

   - Adiciona registro ao arquivo de log
   - Formata dados com separadores visuais
   - Usa `appendFileSync` para não sobrescrever

5. **`iniciarMonitoramento()`**
   - Função principal que inicia o processo
   - Configura o intervalo de 1 segundo
   - Inicializa o arquivo de log

### Funções Auxiliares

- **`formatarUptime(segundos)`**: Converte segundos em formato legível
- **`calcularUsoMemoria()`**: Calcula porcentagem de memória usada

## 🔧 Módulos Nativos Utilizados

- **`os`**: Obter informações do sistema operacional
- **`fs`**: Manipular arquivos e pastas
- **`path`**: Gerenciar caminhos de arquivos

## ⚠️ Observações Importantes

1. **Permissões**: Criar uma pasta na raiz (`/`) pode requerer privilégios administrativos
2. **Espaço em disco**: O arquivo de log cresce continuamente. Monitore o uso de espaço
3. **Performance**: O monitoramento consome recursos mínimos, mas fica em loop infinito
4. **Compatibilidade**: Testado em Linux, macOS e Windows

## 🐛 Solução de Problemas

### Erro de permissão ao criar pasta `/log`

**Linux/Mac:**

```bash
sudo node monitor-sistema.js
```

**Windows:**

- Execute o terminal como Administrador

### Alternativa: Usar pasta no diretório do projeto

Se não puder criar pasta na raiz, modifique a linha:

```javascript
// De:
const pastaLog = path.join("/", "log");

// Para:
const pastaLog = path.join(__dirname, "log");
```

## 📚 Recursos de Aprendizado

Este projeto demonstra:

- Uso do módulo `os` para informações do sistema
- Manipulação de arquivos com `fs`
- Intervalos com `setInterval`
- Tratamento de sinais do sistema (`SIGINT`)
- Formatação de dados e apresentação no console

## 📄 Licença

Projeto educacional - Livre para uso e modificação
