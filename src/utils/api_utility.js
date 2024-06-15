// TMDB
const API_KEY = "?api_key=df096200a439b9bad070f4dce8f30a6b";
const TMDB_URL = "https://api.themoviedb.org/3/movie/";

export function getPopularMovieEndpoint() {
	return TMDB_URL + "popular" + API_KEY;
}
