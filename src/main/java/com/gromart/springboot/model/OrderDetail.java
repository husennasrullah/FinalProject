package com.gromart.springboot.model;

import java.math.BigDecimal;

public class OrderDetail {
    private String detailId;
    private String OrderId;
    private Product product;
    private int quantity;
    private BigDecimal subTotal;

    public OrderDetail(String detailId, String orderId, int quantity, BigDecimal subTotal) {
        this.detailId = detailId;
        OrderId = orderId;
        this.quantity = quantity;
        this.subTotal = subTotal;
    }

    public String getDetailId() {
        return detailId;
    }

    public void setDetailId(String detailId) {
        this.detailId = detailId;
    }

    public String getOrderId() {
        return OrderId;
    }

    public void setOrderId(String orderId) {
        OrderId = orderId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }
}
