package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gprince349/Deployment-App/analytics-backend/models"
)

func GetEmbeddDetail(accesstoken string) *models.Embed {

	url := POWERBI_END_POINT + REPORT_ID

	var bearer = "Bearer " + accesstoken

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println(err)
	}

	req.Header.Add("Authorization", bearer)

	//sending request using http client
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error on response ", err)
	}
	defer resp.Body.Close()

	embedobj := models.NewEmbed()
	err1 := json.NewDecoder(resp.Body).Decode(&embedobj)
	if err1 != nil {
		log.Println("Error while reading embed response", err1)
	}

	// byteval, err := ioutil.ReadAll(resp.Body)
	// if err != nil {
	// 	log.Println("Error while reading embed response", err)
	// }
	// var rawString map[string]string
	// json.Unmarshal(byteval, &rawString)
	// for k, v := range rawString {
	// 	if k == "id" {
	// 		embedobj.Id = v
	// 	}
	// 	if k == "embedUrl" {
	// 		fmt.Println(v)
	// 		embedobj.EmbedUrl = v
	// 	}
	// }

	fmt.Println(embedobj.GetEmbedurl())
	fmt.Println(embedobj.GetReportId())
	// fmt.Print(json.NewDecoder(resp.Body).Decode(Embed))
	// log.Println(string([]byte(body)))

	return embedobj
}
