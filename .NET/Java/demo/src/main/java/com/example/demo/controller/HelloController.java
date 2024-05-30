package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/")
    public String sayHello() {
        return "Hello Wo ssddsadsfdgdhrld! bro nè hdsnn ahah sao cu, tuổi gì ăn tao";
    }

    @GetMapping("/heavy-computation")
    public Map<String, Object> heavyComputation() {
        int n = 500000; // Số Fibonacci lớn
        BigInteger result = fibonacci(n);

        Map<String, Object> response = new HashMap<>();
        response.put("Number", n);
        response.put("Fibonacci", result.toString());

        return response;
    }

    private BigInteger fibonacci(int n) {
        if (n <= 1) {
            return BigInteger.valueOf(n);
        }

        BigInteger a = BigInteger.ZERO;
        BigInteger b = BigInteger.ONE;

        for (int i = 2; i <= n; i++) {
            BigInteger temp = a.add(b);
            a = b;
            b = temp;
        }

        return b;
    }
}
