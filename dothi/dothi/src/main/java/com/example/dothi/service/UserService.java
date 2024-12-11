package com.example.dothi.service;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;

import java.util.List;

public interface UserService {
    List<UserResponseDTO> getAllUser();
    UserResponseDTO save(UserRequestDTO userReqDTO);
    UserResponseDTO delete(Integer id);
}
