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
	const [loading, setLoading] = useState(true);
	const movieApiKey = import.meta.env.VITE_MOVIE_API_KEY;
	const movieApiToken = import.meta.env.VITE_MOVIE_API_TOKEN;

	function getFormattedDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const day = String(today.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	const currentDate = getFormattedDate();

	const options = {
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

	const getPopularMovies = async () => {
		try {
			console.log("Sending request with options:", options);
			const response = await axios.get(MOVIE_QUERY_URL, options);
			const movies = response.data.results.splice(0, 10);

			setMovieResults(movies);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getPopularMovies();
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
					<div className="movie-swiper">
						<Swiper
							effect={"coverflow"}
							grabCursor={true}
							centeredSlides={true}
							slidesPerView={"auto"}
							breakpoints={{
								300: { slidesPerView: 1 },

								400: {
									slidesPerView: 2,
								},
								// when window width is >= 1024px
								1024: {
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
			<div className="pop-videogames">
				<h2>Top 10 videogames for families</h2>
			</div>
			<div className="pop-boardgames">
				<h2>Top 10 boardgames for families</h2>
			</div>
		</div>
	);
}

export default PopularPage;
