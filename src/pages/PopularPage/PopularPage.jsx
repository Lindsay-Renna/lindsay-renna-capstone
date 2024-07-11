import "./PopularPage.scss";
import React, { useRef, useState, useEffect } from "react";
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

function PopularPage() {
	const [movieResults, setMovieResults] = useState([]);
	const [videogameResults, setVideogameResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const movieApiKey = import.meta.env.VITE_MOVIE_API_KEY;
	const movieApiToken = import.meta.env.VITE_MOVIE_API_TOKEN;
	const vgAPI = `?key=${import.meta.env.VITE_RAWG_API_KEY}`;

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
			setError("An error occurred while fetching games.");
		}
	};

	useEffect(() => {
		getPopularMovies();
		getPopularVideogames();
	}, []);

	return (
		<div className="popular">
			<div className="popular__movies">
				<h2>Top 10 movies for families</h2>
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
							breakpoints={{
								300: { slidesPerView: 1 },

								500: {
									slidesPerView: 2,
								},
								1000: {
									slidesPerView: 3,
								},
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
										src={`${MOVIE_BASE_IMAGE_URL}${movie.poster_path}`}
										alt={movie.title}
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
			</div>
			<div className="popular__videogames">
				<h2>Top 10 videogames for families</h2>
				{loading ? (
					<div className="popular__loading">
						<p>loading...</p>
					</div>
				) : videogameResults.length ? (
					<div className="popular__swiper">
						<Swiper
							effect={"coverflow"}
							grabCursor={true}
							centeredSlides={true}
							slidesPerView={"auto"}
							breakpoints={{
								300: { slidesPerView: 1 },

								500: {
									slidesPerView: 2,
								},
								500: {
									slidesPerView: 3,
								},
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
									<img src={game.background_image} alt={game.name} />
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
			</div>
			<div className="pop-boardgames">
				<h2>Top 10 boardgames for families</h2>
			</div>
		</div>
	);
}

export default PopularPage;
