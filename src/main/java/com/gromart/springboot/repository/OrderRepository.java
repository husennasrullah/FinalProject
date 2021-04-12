package com.gromart.springboot.repository;

import com.gromart.springboot.model.Order;
import java.util.List;
import java.util.Map;

public interface OrderRepository {
    Map<String, Object> findAllOrders(int page, int limit);

    void saveOrder (Order order);

    Map <String, Object> findByUserId (String userId, int page, int limit);

    Map<String, Object> findByOrderDate (String startDate, String toDate, int page, int limit);

    Map<String, Object> findByOrderId (String orderId, int page, int limit);

    Map<String, Object> findByStatus(Boolean status, int page, int limit);

    Order findById (String orderId);

    void updateStatus (Order order);

    Map<String, Object> countTransaction ();

    List<Map<String, Object>> countTopSales ();

    int countRequestedOrder (String userId);

}
