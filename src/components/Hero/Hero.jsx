import { Link } from "react-scroll";
import "./Hero.scss";

function Hero() {
	return (
		<div className="hero">
			<div className="logo-items">
				<div className="logo__container">
					<img className="logo" src="/famtivity-logo.png" />
				</div>
				<p className="tagline">Where family fun begins</p>
				<div className="icon__container">
					<img className="icon" src="/icons/controller-icon-red.png" />
					<img className="icon" src="/icons/dice-icon-purple.png" />
					<img className="icon" src="/icons/movie-icon-blue.png" />
				</div>
			</div>

			<h3 className="hero__header fade-in-down">
				Welcome to your ultimate family night planner - let's get started...
			</h3>
			<div className="plan-button__wrapper">
				<Link to="activities" smooth={true}>
					<button className="plan-button">START HERE</button>
				</Link>
				<div className="plan-button__overlay"></div>
			</div>

			<div className="navigation-div">
				<Link to="activities" smooth={true}>
					<img className="arrow-link" src="/icons/arrow-down.svg" />
				</Link>
			</div>
		</div>
	);
}

export default Hero;
