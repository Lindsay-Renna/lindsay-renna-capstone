import { Link } from "react-router-dom";
import "./ActivityChoiceBox.scss";

function ActivityChoiceBox() {
	return (
		<div className="activities">
			<h2 className="activities__header">Choose your activity type</h2>
			<div className="activities__list">
				<Link className="activities__link">
					<div className="activities__block activities__block--pink">
						<img
							className="activities__icon activities__icon--default"
							src="src/assets/icons/controller-icon-black.svg"
							alt="controller icon"
						/>
						<img
							className="activities__icon activities__icon--hover"
							src="src/assets/icons/controller-icon-white.svg"
							alt="colored controller icon"
						/>
						<h4 className="activities__title">VIDEO GAME</h4>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default ActivityChoiceBox;
