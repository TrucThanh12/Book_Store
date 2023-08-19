package com.PTIT.BookStore.controller;

import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.exception.DuplicateBookInCartException;
import com.PTIT.BookStore.exception.UserNotFoundException;
import com.PTIT.BookStore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/cart/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable("userId") int userId) {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartByUser(userId));
    }

    @PostMapping("/cart/{userId}/addItem")
    public ResponseEntity<?> addItemToCart(@PathVariable("userId") int userId,@RequestBody Map<String, Integer> cartItem) throws BookNotFoundException, DuplicateBookInCartException {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.addCartItem(userId, cartItem.get("bookId")));
    }

    @DeleteMapping("/cart/{userId}/deleteItem/{cartItemId}")
    public ResponseEntity<?> deleteItem(@PathVariable("userId") int userId, @PathVariable("cartItemId") int cartItemId) {
        cartService.removeCartItem(userId, cartItemId);
        return ResponseEntity.status(HttpStatus.OK).body("delete cart item successfully!!!");
    }

    @DeleteMapping("/cart/{userId}/deleteAllItem")
    public ResponseEntity<?> deleteAllItem(@PathVariable("userId") int userId) {
        cartService.removeAllCartItem(userId);
        return ResponseEntity.status(HttpStatus.OK).body("delete all cart item successfully!!!");
    }
}
