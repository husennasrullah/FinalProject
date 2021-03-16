package com.gromart.springboot.service;

import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.Product;

import java.util.List;

public interface CartService {
    List<Cart> findAllCart();

    void saveCart (Cart cart);

    Cart findByUserId (String Id);

    Cart findById (String cartId);

    void deleteCartById(String cartId);
}
