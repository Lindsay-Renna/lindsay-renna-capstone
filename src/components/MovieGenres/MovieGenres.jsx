import "./MovieGenres.scss";
import { genreNames } from "../../utilities/movie-api.js";

function MovieGenres({ data, handleGenreSelect }) {
	const { genres } = data;
	console.log(data);

	return (
		<div>
			<h2>What kind of movie would you like to watch?</h2>
			<div className="genres">
				{genreNames.map((genre, index) => {
					const isActive = genres.includes(genre.id);

					return (
						<div key={genre.id} className="genres__wrapper">
							<button
								onClick={handleGenreSelect}
								id={genre.id}
								className={
									isActive ? "active genres__button" : "genres__button"
								}
							>
								<img
									className="genres__icon"
									src=""
									alt={`${genre.name} icon`}
								/>
								{genre.name}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default MovieGenres;
