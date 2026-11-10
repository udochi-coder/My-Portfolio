package config

import (
	"fmt"
	"os"
)

type Config struct {
	DBHost, DBUser, DBPassword, DBName, DBPort, Port, JWTSecret string
}

func Load() Config {

	return Config{
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBUser:     getEnv("DB_USER", "postgres"),
		DBPassword: getEnv("DB_PASSWORD", "postgres"),
		DBName:     getEnv("DB_NAME", "food_dash"),
		DBPort:     getEnv("DB_PORT", "5432"),
		Port:       getEnv("PORT", "8080"),
		JWTSecret:  getEnv("JWT_SECRET", "change_me"),
	}
}

func (c Config) DSN() string {

	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		c.DBHost,
		c.DBUser,
		c.DBPassword,
		c.DBName,
		c.DBPort,
	)
}

func getEnv(key, fallback string) string {

	if value := os.Getenv(key); value != "" {

		return value
	}

	return fallback
}
