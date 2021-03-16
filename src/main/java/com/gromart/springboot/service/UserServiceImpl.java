package com.gromart.springboot.service;

import com.gromart.springboot.model.Product;
import com.gromart.springboot.model.User;
import com.gromart.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<User> findAllBuyer() {
        List<User> user = userRepository.findAllBuyer();
        return user;
    }

    @Override
    public List<User> findAllWithPaging(int page, int limit) {
        List<User> user = userRepository.findAllWithPaging(page, limit);
        return user;
    }

    @Override
    public User findById(String userId) {
        User user;
        try {
            user = userRepository.findById(userId);
        } catch (Exception e) {
            System.out.println(e);
            user = null;
        }
        return user;
    }

    @Override
    public void saveUser(User user) {
        synchronized (this) {
            userRepository.saveUser(user);
        }

    }

    @Override
    public User findByUserName(String userName) {
        User user;
        try {
            user = userRepository.findByUserName(userName);
        } catch (Exception e) {
            System.out.println(e);
            user = null;
        }
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user;
        try {
            user = userRepository.findByEmail(email);
        } catch (Exception e) {
            System.out.println(e);
            user = null;
        }
        return user;
    }

    @Override
    public User findByPhoneNumber(String phoneNumber) {
        User user;
        try {
            user = userRepository.findByPhoneNumber(phoneNumber);
        } catch (Exception e) {
            System.out.println(e);
            user = null;
        }
        return user;
    }

    @Override
    public List<User> searchId(String userId) {
        List<User> user;
        try {
            user = userRepository.searchId(userId);
        } catch (Exception e) {
            System.out.println(e);
            user = null;
        }
        return user;
    }

    @Override
    public List<User> searchName(String firstName) {
        List<User> user;
        try {
            user = userRepository.searchName(firstName);
        } catch (Exception e) {
            System.out.println(e);
            user = null;
        }
        return user;
    }

    @Override
    public User loginAccount(String userName, String password) {
        return userRepository.loginAccount(userName, password);
    }

    @Override
    public void updateLimit(User user) {
        synchronized (this) {
            userRepository.updateLimit(user);
        }
    }

    @Override
    public void updatePassword(User user) {
        synchronized (this) {
            userRepository.updatePassword(user);
        }
    }

    @Override
    public void updateProfile(User user) {
        synchronized (this) {
            userRepository.updateProfile(user);
        }
    }

    @Override
    public int findAllCount() {
        return userRepository.findAllCount();
    }
}
