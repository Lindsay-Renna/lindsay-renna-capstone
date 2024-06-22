import "./MoviesPage.scss";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";

function MoviesPage() {
	const [numKids, setNumKids] = useState(0);
	const [numAdults, setNumAdults] = useState(0);

	const addKid = () => {
		if (numKids < 8) {
			setNumKids(numKids + 1);
		}
	};

	const removeKid = () => setNumKids(Math.max(0, numKids - 1));

	const addAdult = () => {
		if (numAdults < 8) {
			setNumAdults(numAdults + 1);
		}
	};

	const removeAdult = () => setNumAdults(Math.max(0, numAdults - 1));

	const personSelectProps = {
		numKids,
		numAdults,
		addKid,
		removeKid,
		addAdult,
		removeAdult,
	};

	const age = 1;
	const childAgeSelectorProps = { age };

	const numberOfPlayers = numKids + numAdults;

	return (
		<div id="movie-selection">
			<NavBar />
			<main className="movie-main">
				<Carousel
					personSelectProps={personSelectProps}
					childAgeSelectorProps={childAgeSelectorProps}
				/>
			</main>
		</div>
	);
}

export default MoviesPage;
