package com.gromart.springboot.model;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.util.Date;

public class Product {


    private String productId;

    @NotBlank (message = "Field Product Name Cannot be Null")
    private String productName;

    @NotBlank (message = "Field Category Cannot be Null")
    private String category;

    @NotNull (message = "unit price Cannot be null")
    private BigDecimal unitPrice;

    @PositiveOrZero (message = "field stock not valid")
    private int stock;

    @NotBlank (message = "Field Description Cannot be Null")
    private String description;


    private String createdBy;
    private Date createdDate;
    private String updatedBy;
    private Date updatedDate;

    public Product (){

    }

    public Product(
            String productId,
            String productName,
            String category,
            BigDecimal unitPrice,
            int stock
    )
    {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
        this.unitPrice = unitPrice;
        this.stock = stock;
    }

    public Product(
            String productId,
            String productName,
            String category,
            BigDecimal unitPrice,
            int stock,
            String description,
            String createdBy,
            Date createdDate,
            String updatedBy,
            Date updatedDate)
    {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
        this.unitPrice = unitPrice;
        this.stock = stock;
        this.description = description;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

}
