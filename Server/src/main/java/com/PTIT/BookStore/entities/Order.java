package com.PTIT.BookStore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "tbl_order")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String address;
    private String phoneNumber;
    private String fullNameUserOrder;

    private String dateOrder;

    @ManyToOne
    @JoinColumn(name = "user_order")
    private User user;

    @OneToMany
    @JoinColumn(name = "order_id")
    private Set<OrderItem> listOderItem;
}
