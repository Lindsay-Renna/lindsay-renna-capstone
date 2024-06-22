// import logo from "./assets/famtivity-icons.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
