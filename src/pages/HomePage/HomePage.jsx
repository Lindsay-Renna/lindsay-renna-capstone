import MovieList from "../../components/MovieList/MovieList";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";

function HomePage() {
	return (
		<div id="home-page">
			<NavBar />
			<Hero />
			<MovieList />
		</div>
	);
}

export default HomePage;
