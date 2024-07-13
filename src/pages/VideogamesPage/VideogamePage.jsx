import "./VideogamePage.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import PersonSelection from "../../components/PersonSelection/PersonSelection";
import ChildAgeSelector from "../../components/ChildAgeSelector/ChildAgeSelector";
import GamingSystems from "../../components/GamingSystems/GamingSystems";
import VideogameGenre from "../../components/VideogameGenre/VideogameGenre";
import VideogameTagSelection from "../../components/VideogameTagSelection/VideogameTagSelection";

function VideogamePage() {
	const [data, setData] = useState({
		numKids: 0,
		numAdults: 0,
		childAges: [],
		systems: [],
		genres: [],
		cooperative: true,
		splitScreen: true,
	});

	const navigate = useNavigate();

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

	const handleSystemSelect = (event) => {
		const systemId = parseInt(event.currentTarget.id);
		setData((prevData) => {
			const isSelected = prevData.systems.includes(systemId);
			const newSystems = isSelected
				? prevData.systems.filter((id) => id !== systemId)
				: [...prevData.systems, systemId];
			return { ...prevData, systems: newSystems };
		});
	};

	const handleGenreSelect = (event) => {
		const genreId = parseInt(event.currentTarget.id);
		setData((prevData) => {
			const isSelected = prevData.genres.includes(genreId);
			const newGenres = isSelected
				? prevData.genres.filter((id) => id !== genreId)
				: [...prevData.genres, genreId];
			return { ...prevData, genres: newGenres };
		});
	};

	const handleToggle = (value) => {
		setData((prevData) => ({
			...prevData,
			cooperative: value,
		}));
	};

	const handleSubmit = () => {
		navigate("/videogames/results", { state: { data } });
	};

	return (
		<div id="videogame-selection">
			<main className="videogame-main">
				<Carousel
					data={data}
					addKid={addKid}
					removeKid={removeKid}
					addAdult={addAdult}
					removeAdult={removeAdult}
					handleAgeSelect={handleAgeSelect}
					handleSystemSelect={handleSystemSelect}
					handleGenreSelect={handleGenreSelect}
					handleToggle={handleToggle}
					handleSubmit={handleSubmit}
				>
					<PersonSelection />
					<ChildAgeSelector />
					<GamingSystems />
					<VideogameGenre />
					<VideogameTagSelection />
				</Carousel>
			</main>
		</div>
	);
}

export default VideogamePage;
