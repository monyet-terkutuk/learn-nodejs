const { rejects } = require("assert");
const { promises } = require("dns");
const fs = require(`fs`);
const { resolve } = require("path");
const readline = require("readline");
const { json } = require("stream/consumers");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// membuat folder data jika tidak ada.
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika tidak ada.
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

// membungkus semua pertanyaan menjadi promise
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, rejects) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

// const pertanyaan2 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question("Masukan Email : ", (email) => {
//       resolve(email);
//     });
//   });
// };

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  rl.close();
};

// rl.question("Masukan Nama : ", (nama) => {
//   rl.question("Masukan No Telephone : ", (telephone) => {
//     const contact = { nama, telephone };
//     const file = fs.readFileSync("data/contacts.json", "utf-8");
//     const contacts = JSON.parse(file);

//     contacts.push(contact);

//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

//     rl.close();
//   });
// });

module.exports = { tulisPertanyaan, simpanContact };
