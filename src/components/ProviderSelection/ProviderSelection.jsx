import "./ProviderSelection.scss";
import { providers } from "../../utilities/movie-api.js";

function ProviderSelection({ handleProviderSelect, data }) {
	const { watchProviders } = data;

	return (
		<div className="provider">
			<h2 className="provider__header">Where do you watch?</h2>
			<div className="provider__selections">
				{providers.map((provider) => {
					const isActive = watchProviders.includes(provider.provider_id);

					return (
						<div key={provider.provider_id} className="provider__wrapper">
							<button
								className={
									isActive
										? "provider__button--active provider__button"
										: "provider__button"
								}
							>
								<img
									id={provider.provider_id}
									onClick={handleProviderSelect}
									className={
										isActive
											? "provider__icon--active provider__icon"
											: "provider__icon"
									}
									src={`src/assets/icons/providers/provider-icon-${provider.provider_name}.png`}
									alt={`${provider.provider_name} icon`}
								/>
								<p>{provider.provider_name}</p>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ProviderSelection;
