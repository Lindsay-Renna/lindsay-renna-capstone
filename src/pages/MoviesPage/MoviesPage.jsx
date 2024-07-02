import "./MoviesPage.scss";
import { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import PersonSelection from "../../components/PersonSelection/PersonSelection";
import ChildAgeSelector from "../../components/ChildAgeSelector/ChildAgeSelector";
import MovieGenres from "../../components/MovieGenres/MovieGenres";

function MoviesPage() {
	const [isActive, setIsActive] = useState(false);
	const [data, setData] = useState({
		numKids: 0,
		numAdults: 0,
		childAges: [],
		genres: [],
		movieAgeMin: 1990,
		movieAgeMax: 2024,
		watchProviders: [],
	});

	const addKid = () => {
		setData((prevData) => {
			if (prevData.numKids < 8) {
				return { ...prevData, numKids: prevData.numKids + 1 };
			}
			return prevData;
		});
	};

	const removeKid = () => {
		setData((prevData) => ({
			...prevData,
			numKids: Math.max(0, prevData.numKids - 1),
		}));
	};

	const addAdult = () => {
		setData((prevData) => {
			if (prevData.numAdults < 8) {
				return { ...prevData, numAdults: prevData.numAdults + 1 };
			}
			return prevData;
		});
	};

	const removeAdult = () => {
		setData((prevData) => ({
			...prevData,
			numAdults: Math.max(0, prevData.numAdults - 1),
		}));
	};

	const handleAgeSelect = (event, index) => {
		const value = event.target.value;
		setData((prevData) => {
			const newChildAges = [...prevData.childAges];
			newChildAges[index] = value;
			return { ...prevData, childAges: newChildAges };
		});
	};

	const handleGenreSelect = (event) => {
		const genreId = event.target.id;
		setData((prevData) => {
			const isSelected = prevData.genres.includes(genreId);
			const newGenres = isSelected
				? prevData.genres.filter((id) => id !== genreId)
				: [...prevData.genres, genreId];
			return { ...prevData, genres: newGenres };
		});
	};

	return (
		<div id="movie-selection">
			<main className="movie-main">
				<Carousel
					data={data}
					addKid={addKid}
					removeKid={removeKid}
					addAdult={addAdult}
					removeAdult={removeAdult}
					handleAgeSelect={handleAgeSelect}
					handleGenreSelect={handleGenreSelect}
					isActive={isActive}
				>
					<PersonSelection />
					<ChildAgeSelector />
					<MovieGenres />
				</Carousel>
			</main>
		</div>
	);
}

export default MoviesPage;
