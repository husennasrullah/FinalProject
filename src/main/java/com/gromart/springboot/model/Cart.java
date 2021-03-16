package com.gromart.springboot.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Cart {
    private String cartId;
    private User user;
    private Date orderDate;
    private BigDecimal totalAmount;
    List<CartDetail> Detail;

    public Cart(String cartId, Date orderDate, BigDecimal totalAmount) {
        this.cartId = cartId;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<CartDetail> getDetail() {
        return Detail;
    }

    public void setDetail(List<CartDetail> detail) {
        Detail = detail;
    }
}
