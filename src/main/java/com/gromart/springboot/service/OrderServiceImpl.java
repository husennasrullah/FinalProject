package com.gromart.springboot.service;

import com.gromart.springboot.model.Order;

import java.util.List;

public class OrderServiceImpl implements OrderService {

    @Override
    public List<Order> findAllOrders() {
        return null;
    }

    @Override
    public void saveOrder(Order order) {

    }

    @Override
    public Order findByUserId(String userId) {
        return null;
    }

    @Override
    public Order findById(String orderId) {
        return null;
    }

    @Override
    public void deleteOrderById(String orderId) {

    }

    @Override
    public int countDetail(String cartId) {
        return 0;
    }

    @Override
    public void updateStatus(Order order) {

    }
}
