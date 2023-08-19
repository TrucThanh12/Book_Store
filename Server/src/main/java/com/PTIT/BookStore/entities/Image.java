package com.PTIT.BookStore.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.Table;

@Table(name = "tbl_image")
@Data
@NoArgsConstructor
@Embeddable
public class Image {

    private String name;

    public Image(String name){
        this.name = name;
    }
}