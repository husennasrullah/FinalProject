package com.gromart.springboot.repository;

import com.gromart.springboot.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepositoryImpl implements OrderRepository{

    @Autowired
    JdbcTemplate jdbcTemplate;

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
