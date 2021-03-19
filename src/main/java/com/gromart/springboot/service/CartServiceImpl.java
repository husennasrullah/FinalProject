package com.gromart.springboot.service;

import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.CartDetail;
import com.gromart.springboot.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<Cart> findAllCart() {
        List<Cart> carts = cartRepository.findAllCart();
        return carts;
    }

    @Override
    public void saveCart(Cart cart) {
        synchronized (this) {
            cartRepository.saveCart(cart);
        }
    }

    @Override
    public Cart findByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public Cart findById(String cartId) {
        return cartRepository.findById (cartId);
    }

    @Override
    public CartDetail findProductExist(String productId) {
        return cartRepository.findProductExist(productId);
    }

    @Override
    public void deleteCartById(String cartId) {
        synchronized (this) {
            cartRepository.deleteCartById(cartId);
        }
    }

    @Override
    public void deleteDetailItem(String detailID) {
        synchronized (this) {
            cartRepository.deleteDetailItem(detailID);
        }
    }

    @Override
    public void addItem(Cart cart) {
        synchronized (this) {
            cartRepository.addItem(cart);
        }
    }

    @Override
    public void updateQuantity(CartDetail cartDetail) {
        synchronized (this) {
            cartRepository.updateQuantity(cartDetail);
        }
    }

    @Override
    public int countDetail(String cartId) {
        return cartRepository.countDetail(cartId);
    }

}
