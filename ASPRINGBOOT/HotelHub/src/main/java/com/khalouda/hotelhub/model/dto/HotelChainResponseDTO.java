package com.khalouda.hotelhub.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class HotelChainResponseDTO {
    private Long hotelChainId;
    private String name;
    private String description;
    private String headquartersLocation;
    private List<HotelResponseDTO> hotels;
}
