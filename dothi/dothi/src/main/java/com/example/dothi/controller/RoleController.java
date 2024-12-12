package com.example.dothi.controller;

import com.example.dothi.dto.response.RoleResponseDTO;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.RoleCreateDTO;
import com.example.dothi.dto.resquest.RoleRequestDTO;
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
    public ResponseEntity<List<RoleResponseDTO>> getAllUser() {
        return ResponseEntity.ok(roleService.getAllRole());
    }

    @PostMapping
    public ResponseEntity<RoleResponseDTO> createUser(@RequestBody RoleCreateDTO roleCreateDTO) {
        return ResponseEntity.ok(roleService.save(roleCreateDTO));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteUser(@PathVariable String name) {
        return ResponseEntity.ok(roleService.delete(name));
    }
}
