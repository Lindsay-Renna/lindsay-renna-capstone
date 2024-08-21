import "./VideogamePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import PersonSelection from "../../components/PersonSelection/PersonSelection";
import ChildAgeSelector from "../../components/ChildAgeSelector/ChildAgeSelector";
import GamingSystems from "../../components/GamingSystems/GamingSystems";
import VideogameGenre from "../../components/VideogameGenre/VideogameGenre";
import VideogameTagSelection from "../../components/VideogameTagSelection/VideogameTagSelection";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

function VideogamePage({ isLoggedIn }) {
	const [familyProfiles, setFamilyProfiles] = useState([]);
	const [data, setData] = useState({
		numKids: 0,
		numAdults: 0,
		childAges: [],
		systems: [],
		genres: [],
		cooperative: true,
		splitScreen: true,
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

	console.log(data);

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
					<PersonSelection
						isLoggedIn={isLoggedIn}
						familyProfiles={familyProfiles}
					/>
					<ChildAgeSelector
						isLoggedIn={isLoggedIn}
						familyProfiles={familyProfiles}
					/>
					<GamingSystems />
					<VideogameGenre />
					<VideogameTagSelection />
				</Carousel>
			</main>
		</div>
	);
}

export default VideogamePage;
