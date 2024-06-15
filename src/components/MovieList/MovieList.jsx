import { useState, useEffect } from "react";
import { getPopularMovieEndpoint } from "../../utils/api_utility";
import "./MovieList.scss";
import axios from "axios";

function MovieList() {
	const [movies, setMovies] = useState([]);

	const getMovies = async () => {
		try {
			let response = await axios.get(getPopularMovieEndpoint());
			setMovies(response.data.results);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div id="movie-list">
			<h3>MovieList</h3>
			<ul>
				{movies.map((movie) => {
					return (
						<div className="movie-block" key={movie.id}>
							<h4>{movie.title}</h4>
							<img
								src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
							/>
						</div>
					);
				})}
			</ul>
		</div>
	);
}

export default MovieList;
