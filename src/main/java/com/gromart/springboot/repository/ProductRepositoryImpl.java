package com.gromart.springboot.repository;

import com.gromart.springboot.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ProductRepositoryImpl implements ProductRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Map<String, Object> findProduct(int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("qty", findAllCount());

        int numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product where status=true",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        map.put("product", jdbcTemplate.query("SELECT * FROM product where status=true ORDER BY status DESC LIMIT " + start + "," + limit + ";",
                (rs, rowNum) ->
                        new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getBoolean("status"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        )
        ));
        return map;
    }

    @Override
    public void saveProduct(Product product) {
        String idProd = "Prod - " + UUID.randomUUID();
        jdbcTemplate.update("INSERT INTO product VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                idProd,
                product.getProductName(),
                product.getCategory(),
                product.getUnitPrice(),
                product.getStock(),
                product.getDescription(),
                product.getStatus(),
                product.getCreatedBy(),
                java.time.LocalDate.now(),
                product.getUpdatedBy(),
                java.time.LocalDate.now()
        );
    }

    @Override
    public Product findById(String productId) {
        Product product;
        try {
            product = jdbcTemplate.queryForObject("select * from product where productId = ?",
                    new Object[]{productId},
                    (rs, rowNum) ->
                            (new Product(
                                    rs.getString("productID"),
                                    rs.getString("productName"),
                                    rs.getString("category"),
                                    rs.getBigDecimal("unitPrice"),
                                    rs.getInt("stock"),
                                    rs.getString("description"),
                                    rs.getBoolean("status"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            product = null;

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
                                    rs.getBoolean("status"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            product = null;
        }
        return product;
    }

    @Override
    public Map<String, Object> findNameWithPaging(String productName, int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM product where " +
                "productName like '"+"%"+productName+"%"+"'", Integer.class));

        int numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product ",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        map.put("product", jdbcTemplate.query("SELECT * FROM product where productName like '"+"%"+productName+"%"+"' LIMIT " + start + "," + limit + ";" ,
                (rs, rowNum) ->
                        new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getBoolean("status"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        )
        ));
        return map;
    }

    @Override
    public Map<String, Object> findIdWithPaging(String productId, int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM product where " +
                "productId like '"+"%"+productId+"%"+"'", Integer.class));

        int numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product ",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        map.put("product", jdbcTemplate.query("SELECT * FROM product where productId like '"+"%"+productId+"%"+"' LIMIT " + start + "," + limit + ";" ,
                (rs, rowNum) ->
                        new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getBoolean("status"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        )
        ));
        return map;
    }

    @Override
    public Map<String, Object> findStatusWithPaging(Boolean status, int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM product where " +
                "status = "+status+"", Integer.class));

        int numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product where status = "+status+"",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        map.put("product", jdbcTemplate.query("SELECT * FROM product where status="+status+" LIMIT " + start + "," + limit + ";" ,
                (rs, rowNum) ->
                        new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getBoolean("status"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        )
        ));
        return map;
    }

    @Override
    public Map<String, Object> findStockWithPaging(int stock, int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM product where " +
                "stock <= '"+stock+"'", Integer.class));

        int numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        map.put("product", jdbcTemplate.query("SELECT * FROM product where stock <= '"+stock+"' LIMIT " + start + "," + limit + ";" ,
                (rs, rowNum) ->
                        new Product(
                                rs.getString("productID"),
                                rs.getString("productName"),
                                rs.getString("category"),
                                rs.getBigDecimal("unitPrice"),
                                rs.getInt("stock"),
                                rs.getString("description"),
                                rs.getBoolean("status"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        )
        ));
        return map;
    }

    @Override
    public void updateProduct(Product product) {
        jdbcTemplate.update("update product set productName=?, category=?, unitPrice=?, stock=?, description=?, updatedBy=?," +
                        "updatedDate=? where productId=?",
                product.getProductName(),
                product.getCategory(),
                product.getUnitPrice(),
                product.getStock(),
                product.getDescription(),
                product.getUpdatedBy(),
                java.time.LocalDate.now(),
                product.getProductId()
        );
    }

    @Override
    public void deleteProductById(String productId) {
//      jdbcTemplate.update("delete from product where productId = ?", productId);
        jdbcTemplate.update("update product set status=? where productId=?",
                false,
                productId
        );
    }

    @Override
    public int findAllCount() {
        int itemCount;
        itemCount = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM product where status = true", Integer.class);
        return itemCount;
    }

}

