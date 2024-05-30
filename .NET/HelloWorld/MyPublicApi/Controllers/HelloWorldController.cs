using Microsoft.AspNetCore.Mvc;
using System;
using System.Numerics;

namespace MyPublicApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloWorldController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var response = new
            {
                Message = "Hello, World!  djkd nbr ndc kskjk k ndcmnmnd sdsnd jdkjèndc dfns hah nnzdfsnxo nè ba "
            };

            return Ok(response);
        }

        [HttpGet("heavy-computation")]
        public IActionResult HeavyComputation()
        {
            int n = 500000; // Số Fibonacci lớn
            BigInteger result = Fibonacci(n);

            var response = new
            {
                Number = n,
                Fibonacci = result.ToString()
            };

            return Ok(response);
        }

        private BigInteger Fibonacci(int n)
        {
            if (n <= 1)
                return n;

            BigInteger a = 0;
            BigInteger b = 1;

            for (int i = 2; i <= n; i++)
            {
                BigInteger temp = a + b;
                a = b;
                b = temp;
            }

            return b;
        }
    }
}
