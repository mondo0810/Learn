const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/node', (req, res) => {
    const n = parseInt(req.query.n, 10) || 5;
    if (n < 0 || n >= 50) {
        return res.status(400).json({
            message: 'Tham số n phải là một số nguyên không âm và nhỏ hơn 50.',
            timeTaken: '0ms'
        });
    }

    const startTime = process.hrtime();
    const fibonacciResult = fibonacci(n);
    const elapsedHrTime = process.hrtime(startTime);
    const elapsedMilliseconds = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

    res.json({
        message: `Hello Đỗ Thi, Fibonacci(${n}) = ${fibonacciResult}`,
        timeTaken: `${elapsedMilliseconds.toFixed(2)}ms`
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
