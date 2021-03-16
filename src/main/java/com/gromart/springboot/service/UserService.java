package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.model.User;

import java.util.List;

public interface UserService {

    List<User> findAllBuyer ();

    List<User> findAllWithPaging(int page, int limit);

    User findById(String userId);

    void saveUser(User user);

    User findByUserName (String userName);

    User findByEmail (String email);

    User findByPhoneNumber (String phoneNumber);

    List<User> searchId(String userId);

    List<User> searchName(String firstName);

    User loginAccount(String userName, String password);

    void updateLimit(User user);

    void updatePassword(User user);

    void updateProfile (User user);

    int findAllCount ();






}

