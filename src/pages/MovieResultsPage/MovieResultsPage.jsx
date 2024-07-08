import "./MovieResultsPage.scss";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	MOVIE_QUERY_URL,
	MOVIE_BASE_IMAGE_URL,
	MOVIE_BASE_URL,
} from "../../utilities/movie-api.js";
import Results from "../../components/Results/Results.jsx";
import Modal from "../../components/Modal/Modal.jsx";

function MovieResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	const [movieResults, setMovieResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [movieDetails, setMovieDetails] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const movieApiKey = import.meta.env.VITE_MOVIE_API_KEY;
	const movieApiToken = import.meta.env.VITE_MOVIE_API_TOKEN;

	const prepareData = (results) => {
		return results.map((movie) => ({
			title: movie.original_title,
			image: MOVIE_BASE_IMAGE_URL + movie.backdrop_path,
			id: movie.id,
			release_date: movie.release_date,
		}));
	};

	const cert = Math.min(...data.childAges) > 8 ? "G|PG" : "G|PG|PG13";
	const currentDate = new Date();
	const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
	const currentYear = currentDate.getFullYear();
	const month =
		data.maxYear === currentYear
			? String(currentMonth - 3).padStart(2, "0")
			: "12";
	const getLastDayOfMonth = (year, month) => {
		return new Date(year, month, 0).getDate();
	};

	const lastDay = getLastDayOfMonth(data.maxYear, month);

	const options = {
		params: {
			certification: cert,
			certification_country: "CA",
			include_adult: "false",
			include_video: "false",
			language: "en-US",
			with_original_language: "en",
			page: "1",
			"primary_release_date.gte": `${data?.minYear}-01-01`,
			"primary_release_date.lte": `${data?.maxYear}-${month}-${lastDay}`,
			sort_by: "popularity.desc",
			watch_region: "CA",
			"with_runtime.gte": `${data?.minLength}`,
			"with_runtime.lte": `${data?.maxLength}`,
			with_genres: data?.genres?.join(","),
			with_watch_providers: data?.watchProviders?.join("|"),
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${movieApiToken}`,
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

	async function getMovieDetails(id) {
		try {
			const response = await axios.get(
				MOVIE_BASE_URL + `${id}?api_key=` + movieApiKey
			);
			const movie = response.data;

			setMovieDetails(movie);
			console.log(movie);
		} catch (error) {}
	}

	const handleClick = async (id) => {
		await getMovieDetails(id);
		setModalOpen(true);
	};

	return (
		<div className="results">
			{loading ? (
				<div className="loading">
					<img
						className="loading__image"
						src="/src/assets/loading.svg"
						alt="loading image"
					/>
				</div>
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
					<h2 className="results__header">
						Here are some movies picked just for your family
					</h2>
					<Results
						preparedData={prepareData(movieResults)}
						handleClick={handleClick}
					/>
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
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
				{movieDetails ? (
					<>
						<img
							className="movie-modal_poster"
							src={MOVIE_BASE_IMAGE_URL + movieDetails.poster_path}
							alt={movieDetails.original_title}
						/>
						<p>
							{movieDetails.original_title +
								"  " +
								"(" +
								movieDetails.release_date.slice(0, 4) +
								")"}
						</p>
						<p>{movieDetails.overview}</p>
						<div className="movie-modal_genres">
							{movieDetails.genres.map((genre) => {
								return <span key={genre.id}>{genre.name + ", "}</span>;
							})}
						</div>
						<p>{movieDetails.runtime + " min"}</p>
					</>
				) : (
					<p>loading...</p>
				)}
			</Modal>
		</div>
	);
}

export default MovieResultsPage;
