package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Book;
import com.PTIT.BookStore.entities.Cart;
import com.PTIT.BookStore.entities.CartItem;
import com.PTIT.BookStore.entities.User;
import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.exception.DuplicateBookInCartException;
import com.PTIT.BookStore.exception.UserNotFoundException;
import com.PTIT.BookStore.repository.BookRepository;
import com.PTIT.BookStore.repository.CartItemRepository;
import com.PTIT.BookStore.repository.CartRepository;
import com.PTIT.BookStore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;


    @Override
    public Cart createCart(int userId) throws UserNotFoundException {
        Optional<User> tmpUser = userRepository.findById(userId);
        if(!tmpUser.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }
        User user = tmpUser.get();
        Cart cart = new Cart(user);
        return cartRepository.save(cart);
    }

    public Cart getCartByUser(int userId) {
        Cart cart = cartRepository.findByUserId(userId);
        return cart;
    }

    @Override
    public Cart addCartItem(int userId, int bookId) throws BookNotFoundException, DuplicateBookInCartException {
        Cart cart = cartRepository.findByUserId(userId);
        Optional<Book> tmpBook = bookRepository.findById(bookId);
        if(!tmpBook.isPresent()) {
            throw new BookNotFoundException("Book not found with ID: " + bookId);
        }

        for(CartItem cartItem : cart.getListCartItem()) {
            if(cartItem.getBook().getId() == bookId) {
                throw new DuplicateBookInCartException("Book has been in cart");
            }
        }

        Book book = tmpBook.get();

        CartItem cartItem = new CartItem(book);
        cartItemRepository.save(cartItem);
        cart.getListCartItem().add(cartItem);
        return cartRepository.save(cart);
    }

    @Override
    public void removeCartItem(int userId, int cartItemId) {
        Cart cart = cartRepository.findByUserId(userId);
        Set<CartItem> listCartItems = new HashSet<>();
        for(CartItem cartItem: cart.getListCartItem()) {
            if (cartItem.getId() != cartItemId) {
                listCartItems.add(cartItem);
            }
        }
        cart.setListCartItem(listCartItems);
        cartRepository.save(cart);
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void removeAllCartItem(int userId) {
        Cart cart = cartRepository.findByUserId(userId);
        for(CartItem cartItem: cart.getListCartItem()) {
            cartItemRepository.deleteById(cartItem.getId());
        }

        cart.getListCartItem().clear();
        cartRepository.save(cart);
    }

}
