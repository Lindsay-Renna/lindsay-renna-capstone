import { Link } from "react-router-dom";
import "./ActivityChoiceBox.scss";

function ActivityChoiceBox() {
	return (
		<div id="activities">
			<h2 className="activities__header">Choose your activity type</h2>
			<div className="activities__list">
				<Link className="activities__link" to="/videogames">
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

				<Link className="activities__link" to="/boardgames">
					<div className="activities__block activities__block--purple">
						<img
							className="activities__icon activities__icon--default"
							src="src/assets/icons/dice-icon-black.svg"
							alt="controller icon"
						/>
						<img
							className="activities__icon activities__icon--hover"
							src="src/assets/icons/dice-icon-white.svg"
							alt="colored controller icon"
						/>
						<h4 className="activities__title">BOARD GAME</h4>
					</div>
				</Link>

				<Link className="activities__link" to="/movies">
					<div className="activities__block activities__block--blue">
						<img
							className="activities__icon activities__icon--default"
							src="src/assets/icons/movie-icon-black.svg"
							alt="controller icon"
						/>
						<img
							className="activities__icon activities__icon--hover"
							src="src/assets/icons/movie-icon-white.svg"
							alt="colored controller icon"
						/>
						<h4 className="activities__title">MOVIE</h4>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default ActivityChoiceBox;
