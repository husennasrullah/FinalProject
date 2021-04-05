package com.gromart.springboot.repository;


import com.gromart.springboot.model.Product;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ProductRepository {
    List<Product> findAll();

    List<Product> findAllWithPaging(int page, int limit);

    Map<String, Object> findProduct (int page, int limit);

    void saveProduct(Product product);

    Product findById(String productId);

    Product findByName(String productName);

    List<Product> searchId(String productId);

    List<Product> searchName(String productName);

    Map<String, Object> findNameWithPaging (String productName, int page, int limit);

    Map<String, Object> findIdWithPaging (String productId, int page, int limit);

    Map<String, Object> findStatusWithPaging (Boolean status, int page, int limit);

    Map<String, Object> findStockWithPaging (int stock, int page, int limit);

    void updateProduct(Product product);

    void deleteProductById(String productId);

    void deleteAllProducts();

    boolean isProductExist(Product product);

    int findAllCount ();

    void changeStock (String productId, int stock);

}
