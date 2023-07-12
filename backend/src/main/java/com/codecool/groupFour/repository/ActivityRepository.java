package com.codecool.groupFour.repository;

import com.codecool.groupFour.model.Activity;
import com.codecool.groupFour.model.ActivityType;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ActivityRepository {

    private final List<Activity> activities;

    public ActivityRepository() {
        this.activities = new ArrayList<>();
        activities.add(new Activity(ActivityType.RUNNING, UUID.fromString("01e25fa4-eaaf-42e8-908c-e6edccc1c640"), "Bieganie z Dominikem", "Radziszow", "Prosta", LocalDate.parse("2023-07-13"), LocalTime.parse("17:00:00"), "Zapraszam na bieganie"));
        activities.add(new Activity(ActivityType.CYCLING, UUID.fromString("1eb9a924-cdd0-4963-8eff-5069a74ba836"), "Rowerowanie z Kamilem", "Krzeszowice", "Bandurskiego", LocalDate.parse("2023-07-14"), LocalTime.parse("13:00:00"), "Zapraszam na jazdę na rowerze"));
        activities.add(new Activity(ActivityType.SKATING, UUID.fromString("7b5f3689-9f44-44ae-adbf-6d03a80eafa6"), "Rolki z Ignacym", "Warszawa", "Niemcewicza", LocalDate.parse("2023-07-15"), LocalTime.parse("15:00:00"), "Zapraszam na rolki"));
        activities.add(new Activity(ActivityType.WALKING, UUID.fromString("9f0170cc-053b-4267-a3c9-e537710a793a"), "Spacer z Jakubem", "Orly", "Sportowa", LocalDate.parse("2023-07-16"), LocalTime.parse("20:00:00"), "Zapraszam na spacer"));
    }

    public List<Activity> getAllActivities() {
        return activities;
    }

    public Activity getActivityById(UUID id) {
        Optional<Activity> optionalActivity = activities.stream()
                .filter(activity -> activity.getActivityId().equals(id))
                .findFirst();
        if (optionalActivity.isPresent()) {
            return optionalActivity.get();
        }
        throw new IllegalArgumentException("No activity with requested Id");
    }
}
