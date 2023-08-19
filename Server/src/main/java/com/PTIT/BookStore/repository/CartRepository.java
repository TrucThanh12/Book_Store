package com.PTIT.BookStore.repository;

import com.PTIT.BookStore.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    Cart findByUserId(int id);
}
