package main

import (
	"net/http"

	"github.com/gprince349/Deployment-App/analytics-backend/controllers"
)

func main() {
	controllers.RegisterControllers()
	http.ListenAndServe(":3000", nil)
}
