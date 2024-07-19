import "./PopularPage.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import {
	MOVIE_QUERY_URL,
	MOVIE_BASE_IMAGE_URL,
	MOVIE_BASE_URL,
} from "../../utilities/movie-api.js";
import { VG_BASE_URL } from "../../utilities/videogame-api.js";
import { BG_API_BASE_URL } from "../../utilities/boardgame-api.js";
import Footer from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal.jsx";
import {
	EmailShareButton,
	FacebookMessengerShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookMessengerIcon,
	WhatsappIcon,
} from "react-share";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

function PopularPage({ isLoggedIn }) {
	const [movieResults, setMovieResults] = useState([]);
	const [videogameResults, setVideogameResults] = useState([]);
	const [boardgameResults, setBoardgameResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [movieModalOpen, setMovieModalOpen] = useState(false);
	const [videogameModalOpen, setVideogameModalOpen] = useState(false);
	const [boardgameModalOpen, setBoardgameModalOpen] = useState(false);
	const [movieDetails, setMovieDetails] = useState(null);
	const [videogameDetails, setVideogameDetails] = useState(null);
	const [boardgameDetails, setboardgameDetails] = useState(null);
	const movieApiKey = import.meta.env.VITE_MOVIE_API_KEY;
	const movieApiToken = import.meta.env.VITE_MOVIE_API_TOKEN;
	const vgAPI = `?key=${import.meta.env.VITE_RAWG_API_KEY}`;

	const shareMovieUrl = movieDetails
		? `https://www.imdb.com/title/${movieDetails.imdb_id}`
		: "";

	const shareVideogameUrl = videogameDetails
		? `https://rawg.io/games/${videogameDetails.id}`
		: "";

	const shareBoardgameUrl = boardgameDetails
		? `https://boardgamegeek.com/boardgame/${boardgameDetails.bgg_id}`
		: "";

	function getFormattedDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const day = String(today.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	const currentDate = getFormattedDate();

	const movieOptions = {
		params: {
			certification: "G|PG|PG13",
			certification_country: "CA",
			include_adult: "false",
			include_video: "false",
			language: "en-US",
			with_original_language: "en",
			page: "1",
			"primary_release_date.gte": `2014-01-01`,
			"primary_release_date.lte": currentDate,
			sort_by: "popularity.desc",
			watch_region: "CA",
			with_genres: 10751,
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${movieApiToken}`,
		},
	};

	const params = {
		tags: "family-friendly",
		page_size: 50,
		ordering: "-metacritic",
	};

	const getPopularMovies = async () => {
		try {
			const response = await axios.get(MOVIE_QUERY_URL, movieOptions);
			const movies = response.data.results.splice(0, 10);
			setMovieResults(movies);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const getPopularVideogames = async () => {
		try {
			const response = await axios.get(VG_BASE_URL + vgAPI, { params });
			const games = response.data.results.splice(0, 10);
			setVideogameResults(games);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching games:", error);
			setLoading(false);
		}
	};

	const getPopularBoardgames = async () => {
		try {
			const response = await axios.get(`${BG_API_BASE_URL}/boardgames/popular`);
			const sortedBoardgames = response.data
				.sort((a, b) => b.rank - a.rank)
				.splice(0, 10);
			setBoardgameResults(sortedBoardgames);
			setLoading(false);
		} catch (error) {
			console.error(error);

			setLoading(false);
		}
	};

	async function getMovieDetails(id) {
		try {
			const response = await axios.get(
				MOVIE_BASE_URL + `${id}?api_key=` + movieApiKey
			);
			const movie = response.data;

			setMovieDetails(movie);
		} catch (error) {}
	}

	const handleMovieClick = async (id) => {
		await getMovieDetails(id);
		setMovieModalOpen(true);
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
				setMovieModalOpen(false);
			} catch (error) {
				console.error("Error adding movie to watched list", error);
			}
		} else {
			console.log("User is not authenticated");
		}
	};

	async function getVideogameDetail(id) {
		try {
			const response = await axios.get(VG_BASE_URL + `/${id}` + vgAPI);
			const game = response.data;
			setVideogameDetails(game);
		} catch (error) {}
	}

	const handleVideogameClick = async (id) => {
		await getVideogameDetail(id);
		setVideogameModalOpen(true);
	};

	const handleBoardgameClick = (id) => {
		const selectedBoardgame = boardgameResults.find(
			(game) => game.bgg_id === id
		);
		setboardgameDetails(selectedBoardgame);
		setBoardgameModalOpen(true);
	};

	useEffect(() => {
		getPopularMovies();
		getPopularVideogames();
		getPopularBoardgames();
	}, []);

	return (
		<div className="popular">
			<h2 className="popular__header popular__header--blue">
				TOP 10 MOVIES FOR FAMILIES
			</h2>
			<div className="popular__movies">
				{loading ? (
					<div className="popular__loading">
						<p>loading...</p>
					</div>
				) : movieResults.length ? (
					<div className="popular__swiper">
						<Swiper
							effect={"coverflow"}
							grabCursor={true}
							centeredSlides={true}
							slidesPerView={"auto"}
							loop={true}
							breakpoints={{
								300: { slidesPerView: 1 },

								500: {
									slidesPerView: 2,
								},
								1000: { slidesPerView: 4 },
							}}
							coverflowEffect={{
								rotate: 40,
								stretch: 0,
								depth: 100,
								modifier: 1,
								slideShadows: false,
							}}
							pagination={{ clickable: true }}
							modules={[EffectCoverflow, Pagination]}
							className="mySwiper"
						>
							{movieResults.map((movie) => (
								<SwiperSlide key={movie.id}>
									<img
										id={movie.id}
										src={`${MOVIE_BASE_IMAGE_URL}${movie.poster_path}`}
										alt={movie.title}
										onClick={() => handleMovieClick(movie.id)}
									/>

									<p>{movie.title}</p>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<div className="results__error">
						<p className="results__error__text">
							Oh no! Something went wrong getting results.
						</p>
					</div>
				)}
				<Modal modalOpen={movieModalOpen} setModalOpen={setMovieModalOpen}>
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
								<EmailShareButton
									url={shareMovieUrl}
									style={{ paddingRight: 5 }}
								>
									<EmailIcon size={24} round />
								</EmailShareButton>
								<FacebookMessengerShareButton
									url={shareMovieUrl}
									appId="512749567856290"
									style={{ paddingRight: 5 }}
								>
									<FacebookMessengerIcon size={24} round />
								</FacebookMessengerShareButton>
								<WhatsappShareButton url={shareMovieUrl}>
									<WhatsappIcon size={24} round />
								</WhatsappShareButton>
							</div>
						</>
					) : (
						<p>loading...</p>
					)}
				</Modal>
			</div>
			<h2 className="popular__header popular__header--pink">
				TOP 10 VIDEOGAMES FOR FAMILIES
			</h2>
			<div className="popular__videogames">
				{loading ? (
					<div className="popular__loading">
						<p>loading...</p>
					</div>
				) : videogameResults.length ? (
					<div className="popular__swiper">
						<Swiper
							loop={true}
							effect={"coverflow"}
							grabCursor={true}
							centeredSlides={true}
							slidesPerView={"auto"}
							breakpoints={{
								300: { slidesPerView: 1 },

								500: {
									slidesPerView: 2,
								},
								1000: { slidesPerView: 4 },
							}}
							coverflowEffect={{
								rotate: 40,
								stretch: 0,
								depth: 100,
								modifier: 1,
								slideShadows: false,
							}}
							pagination={{ clickable: true }}
							modules={[EffectCoverflow, Pagination]}
							className="mySwiper"
						>
							{videogameResults.map((game) => (
								<SwiperSlide key={game.id}>
									<img
										src={game.background_image}
										alt={game.name}
										id={game.id}
										onClick={() => handleVideogameClick(game.id)}
									/>
									<p>{game.name}</p>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<div className="results__error">
						<p className="results__error__text">
							Oh no! Something went wrong getting results.
						</p>
					</div>
				)}
				<Modal
					modalOpen={videogameModalOpen}
					setModalOpen={setVideogameModalOpen}
				>
					{videogameDetails ? (
						<>
							<div className="videogame-modal__images">
								<Link
									to={`https://rawg.io/games/${videogameDetails.id}`}
									target="_blank"
								>
									<img
										className="videogame-modal__poster"
										src={videogameDetails.background_image}
										alt={videogameDetails.name}
									/>
								</Link>
								{videogameDetails.esrb_rating ? (
									<img
										className="videogame-modal__esrb"
										src={`/icons/esrb-${videogameDetails.esrb_rating.id}.png`}
										alt="ESRB rating"
									/>
								) : (
									<span className="videogame-modal__esrb-warning">
										* this game is not yet rated and may not be appropriate for
										all ages
									</span>
								)}
							</div>
							<p>
								<strong>{videogameDetails.name}</strong>
							</p>
							<p>{videogameDetails.description_raw}</p>
							<div className="videogame-modal_platforms">
								<ul>
									<strong>Platforms: </strong>
									{videogameDetails.platforms.map((platform, index) => {
										const isLastItem =
											index === videogameDetails.platforms.length - 1;
										return (
											<li key={platform.platform.id}>
												{platform.platform.name}
												{isLastItem ? "" : ", "}
											</li>
										);
									})}
								</ul>
							</div>
							<div className="videogame-modal_genres">
								<ul>
									<strong>Genres: </strong>
									{videogameDetails.genres.map((genre, index) => {
										const isLastItem =
											index === videogameDetails.genres.length - 1;
										return (
											<li key={genre.id}>
												{genre.name}
												{isLastItem ? "" : ", "}
											</li>
										);
									})}
								</ul>
							</div>
							{videogameDetails.metacritic ? (
								<p>
									<strong>Metacritic score: </strong>
									{videogameDetails.metacritic}
								</p>
							) : (
								<p></p>
							)}
							<div className="videogame-modal__share-buttons">
								<p>Share this videogame:</p>
								<EmailShareButton
									url={shareVideogameUrl}
									style={{ paddingRight: 5 }}
								>
									<EmailIcon size={24} round />
								</EmailShareButton>
								<FacebookMessengerShareButton
									url={shareVideogameUrl}
									style={{ paddingRight: 5 }}
								>
									<FacebookMessengerIcon size={24} round />
								</FacebookMessengerShareButton>
								<WhatsappShareButton url={shareVideogameUrl}>
									<WhatsappIcon size={24} round />
								</WhatsappShareButton>
							</div>
						</>
					) : (
						<p>loading...</p>
					)}
				</Modal>
			</div>
			<h2 className="popular__header popular__header--purple">
				TOP 10 BOARDGAMES FOR FAMILIES
			</h2>
			<div className="popular__boardgames">
				{loading ? (
					<div className="popular__loading">
						<p>loading...</p>
					</div>
				) : boardgameResults.length ? (
					<div className="popular__swiper">
						<Swiper
							effect={"coverflow"}
							loop={true}
							grabCursor={true}
							centeredSlides={true}
							slidesPerView={"auto"}
							breakpoints={{
								300: { slidesPerView: 1 },

								500: {
									slidesPerView: 2,
								},
								1000: { slidesPerView: 4 },
							}}
							coverflowEffect={{
								rotate: 40,
								stretch: 0,
								depth: 100,
								modifier: 1,
								slideShadows: false,
							}}
							pagination={{ clickable: true }}
							modules={[EffectCoverflow, Pagination]}
							className="mySwiper"
						>
							{boardgameResults.map((game) => (
								<SwiperSlide key={game.bgg_id}>
									<img
										src={game.image_urls[0]}
										alt={game.name}
										id={game.bgg_id}
										onClick={() => handleBoardgameClick(game.bgg_id)}
									/>
									<p>{game.name}</p>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<div className="results__error">
						<p className="results__error__text">
							Oh no! Something went wrong getting results.
						</p>
					</div>
				)}
				<Modal
					modalOpen={boardgameModalOpen}
					setModalOpen={setBoardgameModalOpen}
				>
					{boardgameDetails ? (
						<>
							<Link
								to={`https://boardgamegeek.com/boardgame/${boardgameDetails.bgg_id}`}
								target="_blank"
							>
								<img
									className="bg-modal__poster"
									src={boardgameDetails.image_urls[0]}
									alt={boardgameDetails.name}
								/>
							</Link>
							<p>
								<strong>{boardgameDetails.name}</strong>
								{"  " + "(" + boardgameDetails.year + ")"}
							</p>
							<p>{boardgameDetails.description}</p>
							<p>
								<strong>Minimum Age: </strong>
								{boardgameDetails.min_age}
							</p>
							<p>
								<strong>Players: </strong>
								{boardgameDetails.min_players} - {boardgameDetails.max_players}
							</p>
							<p>
								<strong>Recommended Time: </strong>
								{boardgameDetails.min_time + " min"}
							</p>
							<div className="bg-modal__share-buttons">
								<p>Share this boardgame:</p>
								<EmailShareButton
									url={shareBoardgameUrl}
									style={{ paddingRight: 5 }}
								>
									<EmailIcon size={24} round />
								</EmailShareButton>
								<FacebookMessengerShareButton
									url={shareBoardgameUrl}
									style={{ paddingRight: 5 }}
								>
									<FacebookMessengerIcon size={24} round />
								</FacebookMessengerShareButton>
								<WhatsappShareButton url={shareBoardgameUrl}>
									<WhatsappIcon size={24} round />
								</WhatsappShareButton>
							</div>
						</>
					) : (
						<p>loading...</p>
					)}
				</Modal>
			</div>
			<Footer />
		</div>
	);
}

export default PopularPage;
