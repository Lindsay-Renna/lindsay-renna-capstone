import axios from "axios";
import "./BoardgamePage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import PersonSelection from "../../components/PersonSelection/PersonSelection";
import ChildAgeSelector from "../../components/ChildAgeSelector/ChildAgeSelector";

import BoardgameSlider from "../../components/BoardgameSlider/BoardgameSlider";
import GameCategories from "../../components/GameCategories/GameCategories";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

function BoardgamePage({ isLoggedIn }) {
	const [familyProfiles, setFamilyProfiles] = useState([]);

	const [data, setData] = useState({
		numKids: 0,
		numAdults: 0,
		childAges: [],
		category: null,
		cooperative: true,
		minLength: 0,
		maxLength: 60,
	});

	useEffect(() => {
		if (isLoggedIn) {
			const user_id = localStorage.getItem("user_id");

			const getFamilyProfiles = async (id) => {
				try {
					const { data } = await axios.get(`${SERVER_URL}/user/${id}/family`);
					const profiles = data.sort((a, b) => {
						if (a.age >= 1 && a.age <= 13 && b.age === 0) {
							return -1;
						} else if (a.age === 0 && b.age >= 1 && b.age <= 13) {
							return 1;
						} else {
							return a.age - b.age;
						}
					});
					setFamilyProfiles(profiles);

					let numAdults = 0;
					let numKids = 0;
					let childAges = [];

					data.forEach((profile) => {
						if (profile.age === 0) {
							numAdults += 1;
						} else if (profile.age > 0) {
							numKids += 1;
							childAges.push(profile.age);
						}
					});

					setData((prevData) => ({
						...prevData,
						numKids,
						numAdults,
						childAges,
					}));
				} catch (error) {
					console.log("Error fetching family profiles:", error);
				}
			};

			if (user_id) {
				getFamilyProfiles(user_id);
			}
		}
	}, [isLoggedIn]);

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
		setData((prevData) => {
			const newChildAges = [...prevData.childAges];
			newChildAges.pop();

			return {
				...prevData,
				numKids: Math.max(0, prevData.numKids - 1),
				childAges: newChildAges,
			};
		});
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
			newChildAges[index] = parseInt(value);
			return { ...prevData, childAges: newChildAges };
		});
	};

	const handleCategorySelect = (event) => {
		const categoryId = parseInt(event.currentTarget.id);
		setData((prevData) => {
			const newCategory = prevData.category === categoryId ? null : categoryId;
			return { ...prevData, category: newCategory };
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
					<PersonSelection
						isLoggedIn={isLoggedIn}
						familyProfiles={familyProfiles}
					/>
					<ChildAgeSelector
						isLoggedIn={isLoggedIn}
						familyProfiles={familyProfiles}
					/>
					<BoardgameSlider />
					<GameCategories />
				</Carousel>
			</main>
		</div>
	);
}

export default BoardgamePage;
