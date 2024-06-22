import React, { useState } from "react";
import "./Carousel.scss";
import PersonSelection from "../PersonSelection/PersonSelection";
import ChildAgeSelector from "../ChildAgeSelector/ChildAgeSelector";

const components = [
	{
		component: (props) => <PersonSelection {...props} />,
		propsName: "personSelectProps",
	},
	{
		component: (props) => <ChildAgeSelector {...props} />,
		propsName: "childAgeSelectorProps",
	},
	{ component: () => <div>Component Three</div>, propsName: "" },
];

const Carousel = ({ personSelectProps, childAgeSelectorProps }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < components.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
	};

	const { component: CurrentComponent, propsName } = components[currentIndex];
	const allProps = { personSelectProps, childAgeSelectorProps };
	const componentProps = propsName ? allProps[propsName] : {};

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
				<CurrentComponent {...componentProps} />
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
							alt="next arrow"
						/>
					</button>
				)}
			</div>
		</div>
	);
};

export default Carousel;
