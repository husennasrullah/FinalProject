package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.model.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    List<User> findAllBuyer ();

    Map<String, Object>  findAllWithPaging(int page, int limit);



    User findById(String userId);

    void saveUser(User user);

    User findByUserName (String userName);

    User findByEmail (String email);

    User findByPhoneNumber (String phoneNumber);

    Map<String, Object> findNameWithPaging (String firstName, int page, int limit);

    Map<String, Object> findIdWithPaging (String userId, int page, int limit);

    List<User> searchId(String userId);

    List<User> searchName(String firstName);

    User loginAccount(String userName, String password);

    void updateLimit(User user);

    void updatePassword(User user);

    void updateProfile (User user);

    int findAllCount ();






}

