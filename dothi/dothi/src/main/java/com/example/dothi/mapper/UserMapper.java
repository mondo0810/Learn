package com.example.dothi.mapper;

import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO toUserResDTO(User user);
    User toEnity(UserRequestDTO userReqDTO);

    List<UserResponseDTO> toListUserResDTO(List<User> user);
    List<User> toListEnity(List<UserRequestDTO> userReqDTO);

}
