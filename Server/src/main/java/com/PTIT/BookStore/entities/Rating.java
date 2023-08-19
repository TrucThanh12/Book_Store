package com.PTIT.BookStore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tbl_rating")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int star;

    private String message;

    private String userNameRating;

    public Rating(int star, String message, String userNameRating) {
        this.star = star;
        this.message = message;
        this.userNameRating = userNameRating;
    }
}
