import "./PersonSelection.scss";

function PersonSelection() {
	return (
		<>
			<div className="kids">
				<h4 className="kids__header">How many kids?</h4>
				<div className="kids__wrapper">
					<img
						src="/src/assets/images/smile1.svg"
						alt="dot person icon"
						className="kids__image"
					/>
				</div>
				<div className="kids__wrapper">
					<img
						src="/src/assets/images/smile2.svg"
						alt="dot person icon"
						className="kids__image"
					/>
				</div>
				<div className="kids__wrapper">
					<img
						src="/src/assets/images/smile1.svg"
						alt="dot person icon"
						className="kids__image"
					/>
				</div>
			</div>

			<div className="adults">
				<h4 className="adults">How many kids?</h4>
				<div className="adults__wrapper">
					<img src="" alt="dot person icon" className="adults__image" />
				</div>
			</div>
		</>
	);
}

export default PersonSelection;
