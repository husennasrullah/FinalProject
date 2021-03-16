package com.gromart.springboot.repository;

import com.gromart.springboot.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    List<User>  findAllBuyer();

    List<User> findAllWithPaging(int page, int limit);

    User findById(String userId);

    void saveUser(User user);

    User findByUserName(String userName);

    User findByPhoneNumber(String phoneNumber);

    User findByEmail(String Email);

    List<User> searchId(String userId);

    List<User> searchName(String firstName);

    User loginAccount(String userName, String password);

    void updateLimit(User user);

    void updatePassword(User user);

    void updateProfile (User user);

    int findAllCount ();


}
