// TMDB
// export const API_KEY = "df096200a439b9bad070f4dce8f30a6b";
export const API_KEY =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTVhYjZlNmM3NTc1YmI4ZTc0MmMwZjY2MzJlYzhmYiIsIm5iZiI6MTcyMDAyMDczNS41OTgxMzIsInN1YiI6IjY2Njg2MmE4ZjI2YjM1MjU3NGE2YmVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9z-oZZbzC_6pk8Sv1VWOGP63IN91RFGBOuTVM8uXGLs";
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

	{ id: 37, name: "Western" },
];

const watchRegion = {
	iso_3166_1: "CA",
	english_name: "Canada",
	native_name: "Canada",
};

export const providers = [
	{ provider_name: "Netflix", provider_id: 8 },
	{
		provider_name: "Disney Plus",
		provider_id: 337,
	},
	{
		provider_name: "Amazon Prime Video",
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

/** example result
{
"adult": false,
"backdrop_path": "/wXzdoMyLYvz7AoXPGx5STZ1XZDd.jpg",
"genre_ids": [
        14,
        35,
        12
        ],
"id": 1832,
"original_language": "en",
"original_title": "Dogma",
"overview": "An abortion clinic worker with a special heritage is called upon to save the existence of humanity from being negated by two renegade angels trying to exploit a loophole and reenter Heaven.",
"popularity": 25.494,
"poster_path": "/xI5beD8Td79E2uZNAxgd1gWWOEd.jpg",
"release_date": "1999-11-12",
"title": "Dogma",
"video": false,
"vote_average": 6.9,
"vote_count": 2423
},
 * 
 * */
