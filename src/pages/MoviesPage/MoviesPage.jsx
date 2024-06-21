import PersonSelection from "../../components/PersonSelection/PersonSelection";
import NavBar from "../../components/NavBar/NavBar";
import "./MoviesPage.scss";

function MoviesPage() {
	return (
		<div id="movie-selection">
			<NavBar />
			<main>
				<div className="selections">
					<PersonSelection />
				</div>
			</main>
		</div>
	);
}

export default MoviesPage;
