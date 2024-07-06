import "./PersonSelection.scss";

function PersonSelection({ data, addKid, removeKid, addAdult, removeAdult }) {
	const { numKids, numAdults } = data;

	return (
		<div className="person-selection">
			<div className="kids">
				<h2 className="kids__header">How many kids?</h2>
				<div className="flex-wrapper">
					<button onClick={removeKid} className="minus-button">
						<img
							className="button__image"
							src="src/assets/icons/minus-circle.png"
							alt="minus circle"
						/>
					</button>
					<div className="kids__wrapper">
						{[...Array(numKids)].map((_, index) => (
							<img
								key={index}
								src={`/src/assets/images/icon${index}.svg`}
								alt="smile icon"
								className={
									numKids < 5 ? "kids__image kids__image--large" : "kids__image"
								}
							/>
						))}
					</div>
					<button onClick={addKid} className="plus-button">
						<img
							className="button__image"
							src="src/assets/icons/plus-circle.png"
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
							src="src/assets/icons/minus-circle.png"
							alt="minus circle"
						/>
					</button>
					<div className="adults__wrapper">
						{[...Array(numAdults)].map((_, index) => (
							<img
								key={index}
								src={`/src/assets/images/icon${index + 8}.svg`}
								alt="smile icon"
								className={
									numAdults < 5
										? "adults__image adults__image--large"
										: "adults__image"
								}
							/>
						))}
					</div>
					<button onClick={addAdult} className="plus-button">
						<img
							className="button__image"
							src="src/assets/icons/plus-circle.png"
							alt="plus circle"
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default PersonSelection;
