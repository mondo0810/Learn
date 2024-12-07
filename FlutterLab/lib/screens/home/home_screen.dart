import 'package:app1/screens/home/HLSVideoPlayer.dart';
import 'package:app1/screens/home/slider/carousel_demo.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      child: Column(
        children: [
          // VideoPlayerScreen(),
          // CarouselDemo(),
          ClipOval(child: Image.network('https://picsum.photos/250?image=9')),
          Text("Hello e,"),
          Text("Hheheh"),
        ],
      ),
    );
  }
}
