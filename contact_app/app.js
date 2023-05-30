const yargs = require("yargs");
const contacts = require("./contacts");
// cara untuk mengambil argument dari terminal
// console.log(process.argv);

// console.log(yargs.argv);

// yargs.command(
//   "add",
//   "menambahkan contact baru",
//   () => {},
//   (argv) => {
//     console.log(argv.name);
//   }
// );

yargs.command({
  command: "add",
  describe: "menambahkan contact baru",
  builder: {
    name: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email Anda",
      demandOption: false,
      type: "string",
    },
    noHP: {
      describe: "No HandPhone",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      noHP: argv.noHP,
    };
    contacts.simpanContact(contact.name, contact.email, contact.noHP);
  },
});

yargs.parse();

// // const { tulisPertanyaan, simpanContact } = require("./contacts");
// const contacts = require("./contacts");

// const main = async () => {
//   const nama = await contacts.tulisPertanyaan("Masukan Nama Anda : ");
//   const email = await contacts.tulisPertanyaan("Masukan Email Anda : ");
//   const noHP = await contacts.tulisPertanyaan("Masukan HP Anda : ");

//   contacts.simpanContact(nama, email, noHP);
// };

// main();
