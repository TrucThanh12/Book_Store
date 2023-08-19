package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Rating;
import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.exception.RatingNotFoundException;

import java.util.List;
import java.util.Map;

public interface RatingService {

    List<Rating> getAllRatingByBookId(int bookId) throws BookNotFoundException;


    Rating getRatingById(int ratingId) throws RatingNotFoundException;

    Rating createRating(int bookId, Rating rating) throws BookNotFoundException;

    Rating updateRating(int ratingId, Rating rating) throws RatingNotFoundException;

    void deleteRating(int ratingId) throws RatingNotFoundException;

    void deleteAllRatingOfBook(int bookId) throws BookNotFoundException;
}
