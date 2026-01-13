const http = require("node:http");

const server = http.createServer((req, res) => {
  const path = req.url;

  switch (path) {
    case "/":
      res.writeHead(200, {"Content-type": "text/html; charset=utf-8"}); // Define o tipo de conteúdo como HTML
      res.write("<h1>Você está na página inicial</h1>");
      break;
    case "/artigos":
      res.writeHead(200);
      res.write("Artigos");
      break;
    case "/sobre":
      res.writeHead(200);
      res.write("Página 'Sobre'");
      break;
    default:
      res.writeHead(404);
      res.write("Página não encontrada");
      break;
  }

  res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}/`);
});
