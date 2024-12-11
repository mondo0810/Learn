import 'package:app1/screens/home/product.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        TextField(
          decoration: InputDecoration(labelText: 'Search Product'),
        ),
        SizedBox(
          height: 800, // Đảm bảo ProductListWidget có chiều cao cụ thể
          child: ProductListWidget(
              apiUrl: 'https://dummyjson.com/products?limit=12'),
        ),
        // CarouselDemo(),
        ClipOval(
          child: Image.network('https://picsum.photos/250?image=9'),
        ),
        const Text("Hello e,"),
        const Text("Hheheh"),
      ],
    );
  }
}
