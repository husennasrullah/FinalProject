package com.gromart.springboot.controller;


import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.Product;
import com.gromart.springboot.service.CartService;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gromart/")
public class CartController {

    public static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartService cartService;

     //-------------------Retrieve All Products--------------------------------------------

    @RequestMapping(value = "/cart/", method = RequestMethod.GET)
    public ResponseEntity<List<Cart>> listAllCarts() {
        List<Cart> carts = cartService.findAllCart();
        if (carts.isEmpty()) {
            return new ResponseEntity<>(carts, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    // -------------------Create a Product-------------------------------------------

    @RequestMapping(value = "/cart/", method = RequestMethod.POST)
    public ResponseEntity<?> createCart(@Valid @RequestBody Cart cart, Errors error) {
        logger.info("Creating Cart : {}", cart);

        if (error.hasErrors()){
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        cartService.saveCart(cart);
        return new ResponseEntity<>(cart, HttpStatus.CREATED);
    }

    //-----------------------
    @RequestMapping(value = "/cart/id/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> getBuyerCart(@PathVariable("userId") String userId) {
        Cart cart = cartService.findByUserId(userId);
        if (cart == null) {
            logger.error("Cart not found.");
            return new ResponseEntity<>(new CustomErrorType("Cart not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    //-----------------------
    @RequestMapping(value = "/cart/{cartId}", method = RequestMethod.GET)
    public ResponseEntity<?> getCartById(@PathVariable("cartId") String cartId) {
        Cart cart = cartService.findById(cartId);
        if (cart == null) {
            logger.error("Cart not found.");
            return new ResponseEntity<>(new CustomErrorType("Cart not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    //--------------------------------
    @RequestMapping(value = "/cart/{cartId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProduct(@PathVariable("cartId") String cartId) {
        logger.info("Fetching & Deleting cart with id {}", cartId);

        Cart cart = cartService.findById(cartId);
        if (cart == null) {
            logger.error("Unable to delete. Cart with id {} not found.", cartId);
            return new ResponseEntity<>(new CustomErrorType("Unable to delete. Cart with id " + cartId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        cartService.deleteCartById(cartId);
        return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
    }


}