import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import MovieResultsPage from "./pages/MovieResultsPage/MovieResultsPage";
import VideogamePage from "./pages/VideogamesPage/VideogamePage";
import VideogameResultsPage from "./pages/VideogameResultsPage/VideogameResultsPage";
import BoardgamePage from "./pages/BoardgamePage/BoardgamePage";
import BoardgameResultsPage from "./pages/BoardgameResultsPage/BoardgameResultsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movies/results" element={<MovieResultsPage />} />
					<Route path="/videogames" element={<VideogamePage />} />
					<Route
						path="/videogames/results"
						element={<VideogameResultsPage />}
					/>
					<Route path="/boardgames" element={<BoardgamePage />} />
					<Route
						path="/boardgames/results"
						element={<BoardgameResultsPage />}
					/>
					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
