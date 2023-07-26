package com.codecool.goMove.service;

import com.codecool.goMove.model.Activity;
import com.codecool.goMove.model.User;
import com.codecool.goMove.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(UUID id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new IllegalArgumentException("No user with requested Id");
    }

    public boolean addUser(User user) {
        Optional<User> userByUserName = userRepository.findByUserName(user.getUserName());
        Optional<User> userByUserEmail = userRepository.findByUserEmail(user.getUserEmail());

        if (userByUserName.isEmpty() && userByUserEmail.isEmpty()) {
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public void updateUser(User user, UUID id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isPresent()) {
            User userToUpdate = optionalUser.get();
            userToUpdate.setUserName(user.getUserName());
            userToUpdate.setUserEmail(user.getUserEmail());
            userToUpdate.setPassword(user.getPassword());
            userToUpdate.setCity(user.getCity());
            userToUpdate.setPreferredActivity(user.getPreferredActivity());
            userRepository.save(userToUpdate);
        } else {
            throw new IllegalArgumentException("No user with requested Id");
        }
    }

    private Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    public void enrollUser(UUID userId, UUID activityId) {
        User userToUpdate = getUserById(userId);
        Set<Activity> enrolledActivities = userToUpdate.getEnrolledActivities();
        Activity activityToAdd = new Activity();
        activityToAdd.setActivityId(activityId);
        enrolledActivities.add(activityToAdd);
        userRepository.save(userToUpdate);
    }
}
