import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NavBar from "./components/NavBar/NavBar";
import MovieResultsPage from "./pages/MovieResultsPage/MovieResultsPage";
import VideogamePage from "./pages/VideogamesPage/VideogamePage";
import VideogameResultsPage from "./pages/VideogameResultsPage/VideogameResultsPage";
import BoardgamePage from "./pages/BoardgamePage/BoardgamePage";
import BoardgameResultsPage from "./pages/BoardgameResultsPage/BoardgameResultsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AuthFailPage from "./pages/AuthFailPage/AuthFailPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<BrowserRouter>
				<NavBar isLoggedIn={isLoggedIn} />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route
						path="/movies/results"
						element={<MovieResultsPage isLoggedIn={isLoggedIn} />}
					/>
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
					<Route
						path="/profile"
						element={
							<ProfilePage
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
							/>
						}
					/>
					<Route path="/*" element={<NotFoundPage />} />
					<Route path="/auth-fail" element={<AuthFailPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
