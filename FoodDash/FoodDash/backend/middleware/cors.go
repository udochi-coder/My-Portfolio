package middleware

import (
	"os"
	"strings"

	"github.com/gin-contrib/cors"
)

func CORSConfig() cors.Config {
	config := cors.DefaultConfig()

	allowedHosts := os.Getenv("ALLOWED_HOSTS")

	if allowedHosts != "" {
		config.AllowOrigins = strings.Split(allowedHosts, ",")
	} else {
		config.AllowOrigins = []string{
			"http://localhost:5173",
			"http://127.0.0.1:5173",
		}
	}

	config.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Authorization",
	}

	config.AllowMethods = []string{
		"GET",
		"POST",
		"PUT",
		"PATCH",
		"DELETE",
		"OPTIONS",
	}

	config.AllowCredentials = true

	return config
}