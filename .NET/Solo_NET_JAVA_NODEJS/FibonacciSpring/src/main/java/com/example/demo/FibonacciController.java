package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class FibonacciController {

    @GetMapping("/java")
    public FibonacciResponse calculateFibonacci(@RequestParam(name = "n", defaultValue = "5") int n) {
        if (n < 0 || n >= 50) {
            return new FibonacciResponse("Tham số n phải là một số nguyên không âm và nhỏ hơn 50.", "0ms");
        }

        long startTime = System.nanoTime();
        long fibonacciResult = fibonacci(n);
        long endTime = System.nanoTime();
        double elapsedMilliseconds = (endTime - startTime) / 1e6;

        return new FibonacciResponse(
                String.format("Hello Đỗ Thi, Fibonacci(%d) = %d", n, fibonacciResult),
                String.format("%.2fms", elapsedMilliseconds)
        );
    }

    private long fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    private static class FibonacciResponse {
        private String message;
        private String timeTaken;

        public FibonacciResponse(String message, String timeTaken) {
            this.message = message;
            this.timeTaken = timeTaken;
        }

        public String getMessage() { return message; }
        public String getTimeTaken() { return timeTaken; }
    }
}
