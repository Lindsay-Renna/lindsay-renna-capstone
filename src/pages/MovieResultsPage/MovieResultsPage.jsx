import "./MovieResultsPage.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function MovieResultsPage() {
	const location = useLocation();
	const { data } = location.state || {};
	console.log(data);

	const getMovieResults = async () => {
		try {
		} catch (error) {
			console.error(error);
		}
	};

	return <div>MovieResultsPage</div>;
}

export default MovieResultsPage;
