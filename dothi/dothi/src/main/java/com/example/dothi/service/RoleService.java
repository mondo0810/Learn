package com.example.dothi.service;

import com.example.dothi.dto.response.RoleResponseDTO;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.RoleRequestDTO;
import com.example.dothi.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    List<UserResponseDTO> getAllRole();
    RoleResponseDTO save(RoleRequestDTO roleRequestDTO);
    Optional<Role> delete(String name);
}
