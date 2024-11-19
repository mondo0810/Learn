package com.example.demo.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {
    private T data;
    private String status;
    private String message;

    public ApiResponse( T data,String status, String message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }

    public ApiResponse(T data) {
        this.data = data;
        this.status = "success";
        this.message = "Thành công";
    }

    public ApiResponse(String status,String message) {
        this.data = null;
        this.status = "false";
        this.message = "Thất bại";
    }
}
