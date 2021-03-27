package com.gromart.springboot.repository;

import com.gromart.springboot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<User> findAllBuyer() {
        return jdbcTemplate.query("select * from user where role='Buyer'",
                (rs, rowNum) ->
                        new User(
                                rs.getString("userID"),
                                rs.getString("firstname"),
                                rs.getString("lastName"),
                                rs.getString("userName"),
                                rs.getString("email"),
                                rs.getString("phoneNumber"),
                                rs.getBigDecimal("creditLimit"),
                                rs.getInt("invoiceLimit"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        ));
    }

    @Override
    public Map<String, Object> findAllWithPaging(int page, int limit) {
        Map<String, Object> map = new HashMap<>();

        map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM user where role='Buyer'",
                (rs, rowNum) -> rs.getInt("count")));

        int numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM user where role='Buyer'",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;

        int start = (page - 1) * limit;
        map.put("user", jdbcTemplate.query("SELECT * FROM user where role='Buyer'LIMIT " + start + "," + limit + ";",
                (rs, rowNum) ->
                        new User(
                                rs.getString("userID"),
                                rs.getString("firstname"),
                                rs.getString("lastName"),
                                rs.getString("userName"),
                                rs.getString("email"),
                                rs.getString("phoneNumber"),
                                rs.getBigDecimal("creditLimit"),
                                rs.getInt("invoiceLimit"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        )
        ));
        return map;
    }

    @Override
    public User findById(String userId) {
        User user;
        try {
            user = jdbcTemplate.queryForObject("select * from user where userId = ?",
                    new Object[]{userId},
                    (rs, rowNum) ->
                            new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getString("email"),
                                    rs.getString("phoneNumber"),
                                    rs.getString("role"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit")
                            ));
        } catch (Exception e) {
            user = null;
        }
        return user;
    }


    @Override
    public void saveUser(User user) {
        String id = generateId();
        String idUser = user.getRole() + "-" + id;
        jdbcTemplate.update("INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                idUser,
                user.getFirstName(),
                user.getLastName(),
                user.getUserName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getPassword(),
                user.getRole(),
                0,
                0,
                "husen",
                new Date(),
                "husen",
                new Date()
//                user.getCreditLimit(),
//                user.getInvoiceLimit(),
//                user.getCreatedBy(),
//                user.getCreatedDate(),
//                user.getUpdatedBy(),
//                user.getUpdatedDate()
        );

    }

    @Override
    public User findByUserName(String userName) {
        User user;
        try {
            user = jdbcTemplate.queryForObject("select * from user where userName = ?",
                    new Object[]{userName},
                    (rs, rowNum) ->
                            (new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getString("userName"),
                                    rs.getString("email"),
                                    rs.getString("phoneNumber"),
                                    rs.getString("password"),
                                    rs.getString("role"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            user = null;
        }
        return user;

    }

    @Override
    public User findByPhoneNumber(String phoneNumber) {
        User user;
        try {
            user = jdbcTemplate.queryForObject("select * from user where phoneNumber = ?",
                    new Object[]{phoneNumber},
                    (rs, rowNum) ->
                            (new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getString("userName"),
                                    rs.getString("email"),
                                    rs.getString("phoneNumber"),
                                    rs.getString("password"),
                                    rs.getString("role"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            user = null;
        }
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user;
        try {
            user = jdbcTemplate.queryForObject("select * from user where email = ?",
                    new Object[]{email},
                    (rs, rowNum) ->
                            (new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getString("userName"),
                                    rs.getString("email"),
                                    rs.getString("phoneNumber"),
                                    rs.getString("password"),
                                    rs.getString("role"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            user = null;
        }
        return user;
    }

    @Override
    public Map<String, Object> findNameWithPaging(String firstName, int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM user where role='Buyer' AND " +
                "firstName like '" + "%" + firstName + "%" + "'", Integer.class));

        int numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM user where role='Buyer'",
                (rs, rowNum) -> rs.getInt("count"));
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        map.put("user", jdbcTemplate.query("SELECT * FROM user where role='Buyer' AND firstName like '" + "%" + firstName + "%" + "' LIMIT " + start + "," + limit + ";",
                (rs, rowNum) ->
                        new User(
                                rs.getString("userID"),
                                rs.getString("firstname"),
                                rs.getString("lastName"),
                                rs.getString("userName"),
                                rs.getString("email"),
                                rs.getString("phoneNumber"),
                                rs.getBigDecimal("creditLimit"),
                                rs.getInt("invoiceLimit"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        ))
        );

        return map;
    }

    @Override
    public Map<String, Object> findIdWithPaging(String userId, int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("qty", jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM user where role='Buyer' AND " +
                "userID like '" + "%" + userId + "%" + "'", Integer.class));

        int numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM user where role='Buyer'",
                (rs, rowNum) -> rs.getInt("count"));
        // validate page
        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        map.put("user", jdbcTemplate.query("SELECT * FROM user where role='Buyer' AND userID like '" + "%" + userId + "%" + "' LIMIT " + start + "," + limit + ";",
                (rs, rowNum) ->
                        new User(
                                rs.getString("userID"),
                                rs.getString("firstname"),
                                rs.getString("lastName"),
                                rs.getString("userName"),
                                rs.getString("email"),
                                rs.getString("phoneNumber"),
                                rs.getBigDecimal("creditLimit"),
                                rs.getInt("invoiceLimit"),
                                rs.getString("createdBy"),
                                rs.getDate("createdDate"),
                                rs.getString("updatedBy"),
                                rs.getDate("updatedDate")
                        ))
        );

        return map;
    }

    @Override
    public List<User> searchId(String userId) {
        List<User> users;
        try {
            users = jdbcTemplate.query("select * from user where userID like ?",
                    new Object[]{"%" + userId + "%"},
                    (rs, rowNum) ->
                            (new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getString("userName"),
                                    rs.getString("email"),
                                    rs.getString("phoneNumber"),
                                    rs.getString("password"),
                                    rs.getString("role"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            users = null;
        }
        return users;
    }

    @Override
    public List<User> searchName(String firstName) {
        List<User> users;
        try {
            users = jdbcTemplate.query("select * from user where firstName like ?",
                    new Object[]{"%" + firstName + "%"},
                    (rs, rowNum) ->
                            (new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getString("userName"),
                                    rs.getString("email"),
                                    rs.getString("phoneNumber"),
                                    rs.getString("password"),
                                    rs.getString("role"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit"),
                                    rs.getString("createdBy"),
                                    rs.getDate("createdDate"),
                                    rs.getString("updatedBy"),
                                    rs.getDate("updatedDate")
                            ))
            );
        } catch (Exception e) {
            users = null;
        }
        return users;
    }

    @Override
    public User loginAccount(String userName, String password) {
        User user;
        try {
            user = jdbcTemplate.queryForObject("SELECT * FROM user WHERE BINARY username=? AND BINARY password =?",
                    new Object[]{userName, password},
                    (rs, rowNum) ->
                            (new User(
                                    rs.getString("userID"),
                                    rs.getString("firstname"),
                                    rs.getString("lastName"),
                                    rs.getString("email"),
                                    rs.getString("phoneNumber"),
                                    rs.getString("role"),
                                    rs.getBigDecimal("creditLimit"),
                                    rs.getInt("invoiceLimit")
                            ))
            );
        } catch (Exception e) {
            user = null;
        }
        return user;
    }

    @Override
    public void updateLimit(User user) {
        jdbcTemplate.update("update user set creditLimit = ?, invoiceLimit=?, updatedBy=?, updatedDate=? where userID=? ",
                user.getCreditLimit(),
                user.getInvoiceLimit(),
                user.getUpdatedBy(),
                user.getUpdatedDate(),
                user.getUserId()
        );
    }

    @Override
    public void updateInvoiceLimit(String userId, int invoiceLimit) {
        jdbcTemplate.update("update user set invoiceLimit=? where userID=? ",
                invoiceLimit,
                userId
        );
    }

    @Override
    public void updatePassword(User user) {
        jdbcTemplate.update("update user set password = ? where userID=? ",
                user.getPassword(),
                user.getUserId()
        );
    }

    @Override
    public void updateProfile(User user) {
        jdbcTemplate.update("update user set firstName = ?, lastName=?, phoneNumber=?, email=? where userID=? ",
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getUserId()
        );
    }

    @Override
    public int findAllCount() {
        int itemCount;
        itemCount = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM user", Integer.class);
        return itemCount;
    }

    @Override
    public String generateId() {
        int count = jdbcTemplate.queryForObject(
                "select count(*) from user ", Integer.class);
        String prefix = String.format("%02d", count + 1);
        String id = java.time.LocalDate.now() + "-" + prefix;
        return id;
    }


}
