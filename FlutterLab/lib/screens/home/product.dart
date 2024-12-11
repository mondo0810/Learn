import 'package:app1/screens/home/product_cart.dart';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

class ProductListWidget extends StatefulWidget {
  final String apiUrl;

  const ProductListWidget({Key? key, required this.apiUrl}) : super(key: key);

  @override
  _ProductListWidgetState createState() => _ProductListWidgetState();
}

class _ProductListWidgetState extends State<ProductListWidget> {
  final Dio _dio = Dio();
  List<dynamic> _products = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchProducts();
  }

  Future<void> _fetchProducts() async {
    try {
      final response = await _dio.get(widget.apiUrl);
      setState(() {
        _products = response.data['products'];
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? const Center(child: CircularProgressIndicator())
        : _products.isEmpty
            ? const Center(child: Text('No products found.'))
            : GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2, // 2 sản phẩm trên 1 hàng
                  crossAxisSpacing: 10.0, // Khoảng cách ngang giữa các sản phẩm
                  mainAxisSpacing: 5.0, // Khoảng cách dọc giữa các sản phẩm
                  // childAspectRatio:
                  //     5 / 3, // Tỉ lệ chiều ngang / chiều dọc của mỗi ô
                ),
                itemCount: _products.length,
                itemBuilder: (context, index) {
                  final product = _products[index];
                  return ProductCard(
                      product: product); // Hiển thị widget sản phẩm
                },
              );
  }
}
