package com.gromart.springboot.repository;

import com.gromart.springboot.model.User;
import java.util.Map;

public interface UserRepository {

    Map<String, Object> findAllWithPaging(int page, int limit);

    Map<String, Object> findNameWithPaging (String firstName, int page, int limit);

    Map<String, Object> findIdWithPaging (String userId, int page, int limit);

    void saveUser(User user);

    void updateLimit(User user);

    void updateInvoiceLimit (String userId, int invoiceLimit);

    void updatePassword(User user);

    void updateProfile (User user);

    String generateId ();

    User findById(String userId);

    User findByIdForPassword(String userId);

    User findByUserName(String userName);

    User findByPhoneNumber(String phoneNumber);

    User findByEmail(String Email);

    User loginAccount(String userName, String password);


//    List<User> searchId(String userId);
//
//    List<User> searchName(String firstName);

//    List<User>  findAllBuyer();

//    int findAllCount ();


}
