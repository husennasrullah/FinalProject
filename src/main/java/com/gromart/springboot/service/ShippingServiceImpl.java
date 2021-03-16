package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.model.Shipping;
import com.gromart.springboot.repository.ShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingServiceImpl implements ShippingService{

    @Autowired
    private ShippingRepository shippingRepository;
    @Override
    public List<Shipping> findAllShipping() {
            List<Shipping> shipping = shippingRepository.findAllShipping();
            return shipping;

    }
}
