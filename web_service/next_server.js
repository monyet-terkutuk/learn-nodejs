const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.setHeader("X-Powered-By", "NodeJS");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.end("<h1>Ini adalah Home Page</h1>");
    } else {
      response.end(
        `<h1>Halaman tidak bisa di akses dengan method ${method} request!</h1>`
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end("<h1>Halo! Ini adalah halaman about.</h1>");
    } else if (method === "POST") {
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body.toString);
        const { name } = JSON.parse(body);
        response.end(`<h1>Halo ${name}, ini adalah halaman about!</h1>`);
      });
    } else {
      esponse.end(
        `<h1>Halaman tidak bisa di akses dengan method ${method} request!</h1>`
      );
    }
  } else {
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running in http://${host}:${port}`);
});
