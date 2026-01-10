const os = require("node:os");

// Informações sobre o sistema operacional
console.log("Plataforma:", os.platform());
console.log("Arquitetura:", os.arch());
console.log("Número de CPUs:", os.cpus().length);
console.log("Memória total (bytes):", os.totalmem());
console.log("Memória livre (bytes):", os.freemem());
console.log("Diretório home do usuário:", os.homedir());
console.log("Tempo de atividade do sistema (segundos):", os.uptime());
console.log("Informações da CPU:", os.cpus());
console.log("Informações da rede:", os.networkInterfaces());
console.log(os.cpus()[0]);
console.log(os.userInfo());
console.log(os.hostname());
console.log(os.type());
console.log(os.release());
