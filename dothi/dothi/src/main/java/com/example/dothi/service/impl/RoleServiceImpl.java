package com.example.dothi.service.impl;

import com.example.dothi.dto.response.RoleResponseDTO;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.RoleCreateDTO;
import com.example.dothi.dto.resquest.RoleRequestDTO;
import com.example.dothi.entity.Role;
import com.example.dothi.mapper.RoleMapper;
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
    private final RoleMapper roleMapper;


    @Override
    public List<RoleResponseDTO> getAllRole() {
        List<RoleResponseDTO> roleResponseDTO = roleMapper.toListRoleResDTO(roleRepository.findAll());
        return roleResponseDTO;

    }

    @Override
    public RoleResponseDTO save(RoleCreateDTO roleCreateDTO) {
        Role role = roleMapper.toEnity(roleCreateDTO);
        RoleResponseDTO roleResponseDTO = roleMapper.toRoleResDTO(roleRepository.save(role));
        return roleResponseDTO;
    }

    @Override
    public boolean delete(String name) {
        return false;
    }
}
