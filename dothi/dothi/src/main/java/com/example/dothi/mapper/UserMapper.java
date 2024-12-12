package com.example.dothi.mapper;

import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO toUserResDTO(User user);

    User toEnity(UserRequestDTO userReqDTO);

    List<UserResponseDTO> toListUserResDTO(List<User> user);

    List<User> toListEnity(List<UserRequestDTO> userReqDTO);

    User update(@MappingTarget User user, UserRequestDTO userRequestDTO);

}
