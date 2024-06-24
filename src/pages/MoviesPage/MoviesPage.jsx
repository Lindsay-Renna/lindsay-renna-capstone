import "./MoviesPage.scss";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";

function MoviesPage() {
	const [data, setData] = useState({
		numKids: 0,
		numAdults: 0,
		childAges: [],
		genres: [],
		movieAge: [],
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

	return (
		<div id="movie-selection">
			<NavBar />
			<main className="movie-main">
				<Carousel
					data={data}
					addKid={addKid}
					removeKid={removeKid}
					addAdult={addAdult}
					removeAdult={removeAdult}
					handleAgeSelect={handleAgeSelect}
				/>
			</main>
		</div>
	);
}

export default MoviesPage;
