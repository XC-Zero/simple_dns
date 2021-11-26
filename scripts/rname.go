package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

func main() {
	dir, err := ioutil.ReadDir("./dist/js")
	if err != nil {
		log.Fatalln(err)
	}

	ar := os.Getenv("ADDR")
	if ar == "" {
		log.Fatalln("SERVER ADDR ENV IS NULL")
	}

	for _, v := range dir {
		if v.IsDir() {
			continue
		}

		if strings.Contains(v.Name(), "app.") && strings.Contains(v.Name(), ".js") {
			file, err := ioutil.ReadFile("./dist/js/" + v.Name())
			if err != nil {
				log.Fatalln(err)
			}

			all := bytes.ReplaceAll(file, []byte("http://192.168.88.99:6061"), []byte(ar))
			ioutil.WriteFile("./dist/js/"+v.Name(), all, 00666)
		}
	}
}
