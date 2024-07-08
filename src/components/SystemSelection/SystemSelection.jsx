import "./SystemSelection.scss";

function SystemSelection() {
	return (
		<div className="systems">
			<h2>Where do you watch?</h2>
			<div className="systems__selections">
				{systemss.map((system) => {
					const isActive = hasSystems.includes(system.system_id);

					return (
						<div key={system.system_id} className="systems__wrapper">
							<button
								className={
									isActive
										? "systems__button--active systems__button"
										: "systems__button"
								}
							>
								<img
									id={system.system_id}
									onClick={handleSystemSelect}
									className={
										isActive
											? "systems__icon--active systems__icon"
											: "systems__icon"
									}
									src={`src/assets/icons/systems/systems-icon-${system.system_name}.png`}
									alt={`${system.system_name} icon`}
								/>
								<p>{system.system_name}</p>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SystemSelection;
