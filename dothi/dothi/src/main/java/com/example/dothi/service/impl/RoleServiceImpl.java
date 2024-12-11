package com.example.dothi.service.impl;

import com.example.dothi.dto.response.RoleResponseDTO;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.RoleRequestDTO;
import com.example.dothi.entity.Role;
import com.example.dothi.repository.RoleRepository;
import com.example.dothi.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public List<UserResponseDTO> getAllRole() {
        return List.of();
    }

    @Override
    public RoleResponseDTO save(RoleRequestDTO roleRequestDTO) {
        return null;
    }

    @Override
    public Optional<Role> delete(String name) {
        // Tìm Role theo name
        Optional<Role> role = roleRepository.findByName(name);

        // Kiểm tra nếu Role tồn tại thì xóa
        if (role.isPresent()) {
            roleRepository.delete(role.get());  // Xóa Role nếu tìm thấy
            return role;
        }

        return role;  // Trả về false nếu Role không tồn tại
    }

}
