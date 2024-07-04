import "./Results.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Results({ preparedData }) {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 4;

	const dateToYear = (date) => date.slice(0, 4);

	const seeMore = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const startIndex = currentPage * itemsPerPage;
	const visibleData = preparedData.slice(startIndex, startIndex + itemsPerPage);

	return (
		<div className="result-box">
			{visibleData.map((item) => {
				return (
					<div key={item.id} className="result-box__item">
						<img
							className="result-box__image"
							id={item.id}
							src={item.image}
							alt={item.title}
						/>
						<p>
							{item.title} ({dateToYear(item.release_date)})
						</p>
					</div>
				);
			})}
			<div className="result-box__buttons">
				<Link to="/#activities" className="restart-button">
					Start over?
				</Link>
				{startIndex + itemsPerPage < preparedData.length && (
					<button className="page-button" onClick={seeMore}>
						See more...
					</button>
				)}
			</div>
		</div>
	);
}

export default Results;
