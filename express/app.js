// const http = require("http");
// const fs = require("fs");

const express = require("express");
app = express();
const port = 9000;

app.get("/", (req, res) => {
  // res.send("Hello Word!");
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("ini about");
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  // res.send("ini contact");
  res.sendFile("./contact.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`App listening in port http://localhost:${port}`);
});

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     // Perubahan pada baris ini
//     if (err) {
//       res.writeHead(404);
//       res.write("Error: File not found! 404");
//     }
//     res.write(data);
//     res.end();
//   });
// };

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "text/html",
//   });

//   const url = req.url;

//   if (url === "/") {
//     renderHTML("./index.html", res);
//   }
//   if (url === "/about") {
//     renderHTML("./about.html", res);
//   }

//   if (url === "/contact") {
//     renderHTML("./contact.html", res);
//   }
// });

// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}..`);
// });
