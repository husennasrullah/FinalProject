package com.gromart.springboot.repository;


import com.gromart.springboot.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    List<Product> findAll();

    List<Product> findAllWithPaging(int page, int limit);

    void saveProduct(Product product);

    Optional<Product> findById(String productId);

    List <Product> findByName(String productName);

    List<Product> searchId(String productId);

    List<Product> searchName(String productName);

    void updateProduct(Product product);

    void deleteProductById(String productId);

    void deleteAllProducts();

    boolean isProductExist(Product product);

    int findAllCount ();

    int findAllCountId ();

    int findAllCountName ();

}
