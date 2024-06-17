const express = require('express');
const app = express();
const port = 3000;

// Phương thức tính toán số Fibonacci thứ n (cách đệ quy)
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/node', (req, res) => {
    // Tính toán nặng Fibonacci
    const n = 45; // Số Fibonacci cần tính (có thể thay đổi tùy ý)
    const startTime = process.hrtime();
    const fibonacciResult = fibonacci(n);
    const elapsedHrTime = process.hrtime(startTime);
    const elapsedMilliseconds = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

    // Trả về kết quả dưới dạng JSON
    res.json({
        message: `Hello bro nhé tuổi, Fibonacci(${n}) = ${fibonacciResult}`,
        timeTaken: `${elapsedMilliseconds.toFixed(2)}ms`
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
