class Movie {
  final int id;
  final String name;
  final String slug;
  final String originName;
  final String episodeCurrent;
  final String thumbUrl;

  Movie({
    required this.id,
    required this.name,
    required this.slug,
    required this.originName,
    required this.episodeCurrent,
    required this.thumbUrl,
  });

  factory Movie.fromJson(Map<String, dynamic> json) {
    return Movie(
      id: json['id'] ?? 0,
      name: json['name'] ?? 'Unknown',
      slug: json['slug'] ?? '',
      originName: json['originName'] ?? '',
      episodeCurrent: json['episodeCurrent'] ?? '',
      thumbUrl:
          "https://img.ophim.live/uploads/movies/" + json['thumbUrl'] ?? '',
    );
  }
}
