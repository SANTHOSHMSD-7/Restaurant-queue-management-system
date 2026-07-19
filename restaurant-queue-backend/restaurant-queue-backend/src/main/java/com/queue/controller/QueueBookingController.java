package com.queue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.queue.model.QueueBooking;
import com.queue.service.QueueBookingService;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin("*")
public class QueueBookingController {

    @Autowired
    private QueueBookingService queueBookingService;

    @PostMapping
    public QueueBooking createBooking(@RequestBody QueueBooking booking) {
        return queueBookingService.createBooking(booking);
    }

    @GetMapping
    public List<QueueBooking> getBookings() {
        return queueBookingService.getAllBookings();
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<QueueBooking> getRestaurantBookings(@PathVariable Long restaurantId) {
        return queueBookingService.getBookingsByRestaurant(restaurantId);
    }

    @PutMapping("/{id}/{status}")
    public QueueBooking updateStatus(
            @PathVariable Long id,
            @PathVariable String status) {
        return queueBookingService.updateStatus(id, status);
    }
}