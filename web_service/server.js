const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.StatusCode = 200;

  const { method } = request;

  if (method === "GET") {
    response.end("Hello this get");
  }

  if (method === "POST") {
    response.end("Hello this post");
  }

  if (method === "PUT") {
    response.end("Hello this put");
  }

  if (method === "DELETE") {
    response.end("Hello this delete");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running in http://${host}:${port}`);
});
