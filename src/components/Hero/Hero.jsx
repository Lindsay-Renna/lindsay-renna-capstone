import { Link, animateScroll as scroll } from "react-scroll";
import "./Hero.scss";
import logo from "/src/assets/Famtivity-colourful.png";
import MovieList from "../MovieList/MovieList";

function Hero() {
	return (
		<div className="hero">
			<div className="logo-items">
				<div className="logo__container">
					<img className="logo" src={logo} />
				</div>
				<p className="tagline tagline--small">Where family fun begins.</p>
				<div className="icon__container">
					<img className="icon" src="/src/assets/icons/controller-icon.png" />
					<img className="icon" src="/src/assets/icons/dice-icon.png" />
					<img className="icon" src="src/assets/icons/movie-icon.png" />
				</div>
			</div>

			<h3 className="tagline">
				Welcome to your ultimate family night planner - let's get started
			</h3>

			<div className="navigation-div">
				<Link to="movie-list" smooth={true}>
					<img className="arrow-link" src="/src/assets/icons/arrow-down.svg" />
				</Link>
			</div>
		</div>
	);
}

export default Hero;
