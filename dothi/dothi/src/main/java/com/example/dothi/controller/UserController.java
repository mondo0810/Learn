package com.example.dothi.controller;

import com.example.dothi.dto.ApiResponse;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.exception.BadRequestException;
import com.example.dothi.exception.NotFoundException;
import com.example.dothi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getAllUser() {

        List<UserResponseDTO> userResponseDTO = userService.getAllUser();

        return ResponseEntity.ok(
                ApiResponse.<List<UserResponseDTO>>builder()
                        .data(userResponseDTO)
                        .message("Thành Công")
                        .build());
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(userService.save(userRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getAllUser());
    }
}
