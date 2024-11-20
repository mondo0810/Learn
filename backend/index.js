const express = require("express");
const app = express();
const path = require("path");

// Sử dụng middleware để phục vụ tệp tĩnh
app.use(express.static(path.join(__dirname, "public")));

// Một route mẫu
app.get("/", (req, res) => {
    res.send("Trang chính, truy cập các tệp tĩnh tại /index.html");
});

// Khởi động server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
