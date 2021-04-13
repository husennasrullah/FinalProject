package com.gromart.springboot.service;

import com.gromart.springboot.model.Order;
import com.gromart.springboot.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    public Map<String, Object> findByOrderDate(String startDate, String toDate, int page, int limit) {
        return orderRepository.findByOrderDate(startDate, toDate, page, limit);
    }

    @Override
    public Map<String, Object> findByOrderId(String orderId, int page, int limit) {
        return orderRepository.findByOrderId(orderId, page, limit);
    }

    @Override
    public Map<String, Object> findByIdForBuyer(String userId, String orderId, int page, int limit) {
        return orderRepository.findByIdForBuyer(userId, orderId, page, limit);
    }

    @Override
    public Map<String, Object> findByStatus(Boolean status, int page, int limit) {
        return orderRepository.findByStatus(status, page, limit);
    }

    @Override
    public Map<String, Object> findByStatusForBuyer(String userId, Boolean status, int page, int limit) {
        return orderRepository.findByStatusForBuyer(userId, status, page, limit);
    }

    @Override
    public Order findById(String orderId) {
        return orderRepository.findById(orderId);
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
