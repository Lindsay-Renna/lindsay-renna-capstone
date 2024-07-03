import "./MovieResultsPage.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MOVIE_QUERY_URL } from "../../utilities/movie-api.js";

function MovieResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	console.log(data);

	const options = {
		method: "GET",
		url: MOVIE_QUERY_URL,
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
			with_genres: data?.genres?.join("%7C"),
			with_watch_providers: data?.watchProviders?.join("%7C"),
		},
		headers: {
			accept: "application/json",
			Authorization: "Bearer 215ab6e6c7575bb8e742c0f6632ec8fb",
		},
	};

	const getMovieResults = async () => {
		await axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		if (data) {
			getMovieResults();
		}
	}, [data]);

	return <div>MovieResultsPage</div>;
}

export default MovieResultsPage;
