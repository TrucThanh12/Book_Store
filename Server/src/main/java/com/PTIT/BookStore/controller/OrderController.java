package com.PTIT.BookStore.controller;

import com.PTIT.BookStore.entities.Order;
import com.PTIT.BookStore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order/create")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(order));
    }

    @GetMapping("/order/{userId}/orders")
    public ResponseEntity<?> getAllOrder(@PathVariable("userId") int userId) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllOrder(userId));
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrderAdmin() {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.gettAllOrderAdmin());
    }

    @GetMapping("/order/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable("orderId") int orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.status(HttpStatus.OK).body("Cancel order successfully!!!");
    }

    @GetMapping("/order/confirm/{orderId}")
    public ResponseEntity<?> confirmOrder(@PathVariable("orderId") int orderId) {
        orderService.confirmOrder(orderId);
        return ResponseEntity.status(HttpStatus.OK).body("Confirm order successfully!!!");
    }

}
