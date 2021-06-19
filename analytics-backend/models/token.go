package models

type Token struct {
	AccessToken string
	ReportId    string
	EmbedUrl    string
}

func NewToken(token string, reportid string, embedurl string) Token {
	return Token{
		AccessToken: token,
		ReportId:    reportid,
		EmbedUrl:    embedurl,
	}
}
