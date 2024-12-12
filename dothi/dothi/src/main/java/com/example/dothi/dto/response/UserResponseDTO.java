package com.example.dothi.dto.response;

import com.example.dothi.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserResponseDTO {
    private Long id;
    private String name;
    private Integer age;
    private BigDecimal salary;
}
