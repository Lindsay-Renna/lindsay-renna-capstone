import "./BoardgameSlider.scss";
import Slider from "@mui/material/Slider";
import SwitchSelector from "react-switch-selector";

function BoardgameSlider({ data, handleSliderChange, handleToggle }) {
	const { minLength, maxLength, cooperative } = data;

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

	const handleLengthChange = (event, newValue) => {
		handleSliderChange("minLength", newValue[0]);
		handleSliderChange("maxLength", newValue[1]);
	};

	return (
		<div className="bg-sliders">
			<div className="bg-length-slider">
				<h2 className="bg-sliders__header">How long should the game be?</h2>
				<div className="bg-sliders__container">
					<h3>{`${minLength == 30 ? "30 min" : minLength / 60 + "hrs"} to ${
						maxLength == 30 ? "30 min" : maxLength / 60 + "hrs"
					}`}</h3>
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
			<div className="competitive">
				<h2 className="competitive__header">How would you like to play?</h2>
				<div className="competitive__selections">
					<div className="switch__wrapper">
						<SwitchSelector
							id="compSelector"
							initial={cooperative ? 0 : 1}
							onChange={(value) => handleToggle(value)}
							selectedBackgroundColor={"#50c6e0"}
							hasPadding
							border={"2px solid black"}
							fontSize={"1.5rem"}
							options={[
								{ label: "Co-operative", value: "true" },
								{ label: "Competitive", value: false },
							]}
						/>
					</div>
					<div className="competitive__image__wrapper">
						<img
							src={
								cooperative
									? "/icons/boardgame-co-op-icon.png"
									: "/icons/boardgame-pvp-icon.png"
							}
							alt="PVP icon"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BoardgameSlider;
