package com.example.demo.mapper;


import com.example.demo.dto.response.ProductRes;
import com.example.demo.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    // Convert Product entity to ProductDTO
    ProductRes toProductDTO(Product product);

    // Convert ProductDTO to Product entity
    Product toProduct(ProductRes productRes);
}