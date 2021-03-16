package com.gromart.springboot.repository;

import com.gromart.springboot.model.Cart;
import com.gromart.springboot.model.CartDetail;
import com.gromart.springboot.model.Product;
import com.gromart.springboot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class CartRepositoryImpl implements CartRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Cart> findAllCart() {
        List<Cart> carts;
        carts = jdbcTemplate.query("SELECT * FROM cart",
                (rs, rowNum) ->
                        new Cart(
                                rs.getString("cartID"),
                                rs.getDate("orderDate"),
                                rs.getBigDecimal("totalAmount")
                        )
        );

        for (Cart cart : carts) {
            cart.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                            "b.invoiceLimit FROM cart a JOIN user b ON a.userID = b.userID WHERE a.cartID=?",
                    new Object[]{cart.getCartId()},
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

            List<CartDetail> detail = (jdbcTemplate.query("select b.cartdetailID, b.cartID, b.quantity, b.subTotal " +
                            "from cart a join cartdetail b on a.cartID = b.cartID where b.cartID ='" + cart.getCartId() + "'",
                    (rs, rowNum) -> new CartDetail(
                            rs.getString("cartdetailID"),
                            rs.getString("cartID"),
                            rs.getString("quantity"),
                            rs.getBigDecimal("subTotal")
                    )
            ));
            cart.setDetail(detail);

            for (CartDetail details : detail) {
                details.setProduct(jdbcTemplate.queryForObject("select p.productID, p.productName, p.category, p.unitPrice, " +
                                "p.stock from cartdetail cd join product p on cd.productID = p.productID " +
                                "where cd.cartdetailID='" + details.getDetailId() + "'",
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
        return carts;
    }

    @Override
    public void saveCart(Cart cart) {
        User user = cart.getUser();
        UUID id = UUID.randomUUID();
        String cartid = "Cart-" + id;
        jdbcTemplate.update("INSERT INTO cart (cartID, userID, orderDate, totalAmount) VALUES  (?,?,?,?)",
                cartid,
                user.getUserId(),
                cart.getOrderDate(),
                cart.getTotalAmount()
        );

        List<CartDetail> details = cart.getDetail();
        for (int i = 0; i < details.size(); i++) {
            UUID detail = UUID.randomUUID();
            String detailId = "Detail-" + detail;
            jdbcTemplate.update(
                    "INSERT INTO cartdetail(cartDetailID, cartID, productID, quantity, subTotal) VALUES (?,?,?,?,?)",
                    detailId,
                    cartid,
                    details.get(i).getProduct().getProductId(),
                    details.get(i).getQuantity(),
                    details.get(i).getSubTotal()
            );
        }
    }

    @Override
    public Cart findByUserId(String userId) {
        Cart carts;
        carts = jdbcTemplate.queryForObject(
                "select * from cart where userID = ?",
                new Object[]{userId},
                (rs, rowNum) ->
                        new Cart(
                                rs.getString("cartID"),
                                rs.getDate("orderDate"),
                                rs.getBigDecimal("totalAmount")
                        )
        );

        carts.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                        "b.invoiceLimit FROM cart a JOIN user b ON a.userID = b.userID WHERE a.cartID=?",
                new Object[]{carts.getCartId()},
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

        List<CartDetail> detail = (jdbcTemplate.query("select b.cartdetailID, b.cartID, b.quantity, b.subTotal " +
                        "from cart a join cartdetail b on a.cartID = b.cartID where b.cartID ='" + carts.getCartId() + "'",
                (rs, rowNum) -> new CartDetail(
                        rs.getString("cartdetailID"),
                        rs.getString("cartID"),
                        rs.getString("quantity"),
                        rs.getBigDecimal("subTotal")
                )
        ));
        carts.setDetail(detail);
        for (CartDetail details : detail) {
            details.setProduct(jdbcTemplate.queryForObject("select p.productID, p.productName, p.category, p.unitPrice, " +
                            "p.stock from cartdetail cd join product p on cd.productID = p.productID " +
                            "where cd.cartdetailID='" + details.getDetailId() + "'",
                    (rs, rowNum) -> new Product(
                            rs.getString("productID"),
                            rs.getString("productName"),
                            rs.getString("category"),
                            rs.getBigDecimal("unitPrice"),
                            rs.getInt("stock")
                    ))
            );
        }
        return carts;
    }

    @Override
    public Cart findById(String cartId) {
        Cart carts;
        carts = jdbcTemplate.queryForObject(
                "select * from cart where CartID = ?",
                new Object[]{cartId},
                (rs, rowNum) ->
                        new Cart(
                                rs.getString("cartID"),
                                rs.getDate("orderDate"),
                                rs.getBigDecimal("totalAmount")
                        )
        );

        carts.setUser(jdbcTemplate.queryForObject("SELECT b.userID, b.firstName, b.lastName, b.creditLimit, " +
                        "b.invoiceLimit FROM cart a JOIN user b ON a.userID = b.userID WHERE a.cartID=?",
                new Object[]{cartId},
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

        List<CartDetail> detail = (jdbcTemplate.query("select b.cartdetailID, b.cartID, b.quantity, b.subTotal " +
                        "from cart a join cartdetail b on a.cartID = b.cartID where b.cartID ='" + cartId + "'",
                (rs, rowNum) -> new CartDetail(
                        rs.getString("cartdetailID"),
                        rs.getString("cartID"),
                        rs.getString("quantity"),
                        rs.getBigDecimal("subTotal")
                )
        ));
        carts.setDetail(detail);
        for (CartDetail details : detail) {
            details.setProduct(jdbcTemplate.queryForObject("select p.productID, p.productName, p.category, p.unitPrice, " +
                            "p.stock from cartdetail cd join product p on cd.productID = p.productID " +
                            "where cd.cartdetailID='" + details.getDetailId() + "'",
                    (rs, rowNum) -> new Product(
                            rs.getString("productID"),
                            rs.getString("productName"),
                            rs.getString("category"),
                            rs.getBigDecimal("unitPrice"),
                            rs.getInt("stock")
                    ))
            );
        }
        return carts;
    }

    @Override
    public void deleteCartById(String cartId) {
        jdbcTemplate.update("delete from cart where cartID = ?", cartId);
        jdbcTemplate.update("delete from cartdetail where cartID = ?", cartId);
    }


}
