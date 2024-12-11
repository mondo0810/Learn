package com.example.dothi.controller;

import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
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
    public ResponseEntity<List<UserResponseDTO>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDTO){
        return ResponseEntity.ok(userService.save(userRequestDTO));
    }
   @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getAllUser());
    }
}
