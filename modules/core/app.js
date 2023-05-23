// panggil core module
const fs = require('fs');

// // menuliskan string ke file (synchronus)
// fs.writeFileSync('data/test.txt', 'Writer secara syncronus!');

// try {
//     // menuliskan string ke file (synchronus)
//     fs.writeFileSync('./data/test.txt', 'Writer secara syncronus!');
// } catch (error) {
//     console.log(error)
// }

// menuliskan file secara asyncronus
// fs.writeFile('data/test.txt', 'Write asyncronus!', (err) => {
//     console.log(err);
// });

// membaca isi file
// const data = fs.readFileSync('./data/test.txt', 'utf-8')
// console.log(data)

// // membaca file secara asyncronus
// fs.readFile('./data/test.txt', 'utf-8', (e,data) => {
//     if (e) throw error;
//     console.log(data)
// })

const readline = require('readline');
const { json } = require('stream/consumers');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
})

rl.question('Masukan nama anda disini! : ', (nama) => {
    rl.question('Masukan umur : ', (umur) => {
        const data = { nama, umur };
        const file = fs.readFileSync('test.json', 'utf-8');
        const contacts = JSON.parse(file);

        contacts.push(data);

        fs.writeFileSync('test.json', JSON.stringify(contacts));

        rl.close();
    })
})