package main

import (
	"backend/config"
	"backend/db"
	"backend/handlers"
	"backend/middleware"
	"backend/routes"
	"backend/ws"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {

		log.Println("No .env file - using environment variables")
	}

	configurations := config.Load()

	handlers.SetConfig(configurations)

	db.Connect(configurations)

	r := gin.Default()

	r.Use(cors.New(middleware.CORSConfig()))

	go ws.GlobalHub.Run()

	r.GET("/ws/orders/:id", handlers.ServeWS)

	routes.SetupRoutes(r)
	log.Printf("Sever starting on :%s", configurations.Port)
	r.Run(":" + configurations.Port)
}
