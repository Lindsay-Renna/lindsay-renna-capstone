import "./VideogameResultsPage.scss";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { VG_BASE_URL } from "../../utilities/videogame-api.js";
import Results from "../../components/Results/Results.jsx";
import Modal from "../../components/Modal/Modal.jsx";

function VideogameResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	const [videogameResults, setVideogameResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [videogameDetails, setVideogameDetails] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const vgAPI = import.meta.env.VITE_RAWG_API_KEY;
	const { childAges, systems, genres, cooperative } = data;

	const prepareData = (results) => {
		return results.map((game) => ({
			title: game.original_title,
			image: MOVIE_BASE_IMAGE_URL + movie.backdrop_path,
			id: game.id,
			release_date: game.release_date,
		}));
	};

	const platforms = systems.join(",");
	const genresList = genres.join(",");
	const esrb = Math.min(...childAges) > 9 ? "E,E10" : "E";
	const tags = cooperative ? "co-op,multiplayer" : "multiplayer";

	const params = {
		key: vgAPI,
		platforms,
		genresList,
		tags,
		esrb,
	};

	const getVideogameResults = async (params) => {
		try {
			const response = await axios.get(
				"https://cors-anywhere.herokuapp.com/" + VG_BASE_URL,
				{ params }
			);
			console.log(response.data);
			setVideogameResults(response.data.results);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (data) {
			getVideogameResults();
		}
	}, [data]);

	async function getVideogameDetail(id) {
		try {
			const response = await axios.get(
				"https://cors-anywhere.herokuapp.com/" + VG_BASE_URL + vgAPI + id
			);
			const game = response.data;

			setVideogameDetails(game);
			console.log(game);
		} catch (error) {}
	}

	const handleClick = async (id) => {
		await getVideogameDetail(id);
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
			) : videogameResults.length ? (
				<>
					<h2 className="results__header">
						Here are some games picked just for your family
					</h2>
					<Results
						preparedData={prepareData(videogameResults)}
						handleClick={handleClick}
					/>
				</>
			) : (
				<div className="results__error">
					<p className="results__error__text">
						No results found. Please try different criteria.
					</p>
					<Link to="/videogames" className="results__error__link">
						Want to try again?
					</Link>
				</div>
			)}
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
				{videogameDetails ? (
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

export default VideogameResultsPage;
