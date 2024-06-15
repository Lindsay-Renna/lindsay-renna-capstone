// import logo from "./assets/famtivity-icons.png";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import MovieList from "./components/MovieList/MovieList";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
