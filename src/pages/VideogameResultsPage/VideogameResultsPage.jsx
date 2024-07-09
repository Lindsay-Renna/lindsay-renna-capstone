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

	const vgAPI = `?key=${import.meta.env.VITE_RAWG_API_KEY}`;
	const { childAges, systems, genres, cooperative } = data;

	const prepareData = (results) => {
		return results.map((game) => ({
			title: game.name,
			image: game.background_image,
			id: game.id,
			release_date: game.released,
		}));
	};

	const platforms = systems.join(",");
	const genresList = genres.join(",");
	const esrb = Math.min(...childAges) > 9 ? "everyone,everyon10" : "everyone";
	const tags = cooperative ? "co-op,multiplayer" : "multiplayer";

	const getVideogameResults = async () => {
		try {
			const response = await axios.get(VG_BASE_URL + vgAPI, {
				params: {
					platforms: platforms,
					genres: genresList,
					tags: tags,
					page_size: 40,
				},
			});
			const games = response.data.results;
			console.log(games);
			const filteredGames = games.filter((game) => {
				const esrbRating = game.esrb_rating
					? game.esrb_rating.name.toLowerCase()
					: "";
				if (Math.min(...childAges) > 9) {
					return esrbRating === "everyone" || esrbRating === "everyone 10+";
				}
				return esrbRating === "everyone";
			});
			setVideogameResults(filteredGames);
		} catch (error) {
			console.error("Error fetching games:", error);
			setError("An error occurred while fetching games.");
		} finally {
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
			const response = await axios.get(VG_BASE_URL + `/${id}` + vgAPI);
			const game = response.data;
			console.log(game);
			setVideogameDetails(game);
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
					<Link to="/videogames" className="results__error__link">
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
							className="videogame-modal_poster"
							src={videogameDetails.background_image}
							alt={videogameDetails.name}
						/>
						<p>
							<strong>{videogameDetails.name}</strong>
						</p>
						<p>{videogameDetails.description_raw}</p>
						<div className="videogame-modal_genres">
							<strong>Platforms: </strong>
							{videogameDetails.platforms.map((platform, index) => {
								const isLastItem =
									index === videogameDetails.platforms.length - 1;
								return (
									<span key={platform.platform.id}>
										{platform.platform.name}
										{isLastItem ? "" : ", "}
									</span>
								);
							})}
						</div>
						{videogameDetails.metacritic ? (
							<p>Metacritic score: {videogameDetails.metacritic}</p>
						) : (
							<p></p>
						)}
					</>
				) : (
					<p>loading...</p>
				)}
			</Modal>
		</div>
	);
}

export default VideogameResultsPage;
