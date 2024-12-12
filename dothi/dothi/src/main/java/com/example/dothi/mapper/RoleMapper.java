package com.example.dothi.mapper;

import com.example.dothi.dto.response.RoleResponseDTO;
import com.example.dothi.dto.response.UserResponseDTO;
import com.example.dothi.dto.resquest.RoleCreateDTO;
import com.example.dothi.dto.resquest.UserRequestDTO;
import com.example.dothi.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleResponseDTO toRoleResDTO(Role role);

    Role toEnity(RoleCreateDTO roleCreateDTO);

    List<RoleResponseDTO> toListRoleResDTO(List<Role> role);

    List<Role> toListEnity(List<RoleResponseDTO> roleResponseDTOS);

    Role update(@MappingTarget Role role, RoleResponseDTO userRequestDTO);

}
