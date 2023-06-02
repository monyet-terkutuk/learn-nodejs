const fs = require(`fs`);
const chalk = require("chalk");
const validasi = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

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

// // membungkus semua pertanyaan menjadi promise
// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, rejects) => {
//     rl.question(pertanyaan, (nama) => {
//       resolve(nama);
//     });
//   });
// };

// const pertanyaan2 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question("Masukan Email : ", (email) => {
//       resolve(email);
//     });
//   });
// };

const loadContacts = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  // const file = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(file);
  const contacts = loadContacts();

  // cek data yang duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.yellow.bold.bgRed("Contact sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  // validasi email
  if (email) {
    if (!validasi.isEmail(email)) {
      console.log(chalk.yellow.bold.bgRed("Email tidak valid!"));
      return false;
    }
  }

  // validasi noHP
  if (!validasi.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.yellow.bold.bgRed("No Handphone tidak valid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.white.bold.bgGreen("Data Berhasil Tersimpan!"));
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

const listContacts = () => {
  const contacts = loadContacts();
  console.log(chalk.red.bold("Daftar Kontak : "));
  contacts.forEach((contact, i) => {
    console.log(
      chalk.yellow.bold(`${i + 1} . ${contact.nama} - ${contact.noHP}`)
    );
  });
};

const detailContact = (nama) => {
  const contacts = loadContacts();
  const data = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!data) {
    console.log(
      chalk.yellow.bold.bgRed(`Data dengan nama ${nama} tidak di temukan!`)
    );
    return false;
  }

  console.log(chalk.green.bold.bgBlue(`Data Contact ${data.nama}`));
  console.log(chalk.yellow.bold(`No HP : ${data.noHP}`));
  if (data.email) {
    console.log(chalk.yellow.bold(`Email : ${data.email}`));
  }
};

const deleteContact = (nama) => {
  const contacts = loadContacts();

  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(
      chalk.yellow.bold.bgRed(`Data dengan nama ${nama} tidak di temukan!`)
    );
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(
    chalk.white.bold.bgGreen(`Data contact ${nama} berhasil dihapus!!`)
  );
};

module.exports = { simpanContact, listContacts, detailContact, deleteContact };
