using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace FibonacciDotnet.Controllers
{
    [ApiController]
    [Route("net")]
    public class FibonacciController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get([FromQuery] int n = 5)
        {
            if (n < 0 || n >= 50)
            {
                return BadRequest(new { message = "Tham số n phải là một số nguyên không âm và nhỏ hơn 50." });
            }

            Stopwatch stopwatch = Stopwatch.StartNew();
            long fibonacciResult = Fibonacci(n);
            stopwatch.Stop();
            long elapsedMilliseconds = stopwatch.ElapsedMilliseconds;

            return Ok(new
            {
                message = $"Hello Đỗ Thi, Fibonacci({n}) = {fibonacciResult}",
                timeTaken = $"{elapsedMilliseconds}ms"
            });
        }

        private long Fibonacci(int n)
        {
            if (n <= 1)
                return n;
            return Fibonacci(n - 1) + Fibonacci(n - 2);
        }
    }
}
