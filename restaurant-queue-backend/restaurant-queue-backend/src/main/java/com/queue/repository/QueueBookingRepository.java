package com.queue.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.queue.model.QueueBooking;

public interface QueueBookingRepository extends JpaRepository<QueueBooking, Long> {
    List<QueueBooking> findByRestaurantId(Long restaurantId);
}