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
            List<CartDetail> detail = (jdbcTemplate.query("select b.cartdetailID, b.cartID, b.quantity " +
                            "from cart a join cartdetail b on a.cartID = b.cartID where b.cartID ='" + cart.getCartId() + "'",
                    (rs, rowNum) -> new CartDetail(
                            rs.getString("cartdetailID"),
                            rs.getString("cartID"),
                            rs.getString("quantity")
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
                java.time.LocalDate.now(),
                cart.getTotalAmount()
        );

        List<CartDetail> details = cart.getDetail();
        for (int i = 0; i < details.size(); i++) {
            UUID detail = UUID.randomUUID();
            String detailId = "Detail-" + detail;
            jdbcTemplate.update(
                    "INSERT INTO cartdetail(cartdetailID, cartID, productID, quantity) VALUES (?,?,?,?)",
                    detailId,
                    cartid,
                    details.get(i).getProduct().getProductId(),
                    details.get(i).getQuantity()
            );
        }
    }

    @Override
    public Cart findByUserId(String userId) {
        Cart carts;
        try {
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
            List<CartDetail> detail = (jdbcTemplate.query("select b.cartdetailID, b.cartID, b.quantity " +
                            "from cart a join cartdetail b on a.cartID = b.cartID where b.cartID ='" + carts.getCartId() + "'",
                    (rs, rowNum) -> new CartDetail(
                            rs.getString("cartdetailID"),
                            rs.getString("cartID"),
                            rs.getString("quantity")
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
        }catch (Exception e){
            carts= null;
        }return carts;
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
        List<CartDetail> detail = (jdbcTemplate.query("select b.cartdetailID, b.cartID, b.quantity " +
                        "from cart a join cartdetail b on a.cartID = b.cartID where b.cartID ='" + cartId + "'",
                (rs, rowNum) -> new CartDetail(
                        rs.getString("cartdetailID"),
                        rs.getString("cartID"),
                        rs.getString("quantity")
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
    public CartDetail findProductExist(String productId, String cartId) {
        CartDetail cartDetail;
        try {
            cartDetail = jdbcTemplate.queryForObject("select * from cartdetail where productId=? and cartID=?",
                    new Object[]{productId, cartId},
                    (rs, rowNum) ->
                            (new CartDetail(
                                    rs.getString("cartdetailID"),
                                    rs.getString("cartID"),
                                    rs.getString("quantity")
                            ))
            );
        } catch (Exception e) {
            cartDetail = null;
        }
     return cartDetail;
    }

    @Override
    public void deleteCartById(String cartId) {
        jdbcTemplate.update("delete from cart where cartID = ?", cartId);
        jdbcTemplate.update("delete from cartdetail where cartID = ?", cartId);
    }

    @Override
    public void deleteDetailItem(String detailID) {
        jdbcTemplate.update("delete from cartdetail where cartdetailID = ?", detailID);
    }

    @Override
    public void addItem(Cart cart) {
        List<CartDetail> details = cart.getDetail();
        for (int i = 0; i < details.size(); i++) {
            UUID detail = UUID.randomUUID();
            String detailId = "Detail-" + detail;
            jdbcTemplate.update(
                    "INSERT INTO cartdetail(cartDetailID, cartID, productID, quantity) VALUES (?,?,?,?)",
                    detailId,
                    cart.getCartId(),
                    details.get(i).getProduct().getProductId(),
                    details.get(i).getQuantity()
            );
        }
    }

    @Override
    public void updateQuantity(CartDetail cartDetail) {
        jdbcTemplate.update("update cartdetail set quantity=? where cartdetailID=?",
                cartDetail.getQuantity(),
                cartDetail.getDetailId()
        );
    }

    @Override
    public int countDetail(String cartId) {
        int itemCount;
        itemCount = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM cartdetail where cartID='"+cartId+"'", Integer.class);
        return itemCount;
    }


}
