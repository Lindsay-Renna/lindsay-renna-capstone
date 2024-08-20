import "./ChildAgeSelector.scss";

function ChildAgeSelector({
	data,
	handleAgeSelect,
	familyProfiles,
	isLoggedIn,
}) {
	const { numKids, childAges } = data;

	// Filter the profiles to include only children (ages 1 to 13)
	const childProfiles = familyProfiles.filter(
		(profile) => profile.age >= 1 && profile.age <= 13
	);

	return (
		<div className="age-select">
			<h2 className="age-select__header">How old are the kids?</h2>
			{[...Array(numKids)].map((_, index) => {
				// Check if a profile exists for the current child, fallback to placeholders if not
				const profileExists = childProfiles[index] !== undefined;

				return (
					<div
						key={index}
						className={
							numKids > 4
								? "age-select__wrapper age-select__wrapper--many"
								: numKids === 4
								? "age-select__wrapper age-select__wrapper--medium"
								: "age-select__wrapper age-select__wrapper--few"
						}
					>
						<img
							src={
								isLoggedIn && profileExists
									? `/images/icon${childProfiles[index].avatar}.png`
									: `/images/icon${index}.png`
							}
							alt="child icon"
							className={
								numKids > 4 ? "kids__image" : "kids__image kids__image--large"
							}
						/>
						<label>
							{isLoggedIn && profileExists
								? `${childProfiles[index].name}`
								: `Child ${index + 1}`}
						</label>
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
