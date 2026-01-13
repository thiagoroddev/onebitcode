const os = require("os");
const fs = require("fs");
const path = require("path");

// Caminho para a pasta e arquivo de log NO DIRETÓRIO DO PROJETO
// (alternativa caso não tenha permissão para criar na raiz do sistema)
const pastaLog = path.join(__dirname, "log");
const arquivoLog = path.join(pastaLog, "log.txt");

/**
 * Função para criar a pasta de log se não existir
 */
function criarPastaLog() {
  try {
    if (!fs.existsSync(pastaLog)) {
      fs.mkdirSync(pastaLog, {recursive: true});
      console.log(`✅ Pasta de log criada: ${pastaLog}`);
    }
  } catch (erro) {
    console.error(`❌ Erro ao criar pasta de log: ${erro.message}`);
    process.exit(1);
  }
}

/**
 * Função para formatar o tempo de atividade do sistema
 * @param {number} segundos - Tempo em segundos
 * @returns {string} Tempo formatado
 */
function formatarUptime(segundos) {
  const dias = Math.floor(segundos / 86400);
  const horas = Math.floor((segundos % 86400) / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segs = Math.floor(segundos % 60);

  return `${dias}d ${horas}h ${minutos}m ${segs}s`;
}

/**
 * Função para calcular o uso de memória em porcentagem
 * @returns {string} Porcentagem de uso formatada
 */
function calcularUsoMemoria() {
  const totalMemoria = os.totalmem();
  const memoriaLivre = os.freemem();
  const memoriaUsada = totalMemoria - memoriaLivre;
  const percentualUso = (memoriaUsada / totalMemoria) * 100;

  return percentualUso.toFixed(2);
}

/**
 * Função para coletar detalhes do computador
 * @returns {object} Objeto com os detalhes do sistema
 */
function coletarDetalhes() {
  const cpus = os.cpus();

  return {
    timestamp: new Date().toLocaleString("pt-BR"),
    nomeOS: os.type(),
    arquitetura: os.arch(),
    modeloProcessador: cpus[0].model,
    tempoAtividade: formatarUptime(os.uptime()),
    usoMemoria: calcularUsoMemoria(),
  };
}

/**
 * Função para exibir detalhes no console
 */
function exibirDetalhes() {
  const detalhes = coletarDetalhes();

  console.clear();
  console.log("═══════════════════════════════════════════════════════════");
  console.log("           🖥️  MONITOR DE SISTEMA - NODE.JS");
  console.log("═══════════════════════════════════════════════════════════");
  console.log();
  console.log(`⏰ Data/Hora:          ${detalhes.timestamp}`);
  console.log(`💻 Sistema Operacional: ${detalhes.nomeOS}`);
  console.log(`🔧 Arquitetura:         ${detalhes.arquitetura}`);
  console.log(`⚙️  Processador:         ${detalhes.modeloProcessador}`);
  console.log(`⏱️  Tempo de Atividade:  ${detalhes.tempoAtividade}`);
  console.log(`📊 Uso de Memória:      ${detalhes.usoMemoria}%`);
  console.log();
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`📝 Log salvo em: ${arquivoLog}`);
  console.log("Pressione Ctrl+C para encerrar o monitoramento");
  console.log("═══════════════════════════════════════════════════════════");
}

/**
 * Função para registrar detalhes no arquivo de log
 */
function registrarLog() {
  const detalhes = coletarDetalhes();

  // Formatar o registro de log
  const registro = `
─────────────────────────────────────────────────────────────
Data/Hora:           ${detalhes.timestamp}
Sistema Operacional: ${detalhes.nomeOS}
Arquitetura:         ${detalhes.arquitetura}
Processador:         ${detalhes.modeloProcessador}
Tempo de Atividade:  ${detalhes.tempoAtividade}
Uso de Memória:      ${detalhes.usoMemoria}%
─────────────────────────────────────────────────────────────

`;

  try {
    // Adicionar o registro ao arquivo (append)
    fs.appendFileSync(arquivoLog, registro);
  } catch (erro) {
    console.error(`❌ Erro ao escrever no log: ${erro.message}`);
  }
}

/**
 * Função principal que executa o monitoramento
 */
function iniciarMonitoramento() {
  console.log("🚀 Iniciando monitor de sistema...\n");

  // Criar pasta de log se não existir
  criarPastaLog();

  // Adicionar cabeçalho inicial no arquivo de log
  const cabecalho = `
═════════════════════════════════════════════════════════════
          MONITOR DE SISTEMA - LOG DE ATIVIDADES
          Início: ${new Date().toLocaleString("pt-BR")}
═════════════════════════════════════════════════════════════

`;

  try {
    fs.writeFileSync(arquivoLog, cabecalho);
    console.log(`✅ Arquivo de log inicializado: ${arquivoLog}\n`);
  } catch (erro) {
    console.error(`❌ Erro ao inicializar arquivo de log: ${erro.message}`);
    process.exit(1);
  }

  // Executar imediatamente a primeira vez
  exibirDetalhes();
  registrarLog();

  // Configurar execução a cada 1 segundo (1000ms)
  setInterval(() => {
    exibirDetalhes();
    registrarLog();
  }, 1000);
}

// Tratar encerramento gracioso (Ctrl+C)
process.on("SIGINT", () => {
  console.log("\n\n🛑 Monitoramento encerrado pelo usuário.");

  const rodape = `
═════════════════════════════════════════════════════════════
          Monitoramento Encerrado
          Término: ${new Date().toLocaleString("pt-BR")}
═════════════════════════════════════════════════════════════
`;

  try {
    fs.appendFileSync(arquivoLog, rodape);
    console.log(`✅ Log final registrado em: ${arquivoLog}`);
  } catch (erro) {
    console.error(`❌ Erro ao finalizar log: ${erro.message}`);
  }

  process.exit(0);
});

// Iniciar o monitoramento
iniciarMonitoramento();
