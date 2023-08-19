package com.PTIT.BookStore.controller;

import com.PTIT.BookStore.entities.Book;
import com.PTIT.BookStore.entities.Image;
import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public ResponseEntity<?> fetchAllBook(@Param("title") String title){
        return ResponseEntity.status(HttpStatus.OK).body(bookService.fetchAllBook(title));
    }


    @GetMapping("/book/{id}")
    public ResponseEntity<?> fetchBookById(@PathVariable("id") int bookId) throws BookNotFoundException {
        Book book = bookService.fetchBookById(bookId);
        return ResponseEntity.status(HttpStatus.OK).body(book);
    }

    @PostMapping("/admin/book/save")
    public ResponseEntity<?> saveBook(@RequestParam String title, @RequestParam String author,
                         @RequestParam String description, @RequestParam String dateRelease,
                         @RequestParam String totalPage, @RequestParam String typeBook,
                         @RequestParam int price, @RequestBody MultipartFile[] images) throws IOException {
        title = title.toLowerCase();
        if(!bookService.isTitleUnique(title)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Duplicated Title");
        }
        List<Image> imageList = bookService.saveImage(title, images);
        int totalPageNum = Integer.parseInt(totalPage);
        Book book = new Book(title, author, description, dateRelease, totalPageNum, typeBook, price, imageList);

        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.saveBook(book));
    }

    @PutMapping("/admin/book/update/{id}")
    public ResponseEntity<?> updateBook(@PathVariable("id") int bookId, @RequestParam String title,
                           @RequestParam String author,
                           @RequestParam String description, @RequestParam String dateRelease,
                           @RequestParam String totalPage, @RequestParam String typeBook,
                           @RequestParam int price, @RequestBody MultipartFile[] images) throws BookNotFoundException, IOException{
        title = title.toLowerCase();
        Book bookDb = bookService.fetchBookById(bookId);
        List<Image> imageList = bookService.updateImage(title, bookDb.getTitle(), images);
        int totalPageNum = Integer.parseInt(totalPage);
        Book book = new Book(title, author, description, dateRelease, totalPageNum, typeBook, price, imageList);

        return ResponseEntity.status(HttpStatus.OK).body(bookService.updateBook(bookId, book));
    }

    @DeleteMapping("/admin/book/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable("id") int bookId) throws BookNotFoundException, IOException {
        Book book = bookService.fetchBookById(bookId);
        bookService.deleteImage(book.getTitle());
        bookService.deleteBookById(bookId);
        return ResponseEntity.status(HttpStatus.OK).body("Delete book successfully!!!");
    }

}
