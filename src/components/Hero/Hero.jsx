import { Link } from "react-scroll";
import "./Hero.scss";
import logo from "/src/assets/famtivity-logo.png";

function Hero() {
	return (
		<div className="hero">
			<div className="logo-items">
				<div className="logo__container">
					<img className="logo" src={logo} />
				</div>
				<p className="tagline">Where family fun begins</p>
				<div className="icon__container">
					<img
						className="icon"
						src="/src/assets/icons/controller-icon-red.png"
					/>
					<img className="icon" src="/src/assets/icons/dice-icon-purple.png" />
					<img className="icon" src="src/assets/icons/movie-icon-blue.png" />
				</div>
			</div>

			<h3 className="hero__header">
				Welcome to your ultimate family night planner - let's get started
			</h3>
			<div className="plan-button__wrapper">
				<Link to="activities" smooth={true}>
					<button className="plan-button">START HERE</button>
				</Link>
				<div className="plan-button__overlay"></div>
			</div>

			<div className="navigation-div">
				<Link to="activities" smooth={true}>
					<img className="arrow-link" src="/src/assets/icons/arrow-down.svg" />
				</Link>
			</div>
		</div>
	);
}

export default Hero;
