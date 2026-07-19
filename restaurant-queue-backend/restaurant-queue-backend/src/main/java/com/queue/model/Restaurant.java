package com.queue.model;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String cuisine;
    private int waitTime;
    private int availableTables;
    private int peopleInQueue;
    private String imageUrl;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public int getWaitTime() {
        return waitTime;
    }

    public void setWaitTime(int waitTime) {
        this.waitTime = waitTime;
    }

    public int getAvailableTables() {
        return availableTables;
    }

    public void setAvailableTables(int availableTables) {
        this.availableTables = availableTables;
    }

    public int getPeopleInQueue() {
        return peopleInQueue;
    }

    public void setPeopleInQueue(int peopleInQueue) {
        this.peopleInQueue = peopleInQueue;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}