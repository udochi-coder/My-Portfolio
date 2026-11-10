package models

import "gorm.io/gorm"

type OrderEvent struct {
	gorm.Model

	OrderID     uint        `json:"order_id"`
	OrderStatus OrderStatus `json:"status"`
	Note        string      `json:"note"`
}
