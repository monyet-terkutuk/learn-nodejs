// const { tulisPertanyaan, simpanContact } = require("./contacts");
const contacts = require("./contacts");

const main = async () => {
  const nama = await contacts.tulisPertanyaan("Masukan Nama Anda : ");
  const email = await contacts.tulisPertanyaan("Masukan Email Anda : ");
  const noHP = await contacts.tulisPertanyaan("Masukan HP Anda : ");

  contacts.simpanContact(nama, email, noHP);
};

main();
