package com.example.demo.helper;

import com.example.demo.entity.User;
import com.example.demo.exception.BadRequestException;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserHelper {

    private final UserRepository userRepository;

    public UserHelper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserProfile() {
        String username = getCurrentUsername();
        System.out.println(username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException("Invalid username"));
    }

    public String getCurrentUsername() {
        // Lấy Authentication từ SecurityContextHolder
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Nếu principal là một đối tượng UserDetails (trong trường hợp sử dụng Spring Security)
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }

        // Nếu principal là một string (trong trường hợp custom)
        return principal.toString();
    }
}
