import "./PersonSelection.scss";

function PersonSelection({
	data,
	addKid,
	removeKid,
	addAdult,
	removeAdult,
	familyProfiles,
	isLoggedIn,
}) {
	const { numKids, numAdults } = data;

	// Separate kids and adults based on their age
	const kidsProfiles = familyProfiles.filter(
		(profile) => profile.age >= 1 && profile.age <= 13
	);
	const adultsProfiles = familyProfiles.filter((profile) => profile.age === 0);

	return (
		<div className="person-selection">
			<div className="kids">
				<h2 className="kids__header">How many kids?</h2>
				<div className="flex-wrapper">
					<button onClick={removeKid} className="minus-button">
						<img
							className="button__image"
							src="/icons/minus-circle.png"
							alt="minus circle"
						/>
					</button>
					<div className="kids__wrapper">
						{isLoggedIn
							? [...Array(numKids)].map((_, index) => {
									// Render existing kid profiles first, then placeholder if more kids are added
									if (kidsProfiles[index]) {
										return (
											<img
												key={index}
												src={`/images/icon${kidsProfiles[index].avatar}.png`}
												alt="kid avatar"
												className={
													numKids < 5
														? "kids__image kids__image--large"
														: "kids__image"
												}
											/>
										);
									} else {
										// Placeholder for additional kids added
										return (
											<img
												key={index}
												src={`/images/icon${index}.png`}
												alt="smile icon"
												className={
													numKids < 5
														? "kids__image kids__image--large"
														: "kids__image"
												}
											/>
										);
									}
							  })
							: [...Array(numKids)].map((_, index) => (
									<img
										key={index}
										src={`/images/icon${index}.png`}
										alt="smile icon"
										className={
											numKids < 5
												? "kids__image kids__image--large"
												: "kids__image"
										}
									/>
							  ))}
					</div>

					<button onClick={addKid} className="plus-button">
						<img
							className="button__image"
							src="/icons/plus-circle.png"
							alt="plus circle"
						/>
					</button>
				</div>
			</div>

			<div className="adults">
				<h2 className="adults__header">How many adults?</h2>
				<div className="flex-wrapper">
					<button onClick={removeAdult} className="minus-button">
						<img
							className="button__image"
							src="/icons/minus-circle.png"
							alt="minus circle"
						/>
					</button>
					<div className="adults__wrapper">
						{isLoggedIn
							? [...Array(numAdults)].map((_, index) => {
									// Render existing adult profiles first, then placeholder if more adults are added
									if (adultsProfiles[index]) {
										return (
											<img
												key={index}
												src={`/images/icon${adultsProfiles[index].avatar}.png`}
												alt="adult avatar"
												className={
													numAdults < 5
														? "adults__image adults__image--large"
														: "adults__image"
												}
											/>
										);
									} else {
										// Placeholder for additional adults added
										return (
											<img
												key={index}
												src={`/images/icon${index + 8}.png`}
												alt="smile icon"
												className={
													numAdults < 5
														? "adults__image adults__image--large"
														: "adults__image"
												}
											/>
										);
									}
							  })
							: [...Array(numAdults)].map((_, index) => (
									<img
										key={index}
										src={`/images/icon${index + 8}.png`}
										alt="smile icon"
										className={
											numAdults < 5
												? "adults__image adults__image--large"
												: "adults__image"
										}
									/>
							  ))}
					</div>
					<button onClick={addAdult} className="plus-button">
						<img
							className="button__image"
							src="/icons/plus-circle.png"
							alt="plus circle"
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default PersonSelection;
