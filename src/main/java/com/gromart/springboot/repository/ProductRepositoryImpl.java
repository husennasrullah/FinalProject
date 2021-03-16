package com.gromart.springboot.repository;

import com.gromart.springboot.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ProductRepositoryImpl implements ProductRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Product> findAll() {
        return jdbcTemplate.query("select * from product",
                (rs, rowNum) ->
                        new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        )
        );
    }

    @Override
    public List<Product> findAllWithPaging(int page, int limit) {
        int numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;

        int start = (page - 1) * limit;
        List<Product> products =
                jdbcTemplate.query("SELECT * FROM product LIMIT " + start + "," + limit + ";",
                        (rs, rowNum) ->
                                new Product(
                                        rs.getString("productID"),
                                        rs.getString("productName"),
                                        rs.getString("category"),
                                        rs.getBigDecimal("unitPrice"),
                                        rs.getInt("stock"),
                                        rs.getString("description"),
                                        rs.getString("createdBy"),
                                        rs.getDate("createdDate"),
                                        rs.getString("updatedBy"),
                                        rs.getDate("updatedDate")
                                )
                );
        return products;
    }

    @Override
    public void saveProduct(Product product) {
        String idProd = "Prod - "+ UUID.randomUUID();
        jdbcTemplate.update("INSERT INTO product VALUES (?,?,?,?,?,?,?,?,?,?)",
                idProd,
                product.getProductName(),
                product.getCategory(),
                product.getUnitPrice(),
                product.getStock(),
                product.getDescription(),
                //product.getCreatedBy(),
                "husen",
                //product.getCreatedDate(),
                new Date(),
                //product.getUpdatedBy(),
                "husen",
                //product.getUpdatedDate()
                new Date()
        );
    }

    @Override
    public Product findById(String productId) {
        Product product;
        try {
            product =jdbcTemplate.queryForObject("select * from product where productId = ?",
                    new Object[]{productId},
                    (rs, rowNum) ->
                            (new Product(
                                    rs.getString("productID"),
                                    rs.getString("productName"),
                                    rs.getString("category"),
                                    rs.getBigDecimal("unitPrice"),
                                    rs.getInt("stock"),
                                    rs.getString("description"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e){
            product=null;

        }
        return product;
    }

    @Override
    public Product findByName(String productName) {
        Product product;
        try {
            product = jdbcTemplate.queryForObject("select * from product where productName = ?",
                    new Object[]{productName},
                    (rs, rowNum) ->
                            (new Product(
                                    rs.getString("productID"),
                                    rs.getString("productName"),
                                    rs.getString("category"),
                                    rs.getBigDecimal("unitPrice"),
                                    rs.getInt("stock"),
                                    rs.getString("description"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            product=null;
        }
        return product;
    }

    @Override
    public List<Product> searchId(String productId) {
        return jdbcTemplate.query("select * from product where productID like ?",
                new Object[]{"%"+productId+"%"},
                (rs, rowNum) ->
                        (new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        ))
        );
    }

    @Override
    public List<Product> searchName(String productName) {
        return jdbcTemplate.query("select * from product where productName like ?",
                new Object[]{"%"+productName+"%"},
                (rs, rowNum) ->
                        (new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        ))
        );
    }

    @Override
    public void updateProduct(Product product) {
        jdbcTemplate.update("update product set productName=?, category=?, unitPrice=?, stock=?, description=? where productId=?",
               product.getProductName(),
                product.getCategory(),
                product.getUnitPrice(),
                product.getStock(),
                product.getDescription(),
                product.getProductId()
        );
    }

    @Override
    public void deleteProductById(String productId) {
        jdbcTemplate.update("delete from product where productId = ?", productId);
    }

    @Override
    public void deleteAllProducts() {
        jdbcTemplate.update("delete from product");
    }

    @Override
    public boolean isProductExist(Product product) {
        return false;
    }

    @Override
    public int findAllCount() {
        int itemCount;
        itemCount = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM product", Integer.class);
        return itemCount;
    }

    @Override
    public int findAllCountId() {
        return 0;
    }

    @Override
    public int findAllCountName() {
        return 0;
    }


}

/*Map<String, Object> map = new HashMap<>();

        map.put("qty", countProductByStatus(" "));

        map.put("product", jdbcTemplate.query(
                "select * from product p join user u on p.userCode = u.userCode limit 6 offset "+offset,
                (rs, i) -> new Product(
                        rs.getString("productCode"),
                        rs.getString("productName"),
                        rs.getDouble("price"),
                        rs.getInt("stock"),
                        rs.getString("description"),
                        rs.getString("createdDate"),
                        new User(
                                rs.getString("userCode"),
                                rs.getString("userName")
                        )
                )
        ));
* */
