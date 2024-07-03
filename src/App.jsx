import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import MovieResultsPage from "./pages/MovieResultsPage/MovieResultsPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movies/results" element={<MovieResultsPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
