package com.gromart.springboot.repository;

import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.CartDetail;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository {
    List<Cart> findAllCart();

    void saveCart (Cart cart);

    Cart findByUserId (String userId);

    Cart findById (String cartId);

    void deleteCartById(String cartId);

    void deleteDetailItem (String detailID);

    void addItem(CartDetail cartDetail);

    void updateQuantity (CartDetail cartDetail);
}
