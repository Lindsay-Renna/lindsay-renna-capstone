import MovieList from "../../components/ActivityChoiceBox/ActivityChoiceBox";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import ActivityChoiceBox from "../../components/ActivityChoiceBox/ActivityChoiceBox";

function HomePage() {
	return (
		<div id="home-page">
			<NavBar />
			<Hero />
			<ActivityChoiceBox />
		</div>
	);
}

export default HomePage;
