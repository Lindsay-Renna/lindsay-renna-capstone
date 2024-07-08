import "./SliderComponent.scss";
import Slider from "@mui/material/Slider";

function SliderComponent({ data, handleSliderChange }) {
	const { minYear, maxYear, minLength, maxLength } = data;
	const marksDecade = [
		{ value: 1980, label: "1980's" },
		{ value: 1990, label: "1990's" },
		{ value: 2000, label: "2000's" },
		{ value: 2010, label: "2010's" },
		{ value: 2020, label: "2020's" },
	];

	const marksLength = [
		{ value: 30, label: "" },
		{ value: 60, label: "1 hr" },
		{ value: 90, label: "" },
		{ value: 120, label: "2 hrs" },
		{ value: 150, label: "" },
		{ value: 180, label: "3 hrs" },
		{ value: 210, label: "" },
		{ value: 250, label: "4 hrs" },
	];

	const handleDecadeChange = (event, newValue) => {
		handleSliderChange("minYear", newValue[0]);
		handleSliderChange("maxYear", newValue[1]);
	};

	const handleLengthChange = (event, newValue) => {
		handleSliderChange("minLength", newValue[0]);
		handleSliderChange("maxLength", newValue[1]);
	};

	return (
		<div className="sliders">
			<div className="decade-slider">
				<h2>Which decade(s) should we include?</h2>
				<div className="sliders__container">
					<h3>{`${minYear} to ${maxYear == 2020 ? "current" : maxYear}`}</h3>
					<Slider
						value={[minYear, maxYear]}
						step={10}
						shiftStep={10}
						marks={marksDecade}
						min={1980}
						max={2020}
						valueLabelDisplay="off"
						valueLabelFormat={(value) => `${value}`}
						onChange={handleDecadeChange}
					/>
				</div>
			</div>
			<div className="length-slider">
				<h2>How long should the movie be?</h2>
				<div className="sliders__container">
					<h3>{`${minLength == 30 ? "30 min" : minLength / 60}hrs to ${
						maxLength / 60
					}hrs`}</h3>
					<Slider
						value={[minLength, maxLength]}
						marks={marksLength}
						step={30}
						shiftStep={10}
						min={0}
						max={240}
						valueLabelDisplay="off"
						valueLabelFormat={(value) => `${value}`}
						onChange={handleLengthChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default SliderComponent;
