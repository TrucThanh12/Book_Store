package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Order;

import java.util.List;

public interface OrderService {

    Order createOrder(Order order);

    List<Order> getAllOrder(int userId);

    List<Order> gettAllOrderAdmin();

    void cancelOrder(int orderId);

    void confirmOrder(int orderId);
}
