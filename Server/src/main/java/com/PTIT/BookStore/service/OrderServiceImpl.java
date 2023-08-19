package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Order;
import com.PTIT.BookStore.entities.OrderItem;
import com.PTIT.BookStore.repository.BookRepository;
import com.PTIT.BookStore.repository.OrderItemRepository;
import com.PTIT.BookStore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Order createOrder(Order order) {
        for(OrderItem orderItem : order.getListOderItem()) {
            orderItemRepository.save(orderItem);
        }
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrder(int userId) {
        List<Order> orderList = orderRepository.findAllByUserId(userId);
        return orderList;
    }

    @Override
    public List<Order> gettAllOrderAdmin() {
        return orderRepository.findAll();
    }

    @Override
    public void cancelOrder(int orderId) {
        Order order = orderRepository.findById(orderId).get();
        for(OrderItem orderItem: order.getListOderItem()) {
            orderItem.setStatus("Cancel");
        }
        orderRepository.save(order);
    }

    @Override
    public void confirmOrder(int orderId) {
        Order order = orderRepository.findById(orderId).get();
        for(OrderItem orderItem: order.getListOderItem()) {
            orderItem.setStatus("Confirm");
        }
        orderRepository.save(order);
    }


}
