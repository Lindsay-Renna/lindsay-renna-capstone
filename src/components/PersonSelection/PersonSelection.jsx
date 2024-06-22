import React, { useState } from "react";
import "./PersonSelection.scss";

function PersonSelection() {
	const [numKids, setNumKids] = useState(0);
	const [numAdults, setNumAdults] = useState(0);

	const addKid = () => {
		if (numKids < 8) {
			setNumKids(numKids + 1);
		}
	};

	const removeKid = () => setNumKids(Math.max(0, numKids - 1));

	const addAdult = () => {
		if (numAdults < 8) {
			setNumAdults(numAdults + 1);
		}
	};

	const removeAdult = () => setNumAdults(Math.max(0, numAdults - 1));

	const numberOfPlayers = numKids + numAdults;

	return (
		<div className="person-selection">
			<div className="kids">
				<h2 className="kids__header">How many kids?</h2>
				<div className="flex-wrapper">
					<button onClick={removeKid} className="minus-button">
						-
					</button>
					<div className="kids__wrapper">
						{[...Array(numKids)].map((_, index) => (
							<img
								key={index}
								src={`/src/assets/images/smile${index}.svg`}
								alt="smile icon"
								className="kids__image"
							/>
						))}
					</div>
					<button onClick={addKid} className="plus-button">
						+
					</button>
				</div>
			</div>

			<div className="adults">
				<h2 className="adults__header">How many adults?</h2>
				<div className="flex-wrapper">
					<button onClick={removeAdult} className="minus-button">
						-
					</button>
					<div className="adults__wrapper">
						{[...Array(numAdults)].map((_, index) => (
							<img
								key={index}
								src={`/src/assets/images/smile${index}.svg`}
								alt="smile icon"
								className="adults__image"
							/>
						))}
					</div>
					<button onClick={addAdult} className="plus-button">
						+
					</button>
				</div>
			</div>
		</div>
	);
}

export default PersonSelection;
