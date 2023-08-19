package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Cart;
import com.PTIT.BookStore.entities.CartItem;
import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.exception.DuplicateBookInCartException;
import com.PTIT.BookStore.exception.UserNotFoundException;

import java.util.List;

public interface CartService {

    Cart createCart(int userId) throws UserNotFoundException;

    Cart getCartByUser(int userId);

    Cart addCartItem(int userId, int bookId) throws BookNotFoundException, DuplicateBookInCartException;


    void removeCartItem(int userId, int cartItemId);

    void removeAllCartItem(int userId);
}
