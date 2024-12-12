package com.example.dothi.dto.resquest;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class RoleRequestDTO {
    @NotEmpty(message = "Role list cannot be empty")
    private List<String> names;
    private String description;
}
