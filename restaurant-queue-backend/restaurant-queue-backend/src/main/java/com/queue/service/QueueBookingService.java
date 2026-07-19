package com.queue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.queue.model.QueueBooking;
import com.queue.repository.QueueBookingRepository;

@Service
public class QueueBookingService {

    @Autowired
    private QueueBookingRepository queueBookingRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String QUEUE_CACHE = "QUEUE_BOOKINGS";

    // ---------------- CREATE BOOKING ----------------

    public QueueBooking createBooking(QueueBooking booking) {

        booking.setStatus("WAITING");

        QueueBooking savedBooking = queueBookingRepository.save(booking);

        // Clear cache
        redisTemplate.delete(QUEUE_CACHE);

        // WebSocket update
        messagingTemplate.convertAndSend("/topic/queue", savedBooking);

        return savedBooking;
    }

    // ---------------- GET ALL BOOKINGS ----------------

    @SuppressWarnings("unchecked")
    public List<QueueBooking> getAllBookings() {

        List<QueueBooking> cached =
                (List<QueueBooking>) redisTemplate.opsForValue().get(QUEUE_CACHE);

        if (cached != null) {
            System.out.println("Fetching Queue from Redis...");
            return cached;
        }

        System.out.println("Fetching Queue from MySQL...");

        List<QueueBooking> bookings = queueBookingRepository.findAll();

        redisTemplate.opsForValue().set(QUEUE_CACHE, bookings);

        return bookings;
    }

    // ---------------- RESTAURANT BOOKINGS ----------------

    public List<QueueBooking> getBookingsByRestaurant(Long restaurantId) {
        return queueBookingRepository.findByRestaurantId(restaurantId);
    }

    // ---------------- UPDATE STATUS ----------------

    public QueueBooking updateStatus(Long id, String status) {

        QueueBooking booking =
                queueBookingRepository.findById(id).orElseThrow();

        booking.setStatus(status);

        QueueBooking updatedBooking =
                queueBookingRepository.save(booking);

        // Clear cache
        redisTemplate.delete(QUEUE_CACHE);

        // Live update
        messagingTemplate.convertAndSend("/topic/queue", updatedBooking);

        return updatedBooking;
    }
}