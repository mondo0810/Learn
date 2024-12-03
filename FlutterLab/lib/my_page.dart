import 'package:app1/screens/cart/cart_screen.dart';
import 'package:app1/screens/home/home_screen.dart';
import 'package:app1/screens/profile/profile_screen.dart';
import 'package:app1/screens/search/search_screen.dart';
import 'package:flutter/material.dart';

class MyPage extends StatefulWidget {
  const MyPage({Key? key}) : super(key: key);

  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  final List<Widget> screens = [
    HomeScreen(),
    SearchScreen(),
    CartScreen(),
    ProfileScreen()
  ];

  int _selectedIndex = 0;

  changeTab(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Home Page", style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.amber,
      ),
      body: screens[_selectedIndex],
      bottomNavigationBar: buildBottomNavigationBar(),
    );
  }

  BottomNavigationBar buildBottomNavigationBar() {
    return BottomNavigationBar(
      currentIndex: _selectedIndex,
      onTap: (index) => changeTab(index),
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: "Home"),
        BottomNavigationBarItem(
            icon: Icon(Icons.search_outlined), label: "Search"),
        BottomNavigationBarItem(
            icon: Icon(Icons.shopping_bag_outlined), label: "Cart"),
        BottomNavigationBarItem(
            icon: Icon(Icons.person_2_outlined), label: "Profile"),
      ],
      selectedItemColor: Colors.orange,
      unselectedItemColor: Colors.black38,
    );
  }
}
