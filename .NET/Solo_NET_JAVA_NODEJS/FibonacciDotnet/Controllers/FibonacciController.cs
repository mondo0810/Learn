using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace FibonacciDotnet.Controllers
{
    [ApiController]
    [Route("net")]
    public class FibonacciController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            // Tính toán nặng Fibonacci
            int n = 45; // Số Fibonacci cần tính (có thể thay đổi tùy ý)
            Stopwatch stopwatch = Stopwatch.StartNew();
            long fibonacciResult = Fibonacci(n);
            stopwatch.Stop();
            long elapsedMilliseconds = stopwatch.ElapsedMilliseconds;

            // Trả về kết quả dưới dạng JSON
            return Ok(new
            {
                message = $"Hello bro nhé tuổi, Fibonacci({n}) = {fibonacciResult}",
                timeTaken = $"{elapsedMilliseconds}ms"
            });
        }

        // Phương thức tính toán số Fibonacci thứ n (cách đệ quy)
        private long Fibonacci(int n)
        {
            if (n <= 1)
                return n;
            return Fibonacci(n - 1) + Fibonacci(n - 2);
        }
    }
}
