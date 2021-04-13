package com.gromart.springboot.controller;

import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.CartDetail;
import com.gromart.springboot.service.CartService;
import com.gromart.springboot.service.ProductService;
import com.gromart.springboot.util.CustomErrorType;
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

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    //-------------------Retrieve All Products--------------------------------------------
    @RequestMapping(value = "/cart/", method = RequestMethod.GET)
    public ResponseEntity<List<Cart>> listAllCarts() {
        List<Cart> carts = cartService.findAllCart();
        if (carts.isEmpty()) {
            return new ResponseEntity<>(carts, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    //-----------------------s
    @RequestMapping(value = "/cart/id/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> getBuyerCart(@PathVariable("userId") String userId) {
        Cart cart = cartService.findByUserId(userId);
        if (cart == null) {
            return new ResponseEntity<>(new CustomErrorType("No-Cart"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    //-----------------------
    @RequestMapping(value = "/cart/{cartId}", method = RequestMethod.GET)
    public ResponseEntity<?> getCartById(@PathVariable("cartId") String cartId) {
        Cart cart = cartService.findById(cartId);
        if (cart == null) {
            return new ResponseEntity<>(new CustomErrorType("Cart not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    // -------------------Create Cart-------------------------------------------
    @RequestMapping(value = "/cart/", method = RequestMethod.POST)
    public ResponseEntity<?> createCart(@Valid @RequestBody Cart cart, Errors error) {
        if (error.hasErrors()) {
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        cartService.saveCart(cart);
        return new ResponseEntity<>(cart, HttpStatus.CREATED);
    }

    // -------------------Create Cart with validation-------------------------------------------
    @RequestMapping(value = "/cart/add/", method = RequestMethod.POST)
    public ResponseEntity<?> createCarts(@RequestBody Cart cart, @RequestParam String userId, @RequestParam String productId) {
        Cart existCart = cartService.findByUserId(userId);
        if (existCart == null) {
            cartService.saveCart(cart);
            return new ResponseEntity<>(cart, HttpStatus.CREATED);
        } else {
            CartDetail detailProduct = cartService.findProductExist(productId, cart.getCartId());
            if (detailProduct == null) {
                cartService.addItem(cart);
                return new ResponseEntity<>("Item successfully added to cart", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Item Already exist in Cart - please only update quantity in the cart",
                        HttpStatus.CONFLICT);
            }
        }
    }

    //--------------------------------delete cart-------------------
    @RequestMapping(value = "/cart/{cartId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProduct(@PathVariable("cartId") String cartId) {
        Cart cart = cartService.findById(cartId);
        if (cart == null) {
            return new ResponseEntity<>(new CustomErrorType("Unable to delete. Cart with id " + cartId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        cartService.deleteCartById(cartId);
        return new ResponseEntity<Cart>(HttpStatus.NO_CONTENT);
    }

    //----------------------------deleteItem--------------------
    @RequestMapping(value = "/cart/detail/{detailId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteDetailItem(@PathVariable("detailId") String detailId) {
        cartService.deleteDetailItem(detailId);
        return new ResponseEntity<Cart>(HttpStatus.NO_CONTENT);
    }

    //----------------------------deleteItem with validation--------------------
    @RequestMapping(value = "/cart/item/", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteItem(@RequestParam String cartId, @RequestParam String detailId) {
        Integer countDetail = cartService.countDetail(cartId);
        if (countDetail == 1) {
            cartService.deleteCartById(cartId);
//            productService.changeStock();
            return new ResponseEntity<Cart>(HttpStatus.NO_CONTENT);
        } else {
            cartService.deleteDetailItem(detailId);
            return new ResponseEntity<Cart>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/cart/qty/{detailId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateQuantity(@PathVariable("detailId") String detailId, @Valid @RequestBody CartDetail cartDetail) {
        cartDetail.setQuantity(cartDetail.getQuantity());
        cartDetail.setDetailId(detailId);
        cartService.updateQuantity(cartDetail);
        return new ResponseEntity<>(cartDetail, HttpStatus.OK);
    }

}
