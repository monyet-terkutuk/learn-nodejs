function cetakNama(nama) {
    return `Halo, nama saya ${nama}`
}

const PI = 3.14

const mahasiswa = {
    nama: "Gabriel Yonathan",
    nim: 21110395,
    jurusan: "Teknik Informatika",
    umur: 30,
    cetakMhs() {
        return `Halo, nama saya ${this.nama} dengan nim ${this.nim} jurusan saya ${this.jurusan} dan sekarang saya berumur ${this.umur} tahun.`
    }
}

class Orang {
    constructor() {
        console.log("Object orang telah di buat")
    }
}

// export sebagai objects
// module.exports.cetakNama = cetakNama
// module.exports.PI = PI
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang

// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang:Orang
// }

module.exports = {cetakNama,PI,mahasiswa,Orang}