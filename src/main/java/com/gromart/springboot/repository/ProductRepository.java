package com.gromart.springboot.repository;


import com.gromart.springboot.model.Product;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ProductRepository {

    Map<String, Object> findProduct (int page, int limit);

    Map<String, Object> findNameWithPaging (String productName, int page, int limit);

    Map<String, Object> findIdWithPaging (String productId, int page, int limit);

    Map<String, Object> findStatusWithPaging (Boolean status, int page, int limit);

    Map<String, Object> findStockWithPaging (int stock, int page, int limit);

    void saveProduct(Product product);

    void updateProduct(Product product);

    void deleteProductById(String productId);

    Product findById(String productId);

    Product findByName(String productName);

    int findAllCount ();

//    List<Product> findAll();
//
//    List<Product> findAllWithPaging(int page, int limit);
//
//    List<Product> searchId(String productId);
//
//    List<Product> searchName(String productName);
//
//    void deleteAllProducts();
//
//    boolean isProductExist(Product product);
//
//    void changeStock (String productId, int stock);

}
