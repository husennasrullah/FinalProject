package com.gromart.springboot.service;

import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.Order;
import com.gromart.springboot.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Override
    public Map<String, Object> findAllOrders(int page, int limit) {
        return orderRepository.findAllOrders(page, limit);
    }

    @Override
    public void saveOrder(Order order) {
        synchronized (this) {
            orderRepository.saveOrder(order);
        }
    }

    @Override
    public Map <String, Object> findByUserId(String userId, int page, int limit) {
        return orderRepository.findByUserId(userId, page, limit);
    }

    @Override
    public Order findById(String orderId) {
        return orderRepository.findById(orderId);
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
        synchronized (this) {
            orderRepository.updateStatus(order);
        }

    }

    @Override
    public Map<String,Object> countTransaction() {
        return orderRepository.countTransaction ();
    }
}
