import "./BoardgamePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import PersonSelection from "../../components/PersonSelection/PersonSelection";
import ChildAgeSelector from "../../components/ChildAgeSelector/ChildAgeSelector";

import BoardgameSlider from "../../components/BoardgameSlider/BoardgameSlider";
import GameCategories from "../../components/GameCategories/GameCategories";

function BoardgamePage() {
	const [data, setData] = useState({
		numKids: 0,
		numAdults: 0,
		childAges: [],
		categories: [],
		cooperative: true,
		minLength: 0,
		maxLength: 60,
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

	const handleCategorySelect = (event) => {
		const categoryId = parseInt(event.currentTarget.id);
		setData((prevData) => {
			const isSelected = prevData.categories.includes(categoryId);
			const newCategories = isSelected
				? prevData.genres.filter((id) => id !== categoryId)
				: [...prevData.categories, categoryId];
			return { ...prevData, categories: newCategories };
		});
	};

	const handleSliderChange = (field, value) => {
		setData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleToggle = (value) => {
		setData((prevData) => ({
			...prevData,
			cooperative: value,
		}));
	};

	const handleSubmit = () => {
		navigate("/boardgames/results", { state: { data } });
	};

	console.log(data);

	return (
		<div id="boardgame-selection">
			<main className="boardgame-main">
				<Carousel
					data={data}
					addKid={addKid}
					removeKid={removeKid}
					addAdult={addAdult}
					removeAdult={removeAdult}
					handleAgeSelect={handleAgeSelect}
					handleCategorySelect={handleCategorySelect}
					handleSliderChange={handleSliderChange}
					handleSubmit={handleSubmit}
					handleToggle={handleToggle}
				>
					<PersonSelection />
					<ChildAgeSelector />
					<BoardgameSlider />
					<GameCategories />
				</Carousel>
			</main>
		</div>
	);
}

export default BoardgamePage;
