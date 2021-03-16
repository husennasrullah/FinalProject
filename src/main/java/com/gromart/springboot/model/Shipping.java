package com.gromart.springboot.model;

public class Shipping {
    private String shippingId;
    private String shippingCompany;
    private String fee;

    public Shipping(String shippingId, String shippingCompany, String fee) {
        this.shippingId = shippingId;
        this.shippingCompany = shippingCompany;
        this.fee = fee;
    }

    public String getShippingId() {
        return shippingId;
    }

    public void setShippingId(String shippingId) {
        this.shippingId = shippingId;
    }

    public String getShippingCompany() {
        return shippingCompany;
    }

    public void setShippingCompany(String shippingCompany) {
        this.shippingCompany = shippingCompany;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }
}
