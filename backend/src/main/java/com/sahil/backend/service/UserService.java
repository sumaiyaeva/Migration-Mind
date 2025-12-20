package com.sahil.backend.service;

import com.sahil.backend.model.User;
import com.sahil.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User signup(String name, String email, String password) throws Exception {
        // Check if email already exists
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            throw new Exception("Email already exists");
        }

        // Create new user
        User user = new User(name, email, password);
        return userRepository.save(user);
    }
}
