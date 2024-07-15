import "./MovieGenres.scss";
import { genreNames } from "../../utilities/movie-api.js";

function MovieGenres({ data, handleGenreSelect }) {
	const { genres } = data;

	return (
		<div className="genre">
			<h2 className="genre__header">Choose some genres?</h2>
			<div className="genre__selections">
				{genreNames.map((genre) => {
					const isActive = genres.includes(genre.id);

					return (
						<div key={genre.id} className="genre__wrapper">
							<button
								onClick={handleGenreSelect}
								id={genre.id}
								className={
									isActive
										? "genre__button--active genre__button"
										: "genre__button"
								}
							>
								<img
									className="genre__icon"
									src={
										isActive
											? `/icons/genres/genre-icon-${genre.id}-white.png`
											: `/icons/genres/genre-icon-${genre.id}.png`
									}
									alt={`${genre.name} icon`}
								/>
								<p>{genre.name}</p>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default MovieGenres;
