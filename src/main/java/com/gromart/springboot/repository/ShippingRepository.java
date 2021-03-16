package com.gromart.springboot.repository;

import com.gromart.springboot.model.Shipping;

import java.util.List;

public interface ShippingRepository {
    List<Shipping> findAllShipping();
}
