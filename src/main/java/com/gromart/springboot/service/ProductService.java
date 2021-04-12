package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;
import java.util.Map;

public interface ProductService {

    Map<String, Object> findProduct(int page, int limit);

    Map<String, Object> findNameWithPaging(String productName, int page, int limit);

    Map<String, Object> findIdWithPaging(String productId, int page, int limit);

    Map<String, Object> findStatusWithPaging(Boolean status, int page, int limit);

    Map<String, Object> findStockWithPaging(int stock, int page, int limit);

    Product findById(String productId);

    void saveProduct(Product product);

    void updateProduct(Product product);

    void deleteProductById(String productId);

    boolean isProductExist(Product product);

//    List<Product> findAllProducts();
//
//    List<Product> findAllWithPaging(int page, int limit);
//
//    void deleteAllProducts();
//
//    Product findByName(String productName);
//
//    List<Product> searchId(String productId);
//
//    List<Product> searchName(String productName);
//
//    int findAllCount ();
}
