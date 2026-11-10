package handlers

import (
	"net/http"

	"backend/db"
	"backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PlaceOrder(c *gin.Context) {
	user, _ := c.MustGet("currentUser").(models.User)

	var input models.PlaceOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Type == models.TypeDelivery && input.DeliveryAddress == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "delivery address required"})
		return
	}

	cart, err := getOrCreateCart(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var fullCart models.Cart
	if err := db.DB.Preload("CartItems.MenuItem").First(&fullCart, cart.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(fullCart.CartItems) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart is empty"})
		return
	}

	var total float64
	for _, item := range fullCart.CartItems {
		total += item.MenuItem.Price * float64(item.Quantity)
	}

	var order models.Order
	err = db.DB.Transaction(func(tx *gorm.DB) error {
		order = models.Order{
			UserID:          user.ID,
			Type:            input.Type,
			Status:          models.StatusReceived,
			TotalAmount:     total,
			DeliveryAddress: input.DeliveryAddress,
		}

		if err := tx.Create(&order).Error; err != nil {
			return err
		}

		if err := tx.Create(&models.OrderEvent{
			OrderID:     order.ID,
			OrderStatus: models.StatusReceived,
		}).Error; err != nil {
			return err
		}

		for _, ci := range fullCart.CartItems {
			orderItem := models.OrderItem{
				OrderID:             order.ID,
				MenuItemID:          ci.MenuItemID,
				Quantity:            ci.Quantity,
				UnitPrice:           ci.MenuItem.Price,
				SpecialInstructions: ci.SpecialInstructions,
			}
			if err := tx.Create(&orderItem).Error; err != nil {
				return err
			}
		}

		return tx.Where("cart_id = ?", cart.ID).Delete(&models.CartItem{}).Error
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Preload("Items.MenuItem").Preload("Events").First(&order, order.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": order})
}

func GetMyOrders(c *gin.Context) {
	user, _ := c.MustGet("currentUser").(models.User)

	var orders []models.Order
	if err := db.DB.Where("user_id = ?", user.ID).
		Order("created_at desc").
		Preload("Items.MenuItem").
		Preload("Events").
		Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orders})
}

func GetOrder(c *gin.Context) {
	user, _ := c.MustGet("currentUser").(models.User)

	var order models.Order
	if err := db.DB.
		Where("id = ? AND user_id = ?", c.Param("id"), user.ID).
		Preload("Items.MenuItem").
		Preload("Events").
		First(&order).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}
