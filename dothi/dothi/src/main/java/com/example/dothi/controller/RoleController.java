package com.example.dothi.controller;

import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUser(){
        return null;
    }
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDTO){
        return null;
    }
   @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteUser(@PathVariable String name){
        return ResponseEntity.ok(roleService.delete(name));
    }
}
