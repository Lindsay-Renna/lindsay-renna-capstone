import "./ChildAgeSelector.scss";

function ChildAgeSelector({ data }) {
	const { numKids, childAges } = data;

	console.log(numKids);
	return (
		<div>
			<h3>How old are the kids?</h3>
			{[...Array(numKids)].map((_, index) => {
				return (
					<div key={index} className="selection-box">
						<label>
							{`Child ${index + 1}`}
							<select name="childAge">
								{Array.from({ length: 12 }).map((_, i) => (
									<option key={i} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</label>
					</div>
				);
			})}
		</div>
	);
}

export default ChildAgeSelector;
