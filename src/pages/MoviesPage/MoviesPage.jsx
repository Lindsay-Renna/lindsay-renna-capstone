import PersonSelection from "../../components/PersonSelection/PersonSelection";
import NavBar from "../../components/NavBar/NavBar";
import "./MoviesPage.scss";
import ChildAgeSelector from "../../components/ChildAgeSelector/ChildAgeSelector";

function MoviesPage() {
	return (
		<div id="movie-selection">
			<NavBar />
			<main className="movie-main">
				<div className="selections">
					<PersonSelection />
					<ChildAgeSelector />
				</div>
			</main>
		</div>
	);
}

export default MoviesPage;
