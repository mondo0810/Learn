package com.example.dothi.dto.resquest;

import com.example.dothi.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserRequestDTO {
    private Long id;
    private String email;
    private String name;
    private String password;
    private Set<Role> roles;
}
