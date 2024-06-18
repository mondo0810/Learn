<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FibonacciController extends Controller
{
    public function getFibonacci(Request $request)
    {
        $n = $request->query('n', 5);

        if (!is_numeric($n) || $n < 0 || $n >= 50) {
            return response()->json([
                'message' => 'Tham số n phải là một số nguyên không âm và nhỏ hơn 50.'
            ], 400);
        }

        $start = microtime(true);
        $fibonacciResult = $this->fibonacci($n);
        $timeTaken = microtime(true) - $start;

        return response()->json([
            'message' => "Hello Đỗ Thi, Fibonacci($n) = $fibonacciResult",
            'timeTaken' => round($timeTaken * 1000, 2) . 'ms'
        ]);
    }

    private function fibonacci($n)
    {
        if ($n <= 1) {
            return $n;
        }
        return $this->fibonacci($n - 1) + $this->fibonacci($n - 2);
    }
}
