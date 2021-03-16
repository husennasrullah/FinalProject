package com.gromart.springboot.repository;

import com.gromart.springboot.model.Shipping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ShippingRepositoryImpl implements ShippingRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Shipping> findAllShipping() {
        return jdbcTemplate.query("select * from expedition ",
                (rs, rowNum) ->
                        new Shipping(
                                rs.getString("shipperID"),
                                rs.getString("shipperCompany"),
                                rs.getString("fee")
                        ));
    }
}
