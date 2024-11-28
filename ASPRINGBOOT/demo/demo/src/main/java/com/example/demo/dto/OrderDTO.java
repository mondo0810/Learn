package com.example.demo.dto;

import com.example.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Long orderId; // Chỉ sử dụng trong phản hồi (response)
    private String customerName;
    private String customerAddress;
    private double totalPrice; // Chỉ sử dụng trong phản hồi (response)
    private int status;
    private List<OrderItemDTO> items;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemDTO {
        private Long productId; // Sử dụng trong cả request và response
        private String productName; // Chỉ sử dụng trong phản hồi (response)
        private double productPrice; // Chỉ sử dụng trong phản hồi (response)
        private int quantity;
        private double totalPrice; // Chỉ sử dụng trong phản hồi (response)
    }
}
