API_KEY = "?api_key=215ab6e6c7575bb8e742c0f6632ec8fb";
MOVIE_BASE_URL = "http://api.themoviedb.org/3/";
MOVIE_BASE_IMAGE = "https://image.tmdb.org/t/p/w500/";

// primary_release_date.gte date(date yyyy-mm-dd)
// Filter by all available release dates and only include those which are greater or equal to the specified value.

// primary_release_date.lte date(date yyyy-mm-dd)
// Filter by all available release dates and only include those which are less or equal to the specified value. Expected format is YYYY-MM-DD.

// with_genres (string) Only include movies with the specified genres. Expected value is an integer (the id of a genre). Multiple values can be specified. Comma separated indicates an 'AND' query, while a pipe (|) separated value indicates an 'OR'.

// with_runtime.gte (int32)

// watch_region (CA)

// with_watch_providers (string) use in conjunction with watch_region, can be a comma (AND) or pipe (OR) separated query

const genres = [
	{
		id: 28,
		name: "Action",
	},
	{
		id: 12,
		name: "Adventure",
	},
	{
		id: 16,
		name: "Animation",
	},
	{
		id: 35,
		name: "Comedy",
	},
	{
		id: 80,
		name: "Crime",
	},
	{
		id: 99,
		name: "Documentary",
	},
	{
		id: 18,
		name: "Drama",
	},
	{
		id: 10751,
		name: "Family",
	},
	{
		id: 14,
		name: "Fantasy",
	},
	{
		id: 36,
		name: "History",
	},
	{
		id: 27,
		name: "Horror",
	},
	{
		id: 10402,
		name: "Music",
	},
	{
		id: 9648,
		name: "Mystery",
	},
	{
		id: 10749,
		name: "Romance",
	},
	{
		id: 878,
		name: "Science Fiction",
	},
	{
		id: 10770,
		name: "TV Movie",
	},
	{
		id: 53,
		name: "Thriller",
	},
	{
		id: 10752,
		name: "War",
	},
	{
		id: 37,
		name: "Western",
	},
];

const watchRegion = {
	iso_3166_1: "CA",
	english_name: "Canada",
	native_name: "Canada",
};

const providers = [
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
		provider_name: "Crave Starz",
		provider_id: 305,
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