const fs = require(`fs`);

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika tidak ada.
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

// ambil semua data contact di contacts.json
const loadContacts = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// ambil data contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// menimpa file contacts.json
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// menambah contact
const addContact = (contact) => {
  contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.nama === nama);
};

const deleteContact = (nama) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContacts,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
};
