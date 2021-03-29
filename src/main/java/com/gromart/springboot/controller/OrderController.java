package com.gromart.springboot.controller;

import com.gromart.springboot.model.*;
import com.gromart.springboot.repository.OrderRepository;
import com.gromart.springboot.repository.UserRepository;
import com.gromart.springboot.service.OrderService;
import com.gromart.springboot.service.ProductService;
import com.gromart.springboot.service.UserService;
import com.gromart.springboot.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
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

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    //-------------------Retrieve All Products--------------------------------------------
    @RequestMapping(value = "/order/", method = RequestMethod.GET)
    public ResponseEntity<?> listAllOrders(@RequestParam int page, @RequestParam int limit) {
        Map<String, Object> order = orderService.findAllOrders(page, limit);
        if (order.isEmpty()) {
            return new ResponseEntity<>(order, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    //-----------------------find by userID---------------------------
    @RequestMapping(value = "/order/id/{userId}/", method = RequestMethod.GET)
    public ResponseEntity<?> getBuyerOrder(@PathVariable("userId") String userId, @RequestParam int page, @RequestParam int limit) {
        Map<String, Object> orders = orderService.findByUserId(userId, page, limit);
        if (orders == null) {
            logger.error("Order not found.");
            return new ResponseEntity<>(orders, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    //-----------------------find by orderID---------------------------
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

        //------------------- stock exceed validation------------------------
        List<OrderDetail> details = order.getDetails();
        for (int i=0; i< details.size(); i++ ){
            Product product = productService.findById(order.getDetails().get(i).getProduct().getProductId());
            if (order.getDetails().get(i).getQuantity() > product.getStock() ) {
                return new ResponseEntity<>(
                        new CustomErrorType("Product "+order.getDetails().get(i).getProduct().getProductName() +
                        "exceed the available stock"), HttpStatus.CONFLICT
                );
            }
        }
        //------------------- total purchased exceed credit limit-----------------------
        User user = userService.findById(order.getUser().getUserId());
        if (order.getTotalAmount().compareTo(user.getCreditLimit()) == 1){
            return new ResponseEntity<>(new CustomErrorType("Total Purchased exceed your credit limit !!"), HttpStatus.CONFLICT);
        }

        //------------------- reached transaction limit ---------------
        if (user.getInvoiceLimit() == 0){
            return new ResponseEntity<>(new CustomErrorType("you have reached your invoice limit, " +
                    "please wait till your order is approved by seller"), HttpStatus.CONFLICT);
        }

        orderService.saveOrder(order);
        userRepository.updateInvoiceLimit(
                user.getUserId(),
                user.getInvoiceLimit() - 1
                );

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    //------------------- Update Status -------------------------------------
    @RequestMapping(value = "/order/status/", method = RequestMethod.PUT)
    public ResponseEntity<?> updateStatus(@RequestBody Order order) {
        User user = userService.findById(order.getUser().getUserId());
        orderService.updateStatus(order);
        userRepository.updateInvoiceLimit(
                user.getUserId(),
                user.getInvoiceLimit() + 1
        );
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    //---------------------- Get Count -----------------------------------

    @RequestMapping(value = "/order/count/", method = RequestMethod.GET)
    public ResponseEntity<?> countTransaction() {
        Map<String,Object> transaction = orderService.countTransaction();
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    //---------------------- Get Top sales -----------------------------------

    @RequestMapping(value = "/order/topsales/", method = RequestMethod.GET)
    public ResponseEntity<?> topSales() {
        List<Map<String, Object>> obj = orderRepository.countTopSales();
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

}
