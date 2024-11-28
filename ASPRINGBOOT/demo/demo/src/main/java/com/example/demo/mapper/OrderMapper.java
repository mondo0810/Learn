package com.example.demo.mapper;

import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.OrderDTO.OrderItemDTO;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;


@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    // Convert OrderDTO to Order entity
    @Mapping(target = "items", source = "items") // Map the order items from DTO to entity
    Order toOrder(OrderDTO orderDTO);

    @Mapping(target = "orderId", source = "id")
    @Mapping(target = "items", source = "items") // Map the order items from entity to DTO
    OrderDTO toOrderDTO(Order order);

    // Chuyển đổi danh sách Order sang danh sách OrderDTO
    List<OrderDTO> toOrderDTOs(List<Order> orders);

    // Convert OrderItemDTO to OrderItem entity
    @Mapping(target = "product.name", source = "productName")
    @Mapping(target = "product.price", source = "productPrice")
    OrderItem toOrderItem(OrderItemDTO orderItemDTO);

    // Convert OrderItem entity to OrderItemDTO
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name") // Map the product name from entity to DTO
    @Mapping(target = "productPrice", source = "product.price") // Map the product price from entity to DTO
    OrderItemDTO toOrderItemDTO(OrderItem orderItem);
}
