import "./BoardgameResultsPage.scss";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Results from "../../components/Results/Results.jsx";
import Modal from "../../components/Modal/Modal.jsx";

function BoardgameResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	const [boardgameResults, setboardgameResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [boardgameDetails, setboardgameDetails] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const prepareData = (results) => {
		return results.map((game) => ({
			title: game.name,
			image: game.image_urls[0],
			id: game.bgg_id,
			release_date: game.year,
		}));
	};

	const options = {
		min_age: Math.min(...data.childAges),
		num_players: parseInt(data.numKids + data.numAdults),
		min_time: data.minLength,
		max_time: data.maxLength,
	};

	const getBoardgameResults = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/boardgames/results",
				options
			);
			console.log(response.data);
			setboardgameResults(response.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (data) {
			getBoardgameResults();
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
						preparedData={prepareData(boardgameResults)}
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
				{boardgameDetails ? (
					<>
						<img
							className="movie-modal_poster"
							src={boardgameDetails.image_urls[0]}
							alt={boardgameDetails.title}
						/>
						<p>
							{boardgameDetails.title +
								"  " +
								"(" +
								boardgameDetails.year +
								")"}
						</p>
						<p>{boardgameDetails.min_age}</p>
						<p>{boardgameDetails.min_players}</p>
						<p>{boardgameDetails.min_time + " min"}</p>
					</>
				) : (
					<p>loading...</p>
				)}
			</Modal>
		</div>
	);
}

export default BoardgameResultsPage;
