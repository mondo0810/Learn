import 'dart:convert';
import 'package:http/http.dart' as http;
import 'movie.dart';

class ApiService {
  static const String baseUrl = "https://api.muaspinre.com/api/movies";

  Future<List<Movie>> fetchMovies(
      {String type = 'hoathinh', int pageNumber = 1, int pageSize = 10}) async {
    final response = await http.get(
      Uri.parse(
          "$baseUrl?type=$type&pageNumber=$pageNumber&pageSize=$pageSize"),
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> jsonData = json.decode(response.body);

      // Kiểm tra key "items"
      if (jsonData['items'] != null) {
        final List items = jsonData['items'];
        return items.map((item) => Movie.fromJson(item)).toList();
      } else {
        throw Exception("No items found in response");
      }
    } else {
      throw Exception("Failed to load movies");
    }
  }
}
