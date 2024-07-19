export const MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/";
export const MOVIE_QUERY_URL = "https://api.themoviedb.org/3/discover/movie?";
export const MOVIE_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export function getPopularMovieEndpoint() {
	return TMDB_URL + "popular" + API_KEY;
}

export const genreNames = [
	{ id: 28, name: "Action" },

	{ id: 12, name: "Adventure" },

	{ id: 16, name: "Animation" },

	{ id: 35, name: "Comedy" },

	{ id: 80, name: "Crime" },

	{ id: 18, name: "Drama" },

	{ id: 10751, name: "Family" },

	{ id: 14, name: "Fantasy" },

	{ id: 36, name: "History" },

	{ id: 27, name: "Horror" },

	{ id: 10402, name: "Music" },

	{ id: 9648, name: "Mystery" },

	{ id: 10749, name: "Romance" },

	{ id: 878, name: "Sci-Fi" },

	{ id: 53, name: "Thriller" },
];

export const providers = [
	{ provider_name: "Netflix", provider_id: 8 },
	{
		provider_name: "Disney Plus",
		provider_id: 337,
	},
	{
		provider_name: "Prime Video",
		provider_id: 119,
	},
	{
		provider_name: "Crave",
		provider_id: 230,
	},
	{
		provider_name: "Apple TV",
		provider_id: 2,
	},
	{
		provider_name: "Paramount Plus",
		provider_id: 531,
	},
];
