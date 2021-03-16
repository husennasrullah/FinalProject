package com.gromart.springboot.controller;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.model.User;
import com.gromart.springboot.service.UserService;
import com.gromart.springboot.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gromart/")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/buyer/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> listAllBuyers() {
        List<User> users = userService.findAllBuyer();
        if (users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //----------------------------------Search-------------------------------------
    @RequestMapping(value = "/user/id/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserById(@PathVariable("userId") String userId) {
        logger.info("Fetching Product with id {}", userId);
        List<User> user = userService.searchId(userId);
        if (user == null) {
            logger.error("User with id {} not found.", userId);
            return new ResponseEntity<>(new CustomErrorType("User with id " + userId + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/user/name/{userName}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByName(@PathVariable("userName") String userName) {
        logger.info("Fetching Product with id {}", userName);
        List<User> user = userService.searchName(userName);
        if (user == null) {
            logger.error("User with id {} not found.", userName);
            return new ResponseEntity<>(new CustomErrorType("User with id " + userName + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //-------------------------------------------------------------------------------

    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public ResponseEntity<?> createProduct(@Valid @RequestBody User user, Errors error) {
        logger.info("Creating Product : {}", user);

        if (error.hasErrors()){
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        if (userService.findByUserName(user.getUserName()) !=null) {
            logger.error("Unable to create. UserName {} already exist", user.getUserName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. UserName " +
                    user.getUserName() + " already exist."), HttpStatus.CONFLICT);
        } else if (userService.findByEmail(user.getEmail()) !=null) {
            logger.error("Unable to create. Email {} already exist", user.getEmail());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. Email " +
                    user.getEmail() + " already exist."), HttpStatus.CONFLICT);
        } else if (userService.findByPhoneNumber(user.getPhoneNumber()) !=null) {
            logger.error("Unable to create. PhoneNumber {} already exist", user.getPhoneNumber());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. phone Number " +
                    user.getPhoneNumber() + " already exist."), HttpStatus.CONFLICT);
        } else {
            userService.saveUser(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }

    }

    @GetMapping("user/login/") ///-------------------ini login----------------------------------
    public ResponseEntity<?> login(@RequestParam String userName, @RequestParam String password) {
        logger.info("Comparing data!");

        User user = userService.loginAccount(userName, password);

        if(user == null) {
            logger.error("Username or password is wrong!");
            return new ResponseEntity<>(new CustomErrorType("Username or password is wrong!"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //------------------------get with paging---------------------------------
    @RequestMapping(value = "/user/paging/", method = RequestMethod.GET)
    public ResponseEntity<?>getProductWithPaging(@RequestParam int page, @RequestParam int limit){
        List<User> users = userService.findAllWithPaging(page, limit);
        if(users.isEmpty()){
            return new ResponseEntity<>(users,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(users,HttpStatus.OK);
        }
    }

    ////---------------------------update-------------------------------------------

    @RequestMapping(value = "/user/limit/{userId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateLimit(@PathVariable("userId") String userId, @Valid @RequestBody User user) {
        logger.info("Updating User with id {}", userId);

        User currentUser = userService.findById(userId);
        if (currentUser == null) {
            logger.error("Unable to update. User with id {} not found.", userId);
            return new ResponseEntity<>(new CustomErrorType("Unable to update User with id " + userId + " not found."),
                    HttpStatus.NOT_FOUND);
        } else {
            currentUser.setCreditLimit(user.getCreditLimit());
            currentUser.setInvoiceLimit(user.getInvoiceLimit());
            currentUser.setUpdatedBy(user.getUpdatedBy());
            currentUser.setUpdatedDate(user.getUpdatedDate());

            userService.updateLimit(currentUser);
            return new ResponseEntity<>(currentUser, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/user/password/{userId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePassword(@PathVariable("userId") String userId, @Valid @RequestBody User user) {
        logger.info("Updating User with id {}", userId);

        User currentUser = userService.findById(userId);
        if (currentUser == null) {
            logger.error("Unable to update. User with id {} not found.", userId);
            return new ResponseEntity<>(new CustomErrorType("Unable to update User with id " + userId + " not found."),
                    HttpStatus.NOT_FOUND);
        } else {
            currentUser.setPassword(user.getPassword());
            userService.updatePassword(currentUser);
            return new ResponseEntity<>(currentUser, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/user/profile/{userId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfile(@PathVariable("userId") String userId, @Valid @RequestBody User user) {
        logger.info("Updating User with id {}", userId);

        User currentUser = userService.findById(userId);
        if (currentUser == null) {
            logger.error("Unable to update. User with id {} not found.", userId);
            return new ResponseEntity<>(new CustomErrorType("Unable to update User with id " + userId + " not found."),
                    HttpStatus.NOT_FOUND);
        } else {
            currentUser.setFirstName(user.getFirstName());
            currentUser.setLastName(user.getLastName());
            currentUser.setPhoneNumber(user.getPhoneNumber());
            currentUser.setEmail(user.getEmail());
            userService.updateProfile(currentUser);
            return new ResponseEntity<>(currentUser, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/user/count/", method = RequestMethod.GET)
    public ResponseEntity<?> countUser() {
        int itemCount = userService.findAllCount();
        return new ResponseEntity<>(itemCount, HttpStatus.OK);
    }
}
