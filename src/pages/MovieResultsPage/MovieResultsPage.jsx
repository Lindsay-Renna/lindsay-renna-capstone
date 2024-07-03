import "./MovieResultsPage.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MOVIE_QUERY_URL, API_KEY } from "../../utilities/movie-api.js";

function MovieResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	const [movieResults, setMovieResults] = useState([]);
	console.log(data);

	const options = {
		params: {
			"certification.lte": "3",
			certification_country: "CA",
			include_adult: "false",
			include_video: "false",
			language: "en-US",
			page: "1",
			"primary_release_date.gte": `${data?.minYear}-01-01`,
			"primary_release_date.lte": `${data?.maxYear}-12-31`,
			sort_by: "popularity.desc",
			watch_region: "CA",
			"with_runtime.gte": `${data?.minLength}`,
			"with_runtime.lte": `${data?.maxLength}`,
			with_genres: data?.genres?.join("|"),
			with_watch_providers: data?.watchProviders?.join("|"),
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
	};

	const getMovieResults = async () => {
		try {
			const response = await axios.get(MOVIE_QUERY_URL, options);
			console.log(response.data);
			setMovieResults(response.data.results);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (data) {
			getMovieResults();
		}
	}, [data]);

	return <div>MovieResultsPage</div>;
}

export default MovieResultsPage;
