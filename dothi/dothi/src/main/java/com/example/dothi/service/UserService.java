package com.example.dothi.service;

import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface UserService {
    List<UserResponseDTO> getAllUser();

    List<UserResponseDTO> searchUsers(String searchParams);

    UserResponseDTO getUserById(Long id);

    UserResponseDTO save(UserRequestDTO userReqDTO);

    boolean delete(Long id);

    UserResponseDTO update(UserRequestDTO userRequestDTO, Long id);

    public void assignRoles(Long userId, List<String> roleNames);
}
