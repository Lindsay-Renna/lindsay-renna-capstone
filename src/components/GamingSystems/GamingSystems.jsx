import "./GamingSystems.scss";
import { systemNames } from "../../utilities/videogame-api.js";

function GamingSystems({ data, handleSystemSelect }) {
	const { systems } = data;

	return (
		<div className="system">
			<h2 className="system__header">Which systems do you own?</h2>
			<div className="system__selections">
				{systemNames.map((system) => {
					const isActive = systems.includes(system.id);

					return (
						<div key={system.id} className="system__wrapper">
							<button
								onClick={handleSystemSelect}
								id={system.id}
								className={
									isActive
										? "system__button--active system__button"
										: "system__button"
								}
							>
								<img
									className="system__icon"
									src={
										isActive
											? `src/assets/icons/systems/systems-${system.id}-white.png`
											: `src/assets/icons/systems/systems-${system.id}.png`
									}
									alt={`${system.name} icon`}
								/>
								<p>{system.name}</p>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default GamingSystems;
