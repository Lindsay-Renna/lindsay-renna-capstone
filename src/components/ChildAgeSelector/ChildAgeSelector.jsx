import "./ChildAgeSelector.scss";

function ChildAgeSelector({ data, handleAgeSelect }) {
	const { numKids, childAges } = data;

	return (
		<div className="age-select">
			<h2 className="age-select__header">How old are the kids?</h2>
			{[...Array(numKids)].map((_, index) => {
				return (
					<div
						key={index}
						className={
							numKids > 4
								? "age-select__wrapper age-select__wrapper--many"
								: "age-select__wrapper"
						}
					>
						<img
							src={`/src/assets/images/icon${index}.svg`}
							alt="child icon"
							className={
								numKids > 4 ? "kids__image" : "kids__image kids__image--large"
							}
						/>
						<label>{`Child ${index + 1}`}</label>
						<div key={index} className="age-select__dropdown">
							<select
								onChange={(event) => {
									handleAgeSelect(event, index);
								}}
								value={childAges[index] !== undefined ? childAges[index] : ""}
								name="childAge"
							>
								<option value="" disabled>
									- select -
								</option>
								{Array.from({ length: 13 }).map((_, i) => (
									<option key={i} value={i + 1}>
										&nbsp;&nbsp;{i + 1}
									</option>
								))}
							</select>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ChildAgeSelector;
