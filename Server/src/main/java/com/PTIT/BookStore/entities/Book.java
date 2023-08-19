package com.PTIT.BookStore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tbl_book")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String dateRelease;

    @Column(nullable = false)
    private int totalPage;

    @Column(nullable = false)
    private String typeBook;

    @Column(nullable = false)
    private int price;

    @ElementCollection
    @JoinTable(name = "tbl_image", joinColumns = @JoinColumn(name = "book_id"))
    private List<Image> bookImages;

    @OneToMany(cascade = CascadeType.ALL, fetch =  FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "book_id")
    private Set<Rating> ratings = new HashSet<>();

    public Book(String title, String author, String description, String dateRelease, int totalPage, String typeBook, int price, List<Image> bookImages) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.dateRelease = dateRelease;
        this.totalPage = totalPage;
        this.typeBook = typeBook;
        this.price = price;
        this.bookImages = bookImages;
    }
}
