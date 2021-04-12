package com.gromart.springboot.service;

import com.gromart.springboot.model.User;
import java.util.Map;

public interface UserService {

    Map<String, Object>  findAllWithPaging(int page, int limit);

    Map<String, Object> findNameWithPaging (String firstName, int page, int limit);

    Map<String, Object> findIdWithPaging (String userId, int page, int limit);

    void saveUser(User user);

    void updateLimit(User user);

    void updatePassword(User user);

    void updateProfile (User user);

    void updateInvoiceLimit (String userId, int invoiceLimit);

    User findById(String userId);

    User findByUserName (String userName);

    User findByEmail (String email);

    User findByPhoneNumber (String phoneNumber);

    User loginAccount(String userName, String password);




//    int findAllCount ();
//
//    List<User> findAllBuyer ();
//
//    List<User> searchId(String userId);
//
//    List<User> searchName(String firstName);






}

