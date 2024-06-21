import "./ActivityChoiceBox.scss";

function ActivityChoiceBox() {
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

export default ActivityChoiceBox;
