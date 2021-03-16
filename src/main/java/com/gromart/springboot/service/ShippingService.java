package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.model.Shipping;

import java.util.List;

public interface ShippingService {
    List<Shipping> findAllShipping();
}
