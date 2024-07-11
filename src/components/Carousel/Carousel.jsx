import React from "react";
import { useState } from "react";
import "./Carousel.scss";

const Carousel = ({
	handleQuerySubmit,
	data,
	handleSubmit,
	children,
	...props
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [transition, setTransition] = useState("");
	const components = children;

	const handleNext = () => {
		if (currentIndex < components.length - 1) {
			setTransition("next-exit");
			setTimeout(() => {
				setCurrentIndex((prevIndex) => prevIndex + 1);
				setTransition("next-enter");
				setTimeout(() => {
					setTransition("");
				}, 200);
			}, 200);
		}
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setTransition("prev-exit");
			setTimeout(() => {
				setCurrentIndex((prevIndex) => prevIndex - 1);
				setTransition("prev-enter");
				setTimeout(() => {
					setTransition("");
				}, 200);
			}, 200);
		}
	};

	const allAgesSelected =
		data.childAges.length === data.numKids &&
		data.childAges.every((age) => age !== undefined && age !== "");

	const peopleAdded = data.numKids !== 0 || data.numAdults !== 0;

	const isSystemSelectionStep =
		components[currentIndex]?.type.name === "GamingSystems";
	const isSystemSelected = data.systems ? data.systems.length > 0 : true;

	const CurrentComponent = components[currentIndex];

	return (
		<div className="carousel">
			<div className="button__wrapper">
				{currentIndex > 0 && (
					<button onClick={handlePrevious} disabled={currentIndex === 0}>
						<img
							className="button__arrow"
							src="src/assets/icons/arrow-left-small.svg"
							alt="previous arrow"
						/>
					</button>
				)}
			</div>
			<div
				className={`selections ${transition}`}
				onTransitionEnd={() => setTransition("")}
			>
				{React.cloneElement(CurrentComponent, { ...props, data })}
			</div>
			<div className="button__wrapper">
				{currentIndex < components.length - 1 ? (
					<button
						onClick={handleNext}
						disabled={
							(currentIndex === 0 && !peopleAdded) ||
							(currentIndex === 1 && !allAgesSelected) ||
							(isSystemSelectionStep && !isSystemSelected)
						}
					>
						<img
							className="button__arrow"
							src="src/assets/icons/arrow-right-small.svg"
							alt="next arrow"
						/>
					</button>
				) : (
					<button onClick={handleSubmit} className="submit">
						SUBMIT
					</button>
				)}
			</div>
		</div>
	);
};

export default Carousel;
