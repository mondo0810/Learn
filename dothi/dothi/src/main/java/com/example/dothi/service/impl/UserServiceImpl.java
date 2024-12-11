package com.example.dothi.service.impl;

import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.entity.Role;
import com.example.dothi.entity.User;
import com.example.dothi.mapper.UserMapper;
import com.example.dothi.repository.RoleRepository;
import com.example.dothi.repository.UserRepository;
import com.example.dothi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    @Override
    public List<UserResponseDTO> getAllUser() {
        List<User> users = userRepository.findAll();
        return  userMapper.toListUserResDTO(users);
    }

    public UserResponseDTO save(UserRequestDTO userReqDTO) {
        User user = userMapper.toEnity(userReqDTO);

        // Kiểm tra và tạo mới Role nếu chưa có trong cơ sở dữ liệu
//        Set<Role> roles = new HashSet<>();
//        for (Role role : user.getRoles()) {
//            // Kiểm tra xem Role đã tồn tại chưa
//            Role existingRole = roleRepository.findByName(role.getName())
//                    .orElseGet(() -> {
//                        // Nếu Role không tồn tại, tạo mới Role và lưu vào cơ sở dữ liệu
//                        Role newRole = new Role(role.getName(), role.getDescription());
//                        return roleRepository.save(newRole);  // Lưu Role mới vào cơ sở dữ liệu
//                    });
//            roles.add(existingRole);  // Thêm Role vào Set roles
//        }
//
//        user.setRoles(roles);  // Gán lại các Role cho User
        UserResponseDTO userResDTO = userMapper.toUserResDTO(userRepository.save(user));  // Lưu User vào cơ sở dữ liệu
        return userResDTO;
    }


    @Override
    public UserResponseDTO delete(Integer id) {
        return null;
    }
}
