import React, { useState } from "react";
import "./PersonSelection.scss";

function PersonSelection({
	numKids,
	numAdults,
	addKid,
	removeKid,
	addAdult,
	removeAdult,
}) {
	return (
		<div className="person-selection">
			<div className="kids">
				<h2 className="kids__header">How many kids?</h2>
				<div className="flex-wrapper">
					<button onClick={removeKid} className="minus-button">
						<img
							className="button__image"
							src="src/assets/icons/minus-circle.svg"
							alt="minus circle"
						/>
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
						<img
							className="button__image"
							src="src/assets/icons/plus-circle.svg"
							alt="plus circle"
						/>
					</button>
				</div>
			</div>

			<div className="adults">
				<h2 className="adults__header">How many adults?</h2>
				<div className="flex-wrapper">
					<button onClick={removeAdult} className="minus-button">
						<img
							className="button__image"
							src="src/assets/icons/minus-circle.svg"
							alt="minus circle"
						/>
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
						<img
							className="button__image"
							src="src/assets/icons/plus-circle.svg"
							alt="plus circle"
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default PersonSelection;
