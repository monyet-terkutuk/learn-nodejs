const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContacts,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contacts");
const { check, body, validationResult } = require("express-validator");

const app = express();
const port = 9000;

app.set("view engine", "ejs");
// third party midlleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main",
    nama: "Gabriel Yonathan",
    title: "Home Page",
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

// form tambah contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main",
    title: "Add Contact",
  });
});

app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama contact sudah terdaftar!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "No Handphone tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      res.redirect("/contact");
    }
  }
);

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main",
    title: "Detail Contact Page",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`App listening in port http://localhost:${port}`);
});
