import "./BoardgameResultsPage.scss";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Results from "../../components/Results/Results.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { BG_API_BASE_URL } from "../../utilities/boardgame-api.js";

function BoardgameResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	const [boardgameResults, setBoardgameResults] = useState([]);
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
		max_time: data.maxLength,
		category: data.category,
		mechanics: data.cooperative === true ? "Cooperative" : "",
	};

	const getBoardgameResults = async () => {
		try {
			const response = await axios.post(
				`${BG_API_BASE_URL}/boardgames/results`,
				options
			);
			const sortedBoardgames = response.data.sort((a, b) => b.rank - a.rank);
			console.log(response.data);
			setBoardgameResults(sortedBoardgames);
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

	const handleClick = (id) => {
		const selectedBoardgame = boardgameResults.find(
			(game) => game.bgg_id === id
		);
		setboardgameDetails(selectedBoardgame);
		setModalOpen(true);
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
					<Link to="/boardgames" className="results__error__link">
						Want to try again?
					</Link>
				</div>
			) : boardgameResults.length ? (
				<>
					<h2 className="results__header">
						Here are some games picked just for your family
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
					<Link to="/boardgames" className="results__error__link">
						Want to try again?
					</Link>
				</div>
			)}
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
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
					</>
				) : (
					<p>loading...</p>
				)}
			</Modal>
		</div>
	);
}

export default BoardgameResultsPage;
