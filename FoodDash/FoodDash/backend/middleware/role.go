package middleware

import (
	"backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RequireStaff(c *gin.Context) {

	user, _ := c.MustGet("currentUser").(models.User)

	if user.Role != models.RoleStaff {

		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "staff access required"})

		return
	}

	c.Next()
}
