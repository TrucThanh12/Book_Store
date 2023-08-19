package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.User;

import java.util.List;

public interface UserService {

    User findByEmail(String email);

    boolean existsByEmail(String email);

    User saveUser(User user);

    List<User> findAllUser();
}
