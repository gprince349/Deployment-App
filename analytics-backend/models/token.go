package models

type Token struct {
	AccessToken string
}

func NewToken(token string) Token {
	return Token{
		AccessToken: token,
	}
}
