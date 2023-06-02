package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"fmt"
	"os"
)

type Contact struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	NoHP  string `json:"noHP"`
}

func main() {
	nama := flag.String("nama", "", "Nama Lengkap")
	email := flag.String("email", "", "Email Anda")
	noHP := flag.String("nohp", "", "No Handphone Anda")

	flag.Parse()

	data := Contact{
		Name:  *nama,
		Email: *email,
		NoHP:  *noHP,
	}

	contact, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
		return
	}

	CreateFileAndFolder()
	AppendContact(contact)

}

func AppendContact(contact []byte) {
	contacts, err := os.ReadFile("./data/contacts.json")
	if err != nil {
		fmt.Println(err)
		return
	}

	// Menambahkan elemen ke dalam slice menggunakan append
	contacts = append(contacts, contact...)

	fmt.Println(string(contacts))

	file, err := os.OpenFile("./data/contacts.json", os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close() // Tutup file setelah selesai

	writer := bufio.NewWriter(file)
	_, err = writer.Write(contacts)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

}

func CreateFileAndFolder() {
	pathFolder := "./data"
	pathFile := "./data/contacts.json"

	folder, _ := Exists(pathFolder)
	if !folder {
		// buat folder
		err := os.Mkdir("data", 0755)
		if err != nil {
			fmt.Println(err)
			return
		}
	}

	file, _ := Exists(pathFile)
	if !file {
		// buat file
		file, err := os.Create("./data/contacts.json")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer file.Close()

		_, err = file.WriteString("[]")
		if err != nil {
			fmt.Println(err)
			return
		}
	}

}

func Exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
