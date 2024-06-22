import React, { useState } from "react";
import "./Carousel.scss";
import PersonSelection from "../PersonSelection/PersonSelection";
import ChildAgeSelector from "../ChildAgeSelector/ChildAgeSelector";

const ComponentOne = () => <PersonSelection />;
const ComponentTwo = () => <ChildAgeSelector />;
const ComponentThree = () => <div>Component Three</div>;

const components = [ComponentOne, ComponentTwo, ComponentThree];

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => {
			if (prevIndex < components.length - 1) {
				return prevIndex + 1;
			} else {
				return prevIndex;
			}
		});
	};

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) => {
			if (prevIndex > 0) {
				return prevIndex - 1;
			} else {
				return prevIndex;
			}
		});
	};

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
			<div className="selections">
				<CurrentComponent />
			</div>

			<div className="button__wrapper">
				{currentIndex < components.length - 1 && (
					<button
						onClick={handleNext}
						disabled={currentIndex === components.length - 1}
					>
						<img
							className="button__arrow"
							src="src/assets/icons/arrow-right-small.svg"
							alt="previous arrow"
						/>
					</button>
				)}
			</div>
		</div>
	);
};

export default Carousel;
