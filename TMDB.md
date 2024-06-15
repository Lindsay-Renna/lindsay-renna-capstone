## Using TMDB API

<code>append_to_response</code> is an easy and efficient way to append extra requests to any top level namespace. The movie, TV show, TV season, TV episode and person detail methods all support a query parameter called <code>append_to_response</code>. This makes it possible to make sub requests within the same namespace in a single HTTP request. Each request will get appended to the response as a new JSON object.

With <code>append_to_response</code> you can issue a single request:

Example
https://api.themoviedb.org/3/movie/157336?api_key=API_KEY&append_to_response=videos

Even more powerful, you can issue multiple requests, just comma separate the values:

Example
https://api.themoviedb.org/3/movie/157336?api_key=API_KEY&append_to_response=videos,images

#### Genres

"id": 28,
"name": "Action"

"id": 12,
"name": "Adventure"

"id": 16,
"name": "Animation"

"id": 35,
"name": "Comedy"

"id": 80,
"name": "Crime"

"id": 99,
"name": "Documentary"

"id": 18,
"name": "Drama"

"id": 10751,
"name": "Family"

"id": 14,
"name": "Fantasy"

"id": 36,
"name": "History"

"id": 27,
"name": "Horror"

"id": 10402,
"name": "Music"

"id": 9648,
"name": "Mystery"

"id": 10749,
"name": "Romance"

"id": 878,
"name": "Science Fiction"

"id": 10770,
"name": "TV Movie"

"id": 53,
"name": "Thriller"

"id": 10752,
"name": "War"

"id": 37,
"name": "Western"
