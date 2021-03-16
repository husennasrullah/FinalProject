package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> findAllProducts();

    List<Product> findAllWithPaging(int page, int limit);

    Product findById(String productId);

    Product findByName(String productName);

    List<Product> searchId(String productId);

    List<Product> searchName(String productName);

    void saveProduct(Product product);

    void updateProduct(Product product);

    void deleteProductById(String productId);

    void deleteAllProducts();

    boolean isProductExist(Product product);

    int findAllCount ();

    int findAllCountId ();

    int findAllCountName ();



}
