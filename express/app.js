const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContacts } = require("./utils/contacts");

const app = express();
const port = 9000;

app.set("view engine", "ejs");
// third party midlleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Siti Ayuni",
      email: "siti@ayuni.com",
      prodi: "Teknik Informatika - RPL",
    },
    {
      nama: "Oryza Sativa",
      email: "oryza@sativa.com",
      prodi: "Teknik Informatika - SI",
    },
    {
      nama: "Yang Yang",
      email: "yang@yang.com",
      prodi: "Teknik Informatika - SI",
    },
  ];
  res.render("index", {
    layout: "layouts/main",
    nama: "Gabriel Yonathan",
    title: "Home Page",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main",
    title: "About Page",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContacts();
  res.render("contact", {
    layout: "layouts/main",
    title: "Contact Page",
    contacts: contacts,
  });
});

app.get("/contact/:nama", (req, res) => {
  // const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main",
    title: "Detail Contact Page",
    // contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`App listening in port http://localhost:${port}`);
});
