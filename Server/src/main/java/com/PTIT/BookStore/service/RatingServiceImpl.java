package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Book;
import com.PTIT.BookStore.entities.Rating;
import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.exception.RatingNotFoundException;
import com.PTIT.BookStore.repository.BookRepository;
import com.PTIT.BookStore.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RatingServiceImpl implements RatingService{

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> getAllRatingByBookId(int bookId) throws BookNotFoundException {
        Optional<Book> book = bookRepository.findById(bookId);
        if(!book.isPresent()){
            throw new BookNotFoundException("Book not found with ID: " + bookId);
        }
        List<Rating> ratings = new ArrayList<>();
        ratings.addAll(book.get().getRatings());
        return ratings;
    }


    @Override
    public Rating getRatingById(int ratingId) throws RatingNotFoundException {
        Optional<Rating> rating = ratingRepository.findById(ratingId);
        if(!rating.isPresent()) {
            throw new RatingNotFoundException("Rating not found with ID: " + ratingId);
        }
        return rating.get();
    }

    @Override
    public Rating createRating(int bookId, Rating rating) throws BookNotFoundException {
        Optional<Book> book = bookRepository.findById(bookId);
        if(!book.isPresent()){
            throw new BookNotFoundException("Book not found with ID: " + bookId);
        }
        book.get().getRatings().add(rating);
        ratingRepository.save(rating);
        bookRepository.save(book.get());
        return rating;
    }

    @Override
    public Rating updateRating(int ratingId, Rating rating) throws RatingNotFoundException {
        Optional<Rating> ratingTmp = ratingRepository.findById(ratingId);
        if(!ratingTmp.isPresent()) {
            throw new RatingNotFoundException("Rating not found with ID: " + ratingId);
        }

        Rating ratingDB = ratingTmp.get();
        if(rating.getStar() != 0) {
            ratingDB.setStar(rating.getStar());
        }

        if(rating.getMessage() != null){
            ratingDB.setMessage(rating.getMessage());
        }

        return ratingRepository.save(ratingDB);
    }

    @Override
    public void deleteRating(int ratingId) throws RatingNotFoundException {
        Optional<Rating> rating = ratingRepository.findById(ratingId);
        if(!rating.isPresent()){
            throw new RatingNotFoundException("Rating not found with ID: " + ratingId);
        }
        ratingRepository.deleteById(ratingId);
    }

    @Override
    public void deleteAllRatingOfBook(int bookId) throws BookNotFoundException {
        Optional<Book> book = bookRepository.findById(bookId);
        if(!book.isPresent()) {
            throw new BookNotFoundException("Book not found with ID: " + bookId);
        }

        Book bookSave = book.get();
        bookSave.getRatings().clear();
        bookRepository.save(bookSave);
    }

}
