package com.PTIT.BookStore.repository;

import com.PTIT.BookStore.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    List<Book> findByTitleContaining(String title);

    List<Book> findByTypeBook(String typeBook);

    Book findByTitle(String title);
}
