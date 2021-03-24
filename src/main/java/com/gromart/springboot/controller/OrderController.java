package com.gromart.springboot.controller;

import com.gromart.springboot.model.Order;
import com.gromart.springboot.repository.OrderRepository;
import com.gromart.springboot.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gromart/")
public class OrderController {

    public static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    //-------------------Retrieve All Products--------------------------------------------
    @RequestMapping(value = "/order/", method = RequestMethod.GET)
    public ResponseEntity<List<Order>> listAllOrders() {
        List<Order> orders = orderService.findAllOrders();
        if (orders.isEmpty()) {
            return new ResponseEntity<>(orders, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    //-----------------------find by userID---------------------------
    @RequestMapping(value = "/order/id/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> getBuyerOrder(@PathVariable("userId") String userId) {
        List<Order> orders = orderService.findByUserId(userId);
        if (orders == null) {
            logger.error("Order not found.");
            return new ResponseEntity<>(orders, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    //-----------------------find by userID---------------------------
    @RequestMapping(value = "/order/{orderId}", method = RequestMethod.GET)
    public ResponseEntity<?> getOrderbyID(@PathVariable("orderId") String orderId) {
        Order orders = orderService.findById(orderId);
        if (orders == null) {
            logger.error("Order not found.");
            return new ResponseEntity<>(orders, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // -------------------Create a Order-------------------------------------------

    @RequestMapping(value = "/order/", method = RequestMethod.POST)
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        logger.info("Creating Order : {}", order);
        orderService.saveOrder(order);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    //------------------- Update Status -------------------------------------
    @RequestMapping(value = "/order/status/", method = RequestMethod.PUT)
    public ResponseEntity<?> updateStatus(@RequestBody Order order) {
        orderService.updateStatus(order);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    //---------------------- Get Count -----------------------------------

    @RequestMapping(value = "/order/count/", method = RequestMethod.GET)
    public ResponseEntity<?> countTransaction() {
        int itemCount = orderService.countTransaction();
        return new ResponseEntity<>(itemCount, HttpStatus.OK);
    }

    //---------------------- Get Top sales -----------------------------------

    @RequestMapping(value = "/order/topsales/", method = RequestMethod.GET)
    public ResponseEntity<?> topSales() {
        List<Map<String, Object>> obj = orderRepository.countTopSales();
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

}
