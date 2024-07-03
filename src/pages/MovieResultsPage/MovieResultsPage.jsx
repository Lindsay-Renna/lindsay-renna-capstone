import "./MovieResultsPage.scss";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	MOVIE_QUERY_URL,
	API_KEY,
	MOVIE_BASE_IMAGE_URL,
} from "../../utilities/movie-api.js";
import Results from "../../components/Results/Results.jsx";

function MovieResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	const [movieResults, setMovieResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const prepareData = (results) => {
		return results.map((movie) => ({
			title: movie.original_title,
			image: MOVIE_BASE_IMAGE_URL + movie.backdrop_path,
			id: movie.id,
			release_date: movie.release_date,
		}));
	};

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
			with_genres: data?.genres?.join(","),
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
			setLoading(false);
		} catch (error) {
			console.error(error);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (data) {
			getMovieResults();
		}
	}, [data]);

	return (
		<div className="results">
			{loading ? (
				<p>loading ... </p>
			) : error ? (
				<div className="results__error">
					<p className="results__error__text">
						Oh no! Something went wrong with your results.
					</p>
					<Link to="/movies" className="results__error__link">
						Want to try again?
					</Link>
				</div>
			) : movieResults.length ? (
				<>
					<h2>Here are some movies picked just for your family</h2>
					<Results preparedData={prepareData(movieResults)} />

					<Link to="/movies" className="restart-button">
						Start over?
					</Link>
				</>
			) : (
				<div className="results__error">
					<p className="results__error__text">
						No results found. Please try different criteria.
					</p>
					<Link to="/movies" className="results__error__link">
						Want to try again?
					</Link>
				</div>
			)}
		</div>
	);
}

export default MovieResultsPage;
