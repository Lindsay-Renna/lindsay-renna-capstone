// Login through Twitch to access API

// const CLIENT_ID = "zypnb88xmyalc9v2xy6xnfn9rzclq4";
// const VG_SECRET_KEY = "koeja0bad6m4sm5u4721pl1gxqmotb";
// const VG_API_KEY = "1qoe6k7cs0lskgbj9k8eiqw9tpxfl4";

// ("https://id.twitch.tv/oauth2/token?client_id=zypnb88xmyalc9v2xy6xnfn9rzclq4&client_secret=koeja0bad6m4sm5u4721pl1gxqmotb&grant_type=client_credentials");

// const twitch_response = {
// 	access_token: "1qoe6k7cs0lskgbj9k8eiqw9tpxfl4",
// 	expires_in: 4998964,
// 	token_type: "bearer",
// };

// const VG_HEADER = {
// 	headers: {
// 		"Client-ID": "zypnb88xmyalc9v2xy6xnfn9rzclq4",
// 		Authorization: "Bearer " + VG_API_KEY,
// 	},
// };

// fields
// age_ratings,
// aggregated_rating,
// aggregated_rating_count,
// alternative_names,
// artworks,
// category,
// cover,
// created_at
// first_release_date,
// game_engines,game_localizations,
// game_modes,
// genres,
// language_supports,
// multiplayer_modes,
// name,
// platforms,
// rating,
// status,

// RAWG API

const VG_API_KEY = "?key=bd130a5729bc4d9db52669b88f455221";

const vgGenres = [
	{ id: 4, name: "Action" },
	{ id: 51, name: "Indie" },
	{ id: 3, name: "Adventure" },
	{ id: 5, name: "RPG" },
	{ id: 10, name: "Strategy" },
	{ id: 2, name: "Shooter" },
	{ id: 14, name: "Simulation" },
	{ id: 11, name: "Arcade" },
	{ id: 83, name: "Platformer" },
	{ id: 1, name: "Racing" },
	{ id: 15, name: "Sports" },
	{ id: 19, name: "Family" },
	{ id: 6, name: "Fighting" },
	{ id: 28, name: "Board Games" },
	{ id: 34, name: "Educational" },
];

const vgPlatforms = [
	{ id: 4, name: "PC" },
	{ id: 187, name: "PlayStation 5" },
	{ id: 1, name: "Xbox One" },
	{ id: 18, name: "PlayStation 4" },
	{ id: 186, name: "Xbox Series S/X" },
	{ id: 7, name: "Nintendo Switch" },
	{ id: 3, name: "iOS" },
	{ id: 21, name: "Android" },
	{ id: 14, name: "Xbox 360" },
];

const vgTags = [
	{ id: 31, name: "Singleplayer" },
	{ id: 187, name: "PlayStation 5" },
	{ id: 1, name: "Xbox One" },
	{ id: 18, name: "PlayStation 4" },
	{ id: 186, name: "Xbox Series S/X" },
	{ id: 7, name: "Nintendo Switch" },
	{ id: 3, name: "iOS" },
	{ id: 21, name: "Android" },
	{ id: 14, name: "Xbox 360" },
];
