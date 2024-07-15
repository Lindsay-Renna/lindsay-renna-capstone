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
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
import {
	EmailShareButton,
	FacebookMessengerShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookMessengerIcon,
	WhatsappIcon,
} from "react-share";

function MovieResultsPage({ isLoggedIn }) {
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
			release_date: movie.release_date.slice(0, 4),
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
			const movies = response.data.results;

			if (isLoggedIn) {
				const user_id = localStorage.getItem("user_id");
				const results = await axios.get(
					`${SERVER_URL}/user/${user_id}/watched-list`
				);

				const watchedList = results.data.map((item) => item.movie_id);
				const filteredMovies = movies.filter(
					(movie) => !watchedList.includes(movie.id)
				);
				setMovieResults(filteredMovies);
			} else {
				setMovieResults(movies);
			}
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
		} catch (error) {}
	}

	const handleClick = async (id) => {
		await getMovieDetails(id);
		setModalOpen(true);
	};

	const addMovie = async (movie) => {
		const user_id = localStorage.getItem("user_id");
		const year = movie.release_date.slice(0, 4);
		if (user_id) {
			const payload = {
				user_id: user_id,
				movie_id: movie.id,
				movie_name: movie.original_title,
				movie_year: year,
			};

			try {
				const res = await axios.post(
					`${SERVER_URL}/user/watched-list/add`,
					payload
				);
				const updatedMovies = movieResults.filter((mov) => mov.id !== movie.id);
				setMovieResults(updatedMovies);
				setModalOpen(false);
			} catch (error) {
				console.error("Error adding movie to watched list", error);
			}
		} else {
			console.log("User is not authenticated");
		}
	};

	const shareUrl = movieDetails
		? `https://www.imdb.com/title/${movieDetails.imdb_id}`
		: "";

	const handleShareClose = () => {
		console.log("Share window closed");
		// Optionally, you can add additional logic here to handle after the share is completed
	};

	return (
		<div className="results">
			{loading ? (
				<div className="loading">
					<img
						className="loading__image"
						src="/loading.svg"
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
						<div className="poster-tagline">
							<Link
								to={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
								target="_blank"
							>
								<img
									className="movie-modal__poster"
									src={MOVIE_BASE_IMAGE_URL + movieDetails.poster_path}
									alt={movieDetails.original_title}
								/>
							</Link>
							<span className="movie-modal__tagline">
								"{movieDetails.tagline}"
							</span>
						</div>
						<p>
							<strong>{movieDetails.original_title}</strong>
							{"  " + "(" + movieDetails.release_date.slice(0, 4) + ")"}
						</p>
						<p>{movieDetails.overview}</p>
						<div className="movie-modal__genres">
							<strong>Genres: </strong>
							{movieDetails.genres.map((genre) => {
								return <span key={genre.id}>{genre.name + ", "}</span>;
							})}
						</div>
						<p>
							<strong>Runtime: </strong>
							{movieDetails.runtime + " min"}
						</p>
						{isLoggedIn ? (
							<div className="movie-modal__watch-list">
								<p>Add to your Watched List</p>
								<img
									className="movie-modal__watch-icon"
									src="/icons/watched-icon.png"
									alt="add to watch list icon"
								/>
								<img
									onClick={() => {
										addMovie(movieDetails);
									}}
									className="movie-modal__watch-icon movie-modal__watch-icon--blue"
									src="/icons/watched-icon-blue.png"
									alt="add to watch list icon clicked"
								/>
							</div>
						) : (
							<></>
						)}
						<div className="movie-modal__share-buttons">
							<p>Share this movie:</p>
							<EmailShareButton url={shareUrl} style={{ paddingRight: 5 }}>
								<EmailIcon size={24} round />
							</EmailShareButton>
							<FacebookMessengerShareButton
								url={shareUrl}
								appId="512749567856290"
								style={{ paddingRight: 5 }}
							>
								<FacebookMessengerIcon size={24} round />
							</FacebookMessengerShareButton>
							<WhatsappShareButton url={shareUrl}>
								<WhatsappIcon size={24} round />
							</WhatsappShareButton>
						</div>
					</>
				) : (
					<p>loading...</p>
				)}
			</Modal>
		</div>
	);
}

export default MovieResultsPage;
