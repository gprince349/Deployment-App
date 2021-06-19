package models

type Embed struct {
	context     string   //`json:"@odata.context"`
	Id          string   //`json:"id"`
	reportType  string   //`json:"reportType"`
	name        string   //`json:"name"`
	webUrl      string   //`json:"webUrl"`
	EmbedUrl    string   //`json:"embedUrl"`
	isOwnedByMe bool     //`json:"isOwnedByMe"`
	datasetId   string   //`json:"datasetId"`
	users       []string //`json:"users"`
}

func NewEmbed() *Embed {
	return &Embed{}
}

func (e Embed) GetEmbedurl() string {
	// fmt.Println(e.EmbedUrl)
	return e.EmbedUrl
}

func (e Embed) GetReportId() string {
	return e.Id
}

// func (e Embed) SetEmbedUrl(v string) {
// 	e.EmbedUrl = v
// }

// func (e Embed) SetId(v string) {
// 	e.Id = v
// }
