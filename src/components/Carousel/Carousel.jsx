import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Carousel.scss";

const Carousel = ({ handleQuerySubmit, data, children, ...props }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [transition, setTransition] = useState("");
	const components = children;
	const navigate = useNavigate();

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

	const CurrentComponent = components[currentIndex];

	const handleSubmit = () => {
		navigate("/movies/results", { state: { data } });
	};

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
					<button onClick={handleNext}>
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
