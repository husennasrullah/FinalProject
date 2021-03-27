package com.gromart.springboot.controller;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.service.ProductService;
import com.gromart.springboot.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gromart/")
public class ProductController {

    public static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    // -------------------Retrieve All Products--------------------------------------------

    @RequestMapping(value = "/product/", method = RequestMethod.GET)
    public ResponseEntity<List<Product>> listAllProducts() {
        List<Product> products = productService.findAllProducts();
        if (products.isEmpty()) {
            return new ResponseEntity<>(products, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // -------------------Retrieve Single Product------------------------------------------

    @RequestMapping(value = "/product/{productId}", method = RequestMethod.GET)
    public ResponseEntity<?> getProductById(@PathVariable("productId") String productId) {
        logger.info("Fetching Product with id {}", productId);
        Product product = productService.findById(productId);
        if (product == null) {
            logger.error("Product with id {} not found.", productId);
            return new ResponseEntity<>(new CustomErrorType("Product with id " + productId + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @RequestMapping(value = "/product/id/{productId}", method = RequestMethod.GET)
    public ResponseEntity<?> searchById(@PathVariable("productId") String productId) {
        logger.info("Fetching Product with id {}", productId);
        List<Product> products = productService.searchId(productId);
        if (products == null) {
            logger.error("Product with id {} not found.", productId);
            return new ResponseEntity<>(new CustomErrorType("Product with id " + productId + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @RequestMapping(value = "/product/name/{productName}", method = RequestMethod.GET)
    public ResponseEntity<?> searchByName(@PathVariable("productName") String productName) {
        logger.info("Fetching Product with name {}", productName);
        List<Product> products = productService.searchName(productName);
        if (products == null) {
            logger.error("Product with name {} not found.", productName);
            return new ResponseEntity<>(new CustomErrorType("Product with name " + productName + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


//    //------------------------get with paging---------------------------------
//    @RequestMapping(value = "/product/paging/", method = RequestMethod.GET)
//    public ResponseEntity<?>getProductWithPaging(@RequestParam int page, @RequestParam int limit){
//        List<Product> products = productService.findAllWithPaging(page, limit);
//        if(products.isEmpty()){
//            return new ResponseEntity<>(products,HttpStatus.NOT_FOUND);
//        }
//        else{
//            return new ResponseEntity<>(products,HttpStatus.OK);
//        }
//    }

    //------------------------get with paging neww---------------------------------
    @RequestMapping(value = "/product/paging/", method = RequestMethod.GET)
    public ResponseEntity<?>getProductWithPaging(@RequestParam int page, @RequestParam int limit){
        Map<String, Object> map = productService.findProduct(page, limit);
        if(map.isEmpty()){
            return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(map,HttpStatus.OK);
        }
    }

    //------------------------get name with paging ---------------------------------
    @RequestMapping(value = "/product/findname/{productName}/", method = RequestMethod.GET)
    public ResponseEntity<?>getNameWithPaging(@PathVariable("productName") String productName, @RequestParam int page, @RequestParam int limit){
        Map<String, Object> map = productService.findNameWithPaging(productName, page, limit);
        if(map.isEmpty()){
            return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(map,HttpStatus.OK);
        }
    }

    //------------------------get Id with paging ---------------------------------
    @RequestMapping(value = "/product/findid/{productId}/", method = RequestMethod.GET)
    public ResponseEntity<?>getIdWithPaging(@PathVariable("productId") String productId, @RequestParam int page, @RequestParam int limit){
        Map<String, Object> map = productService.findIdWithPaging(productId, page, limit);
        if(map.isEmpty()){
            return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(map,HttpStatus.OK);
        }
    }


    // -------------------Create a Product-------------------------------------------

    @RequestMapping(value = "/product/", method = RequestMethod.POST)
    public ResponseEntity<?> createProduct(@Valid @RequestBody Product product, Errors error) {
        logger.info("Creating Product : {}", product);

        if (error.hasErrors()){
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        if (productService.isProductExist(product)) {
            logger.error("Unable to create. A Product with name {} already exist", product.getProductName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create, Product " +
                    product.getProductName() + " already exist."), HttpStatus.CONFLICT);
        }

        productService.saveProduct(product);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/product/{productId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProduct(@PathVariable("productId") String productId, @Valid @RequestBody Product product) {
        logger.info("Updating Product with id {}", productId);

        //Product currentProduct = productService.findById(id);
        Product currentProduct = productService.findById(productId);
        if (currentProduct == null) {
            logger.error("Unable to update. Product with id {} not found.", productId);
            return new ResponseEntity<>(new CustomErrorType("Unable to update. Product with id " + productId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        if (productService.isProductExist(product)) {
            logger.error("Unable to update. A Product with name {} already exist", product.getProductName());
            return new ResponseEntity<>(new CustomErrorType("Unable to update, Product " +
                    product.getProductName() + " already exist."), HttpStatus.CONFLICT);
        }
        currentProduct.setProductName(product.getProductName());
        currentProduct.setCategory(product.getCategory());
        currentProduct.setUnitPrice(product.getUnitPrice());
        currentProduct.setStock(product.getStock());
        currentProduct.setDescription(product.getDescription());
        currentProduct.setUpdatedBy(product.getUpdatedBy());


        productService.updateProduct(currentProduct);
        return new ResponseEntity<>(currentProduct, HttpStatus.OK);
    }


    // ------------------- Delete a Product-----------------------------------------

    @RequestMapping(value = "/product/{productId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProduct(@PathVariable("productId") String productId) {
        logger.info("Fetching & Deleting Product with id {}", productId);

        Product product = productService.findById(productId);
        if (product == null) {
            logger.error("Unable to delete. Product with id {} not found.", productId);
            return new ResponseEntity<>(new CustomErrorType("Unable to delete. Product with id " + productId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        productService.deleteProductById(productId);
        return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
    }

    // ------------------- Delete All Products-----------------------------

    @RequestMapping(value = "/product/", method = RequestMethod.DELETE)
    public ResponseEntity<Product> deleteAllProducts() {
        logger.info("Deleting All Products");

        productService.deleteAllProducts();
        return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
    }

    //---------------------- Get Count -----------------------------------

    @RequestMapping(value = "/product/count/", method = RequestMethod.GET)
    public ResponseEntity<?> countProduct() {
        int itemCount = productService.findAllCount();
        return new ResponseEntity<>(itemCount, HttpStatus.OK);
    }

}
