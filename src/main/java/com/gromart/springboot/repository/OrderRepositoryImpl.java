package com.gromart.springboot.repository;

import com.gromart.springboot.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@Repository
public class OrderRepositoryImpl implements OrderRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Order> findAllOrders() {
        List<Order> orders;
        orders = jdbcTemplate.query("select* from reportorder",
                (rs, rowNum) ->
                        new Order(
                                rs.getString("orderID"),
                                rs.getString("userID"),
                                rs.getDate("orderDate"),
                                rs.getString("shippingAddress"),
                                rs.getBigDecimal("totalAmount"),
                                rs.getBoolean("orderStatus")
                        )
        );
        for (Order order : orders) {
            List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                            "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + order.getOrderId() + "'",
                    (rs, rowNum) -> new OrderDetail(
                            rs.getString("orderdetailID"),
                            rs.getString("orderID"),
                            rs.getString("quantity"),
                            rs.getBigDecimal("subTotal")
                    )
            );
            order.setDetails(details);
            for (OrderDetail detail : details) {
                detail.setProduct(jdbcTemplate.queryForObject("select p.productID, p.productName, p.category, p.unitPrice, " +
                                "p.stock from orderdetail cd join product p on cd.productID = p.productID " +
                                "where cd.orderdetailID='" + detail.getDetailId() + "'",
                        (rs, rowNum) -> new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock")
                        ))
                );
            }
        }
        return orders;
    }

    @Override
    public void saveOrder(Order order) {
        UUID id = UUID.randomUUID();
        String orderId = "Order-" + id;
        jdbcTemplate.update("INSERT INTO reportorder (orderID, userID, orderDate, shippingAddress, totalAmount, orderStatus) " +
                        "VALUES  (?,?,?,?,?,?)",
                orderId,
                order.getUserId(),
                java.time.LocalDate.now(),
                order.getShippingAddress(),
                order.getTotalAmount(),
                order.getStatus()
        );

        List<OrderDetail> details = order.getDetails();
        for (int i = 0; i < details.size(); i++) {
            UUID detail = UUID.randomUUID();
            String detailId = "Det-Order-" + detail;
            jdbcTemplate.update(
                    "INSERT INTO orderdetail(orderdetailID, orderID, productID, quantity, subTotal) VALUES (?,?,?,?,?)",
                    detailId,
                    orderId,
                    details.get(i).getProduct().getProductId(),
                    details.get(i).getQuantity(),
                    details.get(i).getSubTotal()
            );
        }

    }

    @Override
    public List<Order> findByUserId(String userId) {
        List<Order> orders;
        try {
            orders = jdbcTemplate.query("select* from reportorder where userID='" + userId + "'",
                    (rs, rowNum) ->
                            new Order(
                                    rs.getString("orderID"),
                                    rs.getString("userID"),
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );

            for (Order order : orders) {
                List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                                "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + order.getOrderId() + "'",
                        (rs, rowNum) -> new OrderDetail(
                                rs.getString("orderdetailID"),
                                rs.getString("orderID"),
                                rs.getString("quantity"),
                                rs.getBigDecimal("subTotal")
                        )
                );
                order.setDetails(details);
                for (OrderDetail detail : details) {
                    detail.setProduct(jdbcTemplate.queryForObject("select p.productID, p.productName, p.category, p.unitPrice, " +
                                    "p.stock from orderdetail cd join product p on cd.productID = p.productID " +
                                    "where cd.orderdetailID='" + detail.getDetailId() + "'",
                            (rs, rowNum) -> new Product(
                                    rs.getString("productID"),
                                    rs.getString("productName"),
                                    rs.getString("category"),
                                    rs.getBigDecimal("unitPrice"),
                                    rs.getInt("stock")
                            ))
                    );
                }
            }
        } catch (Exception e) {
            orders = null;
        }
        return orders;
    }

    @Override
    public Order findById(String orderId) {
        Order orders;
        try {
            orders = jdbcTemplate.queryForObject("select* from reportorder where orderID=?",
                    new Object[]{orderId},
                    (rs, rowNum) ->
                            new Order(
                                    rs.getString("orderID"),
                                    rs.getString("userID"),
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );
            List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                            "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + orderId + "'",
                    (rs, rowNum) -> new OrderDetail(
                            rs.getString("orderdetailID"),
                            rs.getString("orderID"),
                            rs.getString("quantity"),
                            rs.getBigDecimal("subTotal")
                    )
            );
            orders.setDetails(details);
            for (OrderDetail detail : details) {
                detail.setProduct(jdbcTemplate.queryForObject("select p.productID, p.productName, p.category, p.unitPrice, " +
                                "p.stock from orderdetail cd join product p on cd.productID = p.productID " +
                                "where cd.orderdetailID='" + detail.getDetailId() + "'",
                        (rs, rowNum) -> new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock")
                        ))
                );
            }
        } catch (Exception e) {
            orders = null;
        }
        return orders;
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
        jdbcTemplate.update("update reportorder set orderStatus=? where orderID=?",
                order.getStatus(),
                order.getOrderId());
    }

    @Override
    public int countTransaction() {
        int transaction;
        transaction = jdbcTemplate.queryForObject("SELECT SUM(quantity)  FROM orderdetail", Integer.class);
        return transaction;
    }

    @Override
    public List<Object> countTopOrder() {
        List<Object> objects;
        Map<String, Object> map = new HashMap<>();

        objects = jdbcTemplate.query("SELECT productID, SUM(quantity) as total from orderdetail GROUP BY productID ORDER BY total DESC",
                (rs, rowNum) ->
                        map.put("productId", rs.getString("productID"))

        );
        return objects;

    }

    @Override
    public List<Map<String, Object>> countTopSales() {
        return jdbcTemplate.query("SELECT productID, SUM(quantity) as total from orderdetail GROUP BY productID ORDER BY total DESC",
                (rs, rowNum) -> {
                    Map<String, Object> results = new HashMap<>();
                    results.put("productId", rs.getString("productID"));
                    results.put("total", rs.getInt("total"));
                    return results;
                });
    }

}
