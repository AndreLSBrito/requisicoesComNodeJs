const http = require('node:http');

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });

    if (request.url === '/usuario') {
      response.end(
        JSON.stringify({
          message: 'Rota de usuario',
        })
      );
    }

    if (request.url === '/login') {
      response.end(
        JSON.stringify({
          message: 'Rota de login',
        })
      );
    }

    response.end(
      JSON.stringify({
        message: 'Hello World!',
      })
    );
  })
  .listen(9999, () => console.log('Servidor Rodando na porta 9999'));
