package com.example.dothi.service.impl;

import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.entity.Role;
import com.example.dothi.entity.User;
import com.example.dothi.exception.NotFoundException;
import com.example.dothi.mapper.UserMapper;
import com.example.dothi.repository.RoleRepository;
import com.example.dothi.repository.UserRepository;
import com.example.dothi.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    @Override
    public List<UserResponseDTO> getAllUser() {
        List<User> users = userRepository.findAll();
        return userMapper.toListUserResDTO(users);
    }

    @Override
    public List<UserResponseDTO> searchUsers(String searchParams) {
        List<User> users = userRepository.searchByParams(searchParams);
        return userMapper.toListUserResDTO(users);
    }


    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with ID " + id + " not found"));
        UserResponseDTO userResponseDTO = userMapper.toUserResDTO(user);
        return userResponseDTO;
    }

    public UserResponseDTO save(UserRequestDTO userReqDTO) {
        User user = userMapper.toEnity(userReqDTO);
        UserResponseDTO userResDTO = userMapper.toUserResDTO(userRepository.save(user));
        return userResDTO;
    }

    public UserResponseDTO update(UserRequestDTO userRequestDTO, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with ID " + id + " not found"));
        userMapper.update(user, userRequestDTO);
        User updatedUser = userRepository.save(user);
        return userMapper.toUserResDTO(updatedUser);
    }

    @Override
    @Transactional
    public void assignRoles(Long userId, List<String> roleNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        List<Role> roles = roleRepository.findAllByNameIn(roleNames);
        if (roles.size() != roleNames.size()) {
            throw new NotFoundException("Some roles not found");
        }

        user.setRoles(new HashSet<>(roles));

        userRepository.save(user);
    }

    @Override
    public boolean delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with ID " + id + " not found"));

        userRepository.delete(user);
        return true;
    }

}
