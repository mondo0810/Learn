package com.example.dothi.dto.resquest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class RoleRequestDTO {
    private String name;
    private String description;
}
