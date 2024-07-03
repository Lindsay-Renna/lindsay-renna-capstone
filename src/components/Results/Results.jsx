import "./Results.scss";

function Results({ preparedData }) {
	const { title, image, id, release_date } = preparedData;
	console.log(preparedData);

	const dateToYear = (date) => date.slice(0, 4);

	return (
		<div className="result-box">
			{preparedData
				.filter((item, index) => index < 4)
				.map((filteredItem) => {
					return (
						<div key={filteredItem.id} className="result-box__item">
							<img
								className="result-box__image"
								id={filteredItem.id}
								src={filteredItem.image}
								alt={filteredItem.title}
							/>
							<p>
								{filteredItem.title} ({dateToYear(filteredItem.release_date)})
							</p>
						</div>
					);
				})}
		</div>
	);
}

export default Results;
