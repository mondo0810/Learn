// axios.js

import _axios from 'axios';

const axios = _axios.create({
    baseURL: 'http://localhost:8000/', // Thay đổi đường dẫn baseURL tùy thuộc vào URL của bạn
    timeout: 10000, // Thời gian chờ cho mỗi yêu cầu là 10 giây (tùy chọn)
    headers: {
        'Content-Type': 'application/json', // Có thể chỉnh sửa hoặc thêm các header tùy ý ở đây
    },
});

export default axios;
