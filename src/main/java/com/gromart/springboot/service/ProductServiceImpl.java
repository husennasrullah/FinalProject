package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAllProducts() {
        List<Product> product = productRepository.findAll();
        return product;
    }

    @Override
    public List<Product> findAllWithPaging(int page, int limit) {
        List<Product> product = productRepository.findAllWithPaging(page, limit);
        return product;
    }

    @Override
    public Map<String, Object> findProduct(int page, int limit) {
        return productRepository.findProduct(page, limit);
    }

    public Product findById(String productId) {

        return productRepository.findById(productId);
    }

    public Product findByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    public List<Product> searchId(String productId) {
        return productRepository.searchId(productId);
    }

    @Override
    public List<Product> searchName(String productName) {
        return productRepository.searchName(productName);
    }

    @Override
    public Map<String, Object> findNameWithPaging(String productName, int page, int limit) {
        return productRepository.findNameWithPaging(productName, page, limit);
    }

    @Override
    public Map<String, Object> findIdWithPaging(String productId, int page, int limit) {
        return productRepository.findIdWithPaging(productId, page, limit);
    }

    public void saveProduct(Product product) {
        synchronized (this) {    //  Critical section synchronized
            productRepository.saveProduct(product);
        }
    }

    public void updateProduct(Product product) {
        synchronized (this) {    //  Critical section synchronized
            productRepository.updateProduct(product);
        }
    }


    public void deleteProductById(String productId) {
        synchronized (this) {    //  Critical section synchronized
            productRepository.deleteProductById(productId);
        }
    }

    public boolean isProductExist(Product product) {

        return productRepository.findByName(product.getProductName()) != null;
    }

    @Override
    public int findAllCount() {
        return productRepository.findAllCount();
    }

    @Override
    public void changeStock(String productId, int stock) {
        synchronized (this) {    //  Critical section synchronized
            productRepository.changeStock (productId, stock);
        }
    }


    public void deleteAllProducts() {
        productRepository.deleteAllProducts();
    }

}
