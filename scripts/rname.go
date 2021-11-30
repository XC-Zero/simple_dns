package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"time"
)

func main() {
	path := "/usr/share/nginx/html/js/"
	dir, err := ioutil.ReadDir(path)
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
			file, err := ioutil.ReadFile(path + v.Name())
			if err != nil {
				log.Fatalln(err)
			}

			all := bytes.ReplaceAll(file, []byte("http://192.168.88.99:6061"), []byte(ar))
			ioutil.WriteFile(path+v.Name(), all, 00666)
		}
	}

	for {
		select {
		case <-time.After(time.Second * 100):
			continue
		}
	}
}
