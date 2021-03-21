package com.gromart.springboot.service;

import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.CartDetail;
import com.gromart.springboot.model.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAllOrders();

    void saveOrder (Order order);

    Order findByUserId (String userId);

    Order findById (String orderId);

    void deleteOrderById(String orderId);

    int countDetail (String cartId);

    void updateStatus (Order order);
}
