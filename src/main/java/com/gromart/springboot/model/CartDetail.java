package com.gromart.springboot.model;

import java.math.BigDecimal;

public class CartDetail {
    private String detailId;
    private String cartId;
    private Product product;
    private String quantity;


    public CartDetail(String detailId, String cartId, String quantity) {
        this.detailId = detailId;
        this.cartId = cartId;
        this.quantity = quantity;

    }

    public String getDetailId() {
        return detailId;
    }

    public void setDetailId(String detailId) {
        this.detailId = detailId;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
