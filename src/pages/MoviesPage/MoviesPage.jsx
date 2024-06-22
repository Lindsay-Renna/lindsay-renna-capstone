import NavBar from "../../components/NavBar/NavBar";
import "./MoviesPage.scss";
import Carousel from "../../components/Carousel/Carousel";

function MoviesPage() {
	return (
		<div id="movie-selection">
			<NavBar />
			<main className="movie-main">
				<Carousel />
			</main>
		</div>
	);
}

export default MoviesPage;
