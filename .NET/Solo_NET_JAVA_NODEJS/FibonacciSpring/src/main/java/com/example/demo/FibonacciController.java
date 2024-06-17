package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FibonacciController {

    @GetMapping("/java")
    public FibonacciResponse thiBlue() {
        // Tính toán nặng Fibonacci
        int n = 45; // Số Fibonacci cần tính (có thể thay đổi tùy ý)
        long startTime = System.nanoTime();
        long fibonacciResult = fibonacci(n);
        long endTime = System.nanoTime();
        long elapsedNanoseconds = endTime - startTime;
        double elapsedMilliseconds = elapsedNanoseconds / 1e6;

        // Tạo đối tượng FibonacciResponse để trả về dưới dạng JSON
        FibonacciResponse response = new FibonacciResponse();
        response.setMessage(String.format("Hello bro nhé tuổi tôm, Fibonacci(%d) = %d", n, fibonacciResult));
        response.setTimeTaken(String.format("%.2fms", elapsedMilliseconds));

        return response;
    }

    // Phương thức tính toán số Fibonacci thứ n (cách đệ quy)
    private long fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    // Lớp định nghĩa đối tượng JSON response
    private static class FibonacciResponse {
        private String message;
        private String timeTaken;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getTimeTaken() {
            return timeTaken;
        }

        public void setTimeTaken(String timeTaken) {
            this.timeTaken = timeTaken;
        }
    }
}
