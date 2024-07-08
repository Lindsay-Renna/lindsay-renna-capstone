import "./VideogameGenre.scss";
import { vgGenres } from "../../utilities/videogame-api.js";

function VideogameGenre({ data, handleGenreSelect }) {
	const { genres } = data;

	return (
		<div className="vg-genre">
			<h2 className="vg-genre__header">Choose some genres?</h2>
			<div className="vg-genre__selections">
				{vgGenres.map((genre) => {
					const isActive = genres.includes(genre.id);

					return (
						<div key={genre.id} className="vg-genre__wrapper">
							<button
								onClick={handleGenreSelect}
								id={genre.id}
								className={
									isActive
										? "vg-genre__button--active vg-genre__button"
										: "vg-genre__button"
								}
							>
								<img
									className="vg-genre__icon"
									src={
										isActive
											? `src/assets/icons/vg-genres/genre-icon-${genre.name}-white.png`
											: `src/assets/icons/vg-genres/genre-icon-${genre.name}.png`
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

export default VideogameGenre;
