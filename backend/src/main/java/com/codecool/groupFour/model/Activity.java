package com.codecool.groupFour.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Setter
@Getter
public class Activity {
    private final UUID activityId;
    private ActivityType activityType;
    private UUID owner;
    private String title;
    private String city;
    private String street;
    private LocalDate date;
    private LocalTime time;
    private String description;
    private List<UUID> participants;
    private String activityPhotoUrl;
    private List<UUID> comments;

    public Activity(ActivityType activityType, UUID owner, String title, String city, String street, LocalDate date, LocalTime time, String description) {
        this.activityId = UUID.randomUUID();
        this.activityType = activityType;
        this.owner = owner;
        this.title = title;
        this.city = city;
        this.street = street;
        this.date = date;
        this.time = time;
        this.description = description;
    }
}
