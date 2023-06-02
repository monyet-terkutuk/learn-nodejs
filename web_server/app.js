const http = require("http");
const fs = require("fs");
const port = 9000;

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    // Perubahan pada baris ini
    if (err) {
      res.writeHead(404);
      res.write("Error: File not found! 404");
    }
    res.write(data);
    res.end();
  });
};

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  const url = req.url;

  if (url === "/") {
    renderHTML("./index.html", res);
  }
  if (url === "/about") {
    renderHTML("./about.html", res);
  }

  if (url === "/contact") {
    renderHTML("./contact.html", res);
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}..`);
});
