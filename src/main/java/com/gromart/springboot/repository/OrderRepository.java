package com.gromart.springboot.repository;

import com.gromart.springboot.model.Order;

import java.util.List;
import java.util.Map;

public interface OrderRepository {
    List<Order> findAllOrders();

    void saveOrder (Order order);

    List<Order> findByUserId (String userId);

    Order findById (String orderId);

    void deleteOrderById(String orderId);

    int countDetail (String cartId);

    void updateStatus (Order order);

    Map<String, Object> countTransaction ();

    int countRequestedOrder (String userId);

    List<Map<String, Object>> countTopSales ();



}
