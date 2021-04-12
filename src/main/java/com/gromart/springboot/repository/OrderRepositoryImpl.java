package com.gromart.springboot.repository;

import com.gromart.springboot.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class OrderRepositoryImpl implements OrderRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Map<String, Object> findAllOrders(int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        try {
            map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder ", Integer.class));

            List<Order> orders;
            int numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder", Integer.class);
            if (page < 1) page = 1;
            if (page > numPages) page = numPages;
            int start = (page - 1) * limit;

            orders = jdbcTemplate.query("SELECT * FROM reportorder LIMIT " + start + "," + limit + ";",
                    (rs, rowNum) ->
                            new Order(
                                    rs.getString("orderID"),
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );
            for (Order order : orders) {
                order.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                                "b.invoiceLimit FROM reportorder a JOIN user b ON a.userID = b.userID WHERE a.orderID=?",
                        new Object[]{order.getOrderId()},
                        (rs, rowNum) ->
                                (new User(
                                        rs.getString("userID"),
                                        rs.getString("firstname"),
                                        rs.getString("lastName"),
                                        rs.getBigDecimal("creditLimit"),
                                        rs.getInt("invoiceLimit")
                                ))
                        )
                );
                List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                                "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + order.getOrderId() + "'",
                        (rs, rowNum) -> new OrderDetail(
                                rs.getString("orderdetailID"),
                                rs.getString("orderID"),
                                rs.getInt("quantity"),
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
            map.put("order", orders);
        } catch (Exception e){
            map = null;
        }
        return map;
    }

    @Override
    public void saveOrder(Order order) {
        UUID id = UUID.randomUUID();
        String orderId = "Order-" + id;
        jdbcTemplate.update("INSERT INTO reportorder (orderID, userID, orderDate, shippingAddress, totalAmount, orderStatus) " +
                        "VALUES  (?,?,?,?,?,?)",
                orderId,
                order.getUser().getUserId(),
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
                    "INSERT INTO orderdetail(orderdetailID, orderID, productID, productName, unitPrice, quantity, subTotal) " +
                            "VALUES (?,?,?,?,?,?,?)",
                    detailId,
                    orderId,
                    details.get(i).getProduct().getProductId(),
                    details.get(i).getProduct().getProductName(),
                    details.get(i).getProduct().getUnitPrice(),
                    details.get(i).getQuantity(),
                    details.get(i).getSubTotal()
            );
        }
    }

    @Override
    public Map <String, Object> findByUserId(String userId, int page, int limit) {
        Map<String, Object> map = new HashMap<>();

        try {
            map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "userID like '" + "%" + userId + "%" + "'", Integer.class));

            List<Order> orders;
            int numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "userID like '" + "%" + userId + "%" + "'", Integer.class);
            // validate page
            if (page < 1) page = 1;
            if (page > numPages) page = numPages;
            int start = (page - 1) * limit;

            orders = jdbcTemplate.query("SELECT * FROM reportorder where userID like '"+"%"+userId+"%"+"' LIMIT " + start + "," + limit + ";" ,
                    (rs, rowNum) ->
                            new Order(
                                    rs.getString("orderID"),
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );

            for (Order order : orders) {
                order.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                                "b.invoiceLimit FROM reportorder a JOIN user b ON a.userID = b.userID WHERE a.orderID=?",
                        new Object[]{order.getOrderId()},
                        (rs, rowNum) ->
                                (new User(
                                        rs.getString("userID"),
                                        rs.getString("firstname"),
                                        rs.getString("lastName"),
                                        rs.getBigDecimal("creditLimit"),
                                        rs.getInt("invoiceLimit")
                                ))
                        )
                );
                List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                                "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + order.getOrderId() + "'",
                        (rs, rowNum) -> new OrderDetail(
                                rs.getString("orderdetailID"),
                                rs.getString("orderID"),
                                rs.getInt("quantity"),
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
            map.put("order", orders);
        } catch (Exception e){
            map = null;
        }
        return map;
    }

    @Override
    public Map<String, Object> findByOrderDate(String startDate, String toDate, int page, int limit) {
        Map<String, Object> map = new HashMap<>();

        try {
            map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "orderDate between '"+startDate+"' AND '"+toDate+"'", Integer.class));

            List<Order> orders;
            int numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "orderDate between '"+startDate+"' AND '"+toDate+"'", Integer.class);
            // validate page
            if (page < 1) page = 1;
            if (page > numPages) page = numPages;
            int start = (page - 1) * limit;

            orders = jdbcTemplate.query("SELECT * FROM reportorder where orderDate between '"+startDate+"' AND '"+toDate+"' LIMIT "+ start+"," +limit+";" ,
                    (rs, rowNum) ->
                            new Order(
                                    rs.getString("orderID"),
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );

            for (Order order : orders) {
                order.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                                "b.invoiceLimit FROM reportorder a JOIN user b ON a.userID = b.userID WHERE a.orderID=?",
                        new Object[]{order.getOrderId()},
                        (rs, rowNum) ->
                                (new User(
                                        rs.getString("userID"),
                                        rs.getString("firstname"),
                                        rs.getString("lastName"),
                                        rs.getBigDecimal("creditLimit"),
                                        rs.getInt("invoiceLimit")
                                ))
                        )
                );
                List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                                "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + order.getOrderId() + "'",
                        (rs, rowNum) -> new OrderDetail(
                                rs.getString("orderdetailID"),
                                rs.getString("orderID"),
                                rs.getInt("quantity"),
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
            map.put("order", orders);
        }catch (Exception e){
            map = null;
        }
        return map;
    }

    @Override
    public Map<String, Object> findByOrderId(String orderId, int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        try {
            map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "OrderID like '" + "%" + orderId + "%" + "'", Integer.class));
            List<Order> orders;
            int numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "orderID like '" + "%" + orderId + "%" + "'", Integer.class);
            // validate page
            if (page < 1) page = 1;
            if (page > numPages) page = numPages;
            int start = (page - 1) * limit;

            orders = jdbcTemplate.query("SELECT * FROM reportorder where orderID like '"+"%"+orderId+"%"+"' LIMIT " + start + "," + limit + ";" ,
                    (rs, rowNum) ->
                            new Order(
                                    rs.getString("orderID"),
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );

            for (Order order : orders) {
                order.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                                "b.invoiceLimit FROM reportorder a JOIN user b ON a.userID = b.userID WHERE a.orderID=?",
                        new Object[]{order.getOrderId()},
                        (rs, rowNum) ->
                                (new User(
                                        rs.getString("userID"),
                                        rs.getString("firstname"),
                                        rs.getString("lastName"),
                                        rs.getBigDecimal("creditLimit"),
                                        rs.getInt("invoiceLimit")
                                ))
                        )
                );
                List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                                "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + order.getOrderId() + "'",
                        (rs, rowNum) -> new OrderDetail(
                                rs.getString("orderdetailID"),
                                rs.getString("orderID"),
                                rs.getInt("quantity"),
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
            map.put("order", orders);
        } catch (Exception e){
            map = null;
        }
        return map;
    }

    @Override
    public Map<String, Object> findByStatus(Boolean status, int page, int limit) {
        Map<String, Object> map = new HashMap<>();

        try {
            map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "orderStatus = "+ status +"", Integer.class));

            List<Order> orders;
            int numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM reportorder where " +
                    "orderStatus = "+ status + "", Integer.class);
            // validate page
            if (page < 1) page = 1;
            if (page > numPages) page = numPages;
            int start = (page - 1) * limit;

            orders = jdbcTemplate.query("SELECT * FROM reportorder where orderStatus = "+status+" LIMIT " + start + "," + limit + ";" ,
                    (rs, rowNum) ->
                            new Order(
                                    rs.getString("orderID"),
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );

            for (Order order : orders) {
                order.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                                "b.invoiceLimit FROM reportorder a JOIN user b ON a.userID = b.userID WHERE a.orderID=?",
                        new Object[]{order.getOrderId()},
                        (rs, rowNum) ->
                                (new User(
                                        rs.getString("userID"),
                                        rs.getString("firstname"),
                                        rs.getString("lastName"),
                                        rs.getBigDecimal("creditLimit"),
                                        rs.getInt("invoiceLimit")
                                ))
                        )
                );

                List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                                "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + order.getOrderId() + "'",
                        (rs, rowNum) -> new OrderDetail(
                                rs.getString("orderdetailID"),
                                rs.getString("orderID"),
                                rs.getInt("quantity"),
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
            map.put("order", orders);

        }catch (Exception e){
            map = null;
        }
        return map;
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
                                    rs.getDate("orderDate"),
                                    rs.getString("shippingAddress"),
                                    rs.getBigDecimal("totalAmount"),
                                    rs.getBoolean("orderStatus")
                            )
            );

            orders.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                            "b.invoiceLimit FROM reportorder a JOIN user b ON a.userID = b.userID WHERE a.orderID=?",
                    new Object[]{orderId},
                    (rs, rowNum) ->
                            (new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit")
                            ))
                    )
            );
            List<OrderDetail> details = jdbcTemplate.query("select b.orderdetailID, b.orderID, b.quantity, b.subTotal " +
                            "from reportorder a join orderdetail b on a.orderID = b.orderID where b.orderID ='" + orderId + "'",
                    (rs, rowNum) -> new OrderDetail(
                            rs.getString("orderdetailID"),
                            rs.getString("orderID"),
                            rs.getInt("quantity"),
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
    public void updateStatus(Order order) {
        jdbcTemplate.update("update reportorder set orderStatus=? where orderID=?",
                order.getStatus(),
                order.getOrderId());
    }

    @Override
    public Map<String, Object> countTransaction() {
        Map<String, Object> transaction = new HashMap<>();
        transaction.put("totalSellingItem",jdbcTemplate.queryForObject("SELECT SUM(quantity) FROM orderdetail", Integer.class));
        transaction.put("totalSellingMoney", jdbcTemplate.queryForObject("SELECT SUM(totalAmount) FROM reportorder", Integer.class));
        return transaction;
    }

    @Override
    public int countRequestedOrder(String userId) {
        int itemCount;
        itemCount = jdbcTemplate.queryForObject("Select COUNT(*) as count from reportorder where userID='"+userId+"' " +
                "and orderStatus=false", Integer.class);
        return itemCount;
    }


    @Override
    public List<Map<String, Object>> countTopSales() {
        return jdbcTemplate.query("SELECT productID, productName, SUM(quantity) as total from orderdetail GROUP BY productID ORDER BY total DESC",
                (rs, rowNum) -> {
                    Map<String, Object> results = new HashMap<>();
                    results.put("productId", rs.getString("productID"));
                    results.put("productName", rs.getString("productName"));
                    results.put("total", rs.getInt("total"));
                    return results;
                });
    }

}
