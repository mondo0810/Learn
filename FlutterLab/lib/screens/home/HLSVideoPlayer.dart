import 'package:flutter/material.dart';
import 'package:chewie/chewie.dart';
import 'package:video_player/video_player.dart';

class VideoPlayerScreen extends StatefulWidget {
  @override
  _VideoPlayerScreenState createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late VideoPlayerController _controller;
  late ChewieController _chewieController;

  @override
  void initState() {
    super.initState();
    // Khởi tạo VideoPlayerController với URI m3u8
    _controller = VideoPlayerController.networkUrl(Uri.parse(
        'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4'))
      ..initialize().then((_) {
        // Sau khi video được khởi tạo, cập nhật lại widget để hiển thị video
        setState(() {
          // Khởi tạo ChewieController
          _chewieController = ChewieController(
            videoPlayerController: _controller,
            autoPlay: true,
            looping: true,
            aspectRatio: 16 / 9,
            errorBuilder: (context, errorMessage) {
              return Center(child: Text(errorMessage));
            },
          );
        });
      });
  }

  @override
  void dispose() {
    // Giải phóng tài nguyên khi không còn sử dụng
    _controller.dispose();
    _chewieController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Chewie Video Player'),
      ),
      body: Center(
        child: _chewieController != null &&
                _chewieController.videoPlayerController.value.isInitialized
            ? Chewie(controller: _chewieController) // Hiển thị video
            : CircularProgressIndicator(), // Hiển thị loading khi video chưa sẵn sàng
      ),
    );
  }
}
