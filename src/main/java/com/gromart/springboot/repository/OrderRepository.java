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

    int countTransaction ();

    List<Object> countTopOrder ();

    List<Map<String, Object>> countTopSales ();
}
