package com.example.dothi.controller;

import com.example.dothi.dto.ApiResponse;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.RoleRequestDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.service.UserService;
import jakarta.validation.Valid;
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
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getAllUsers(
            @RequestParam(required = false) String searchParams) {

        List<UserResponseDTO> userResponseDTOs = userService.searchUsers(searchParams);

        return ResponseEntity.ok(
                ApiResponse.<List<UserResponseDTO>>builder()
                        .data(userResponseDTOs)
                        .message("Search completed successfully")
                        .build());
    }


    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody @Valid UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(userService.save(userRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@RequestBody @Valid UserRequestDTO userRequestDTO, @PathVariable Long id) {
        return ResponseEntity.ok(userService.update(userRequestDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.delete(id));
    }

    @PutMapping("/{userId}/roles")
    public ResponseEntity<ApiResponse> assignRolesToUser(@PathVariable Long userId, @RequestBody @Valid RoleRequestDTO roleRequestDTO) {
        userService.assignRoles(userId, roleRequestDTO.getNames());
        return ResponseEntity.ok(new ApiResponse(true, "Roles assigned successfully", null));
    }
}
