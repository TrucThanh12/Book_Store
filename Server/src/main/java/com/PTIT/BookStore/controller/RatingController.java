package com.PTIT.BookStore.controller;

import com.PTIT.BookStore.entities.Rating;
import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.exception.RatingNotFoundException;
import com.PTIT.BookStore.service.BookService;
import com.PTIT.BookStore.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class RatingController {

    @Autowired
    private BookService bookService;

    @Autowired
    private RatingService ratingService;

    @GetMapping("/book/{bookId}/rating")
    public ResponseEntity<?> fetchAllRating(@PathVariable("bookId") int bookId) throws BookNotFoundException {
        List<Rating> ratingList = ratingService.getAllRatingByBookId(bookId);
        return ResponseEntity.status(HttpStatus.OK).body(ratingList);
    }

    @GetMapping("/rating/{id}")
    public ResponseEntity<?> fetchRatingById(@PathVariable("id") int ratingId) throws RatingNotFoundException {
        Rating rating = ratingService.getRatingById(ratingId);
        return ResponseEntity.status(HttpStatus.OK).body(rating);
    }

    @PostMapping("/book/{bookId}/rating")
    public ResponseEntity<?> createRating(@PathVariable("bookId") int bookId, @RequestBody Rating rating) throws BookNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ratingService.createRating(bookId, rating));
    }

    @PutMapping("/rating/{id}")
    public ResponseEntity<?> updateRating(@PathVariable("id") int ratingId, @RequestBody Rating rating) throws RatingNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(ratingService.updateRating(ratingId, rating));
    }

    @DeleteMapping("/book/{bookId}/rating")
    public ResponseEntity<?> deleteAllRating(@PathVariable("bookId") int bookId) throws BookNotFoundException {
        ratingService.deleteAllRatingOfBook(bookId);
        return ResponseEntity.status(HttpStatus.OK).body("Delete all rating successfully!!");
    }

    @DeleteMapping("/rating/{id}")
    public ResponseEntity<?> deleteRating(@PathVariable("id") int id) throws RatingNotFoundException {
        ratingService.deleteRating(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete rating successfully!!");
    }
}
