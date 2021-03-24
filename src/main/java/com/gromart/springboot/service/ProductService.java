package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {

    List<Product> findAllProducts();

    List<Product> findAllWithPaging(int page, int limit);

    Map<String, Object> findProduct (int page, int limit);

    Product findById(String productId);

    Product findByName(String productName);

    List<Product> searchId(String productId);

    List<Product> searchName(String productName);

    Map<String, Object> findNameWithPaging (String productName, int page, int limit);

    Map<String, Object> findIdWithPaging (String productId, int page, int limit);

    void saveProduct(Product product);

    void updateProduct(Product product);

    void deleteProductById(String productId);

    void deleteAllProducts();

    boolean isProductExist(Product product);

    int findAllCount ();

    void changeStock (String productId, int stock);






}
