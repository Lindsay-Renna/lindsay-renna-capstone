import "./MoviesPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import PersonSelection from "../../components/PersonSelection/PersonSelection";
import ChildAgeSelector from "../../components/ChildAgeSelector/ChildAgeSelector";
import MovieGenres from "../../components/MovieGenres/MovieGenres";
import MoviesSlider from "../../components/MoviesSlider/MoviesSlider";
import ProviderSelection from "../../components/ProviderSelection/ProviderSelection";
import { providers } from "../../utilities/movie-api.js";

function MoviesPage() {
	const [data, setData] = useState({
		numKids: 0,
		numAdults: 0,
		childAges: [],
		genres: [],
		minYear: 1980,
		maxYear: 2024,
		minLength: 60,
		maxLength: 210,
		watchProviders: [],
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

	const handleSliderChange = (field, value) => {
		setData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleProviderSelect = (event) => {
		const providerId = parseInt(event.currentTarget.id);
		setData((prevData) => {
			const isSelected = prevData.watchProviders.includes(providerId);
			const newProviders = isSelected
				? prevData.watchProviders.filter((id) => id !== providerId)
				: [...prevData.watchProviders, providerId];
			return { ...prevData, watchProviders: newProviders };
		});
	};

	const providerSelectAll = () => {
		const providerIds = providers.map((item) => item.provider_id);
		setData((prevData) => ({ ...prevData, watchProviders: providerIds }));
	};

	const providerSelectNone = () => {
		setData((prevData) => ({ ...prevData, watchProviders: [] }));
	};

	const handleSubmit = () => {
		navigate("/movies/results", { state: { data } });
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
					handleSliderChange={handleSliderChange}
					handleProviderSelect={handleProviderSelect}
					handleSubmit={handleSubmit}
					providerSelectAll={providerSelectAll}
					providerSelectNone={providerSelectNone}
				>
					<PersonSelection />
					<ChildAgeSelector />
					<MovieGenres />
					<MoviesSlider />
					<ProviderSelection />
				</Carousel>
			</main>
		</div>
	);
}

export default MoviesPage;
