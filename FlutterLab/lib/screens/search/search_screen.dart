import 'package:app1/screens/profile/profile_screen.dart';
import 'package:flutter/material.dart';

class SearchScreen extends StatelessWidget {
  const SearchScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Test();
  }
}

class Test extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return TestState();
  }
}

class TestState extends State<Test> {
  late String name;

  @override
  void initState() {
    name = '';
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Center(
            child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            'Tên: $name',
            style: const TextStyle(
                color: Colors.amber, backgroundColor: Colors.amberAccent),
          ),
        )),
        ElevatedButton(
          onPressed: changeState,
          child: Text('Click me', selectionColor: Colors.amber),
        ),
      ],
    );
  }

  changeState() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ProfileScreen(),
      ),
    );
  }
}
