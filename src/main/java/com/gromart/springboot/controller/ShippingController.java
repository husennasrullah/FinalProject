package com.gromart.springboot.controller;

import com.gromart.springboot.model.Shipping;
import com.gromart.springboot.service.ShippingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gromart/")
public class ShippingController {

    public static final Logger logger = LoggerFactory.getLogger(ShippingController.class);

    @Autowired
    private ShippingService shippingService;

    @RequestMapping(value = "/shipping/", method = RequestMethod.GET)
    public ResponseEntity<List<Shipping>> listAllShipping() {
        List<Shipping> shipping = shippingService.findAllShipping();
        if (shipping.isEmpty()) {
            return new ResponseEntity<>(shipping, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(shipping, HttpStatus.OK);
    }
}
