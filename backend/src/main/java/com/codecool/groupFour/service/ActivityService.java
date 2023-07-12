package com.codecool.groupFour.service;

import com.codecool.groupFour.model.Activity;
import com.codecool.groupFour.repository.ActivityRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getAllActivities() {
        return activityRepository.getAllActivities();
    }

    public Activity getActivityById(UUID id) {
        return activityRepository.getActivityById(id);
    }
}
