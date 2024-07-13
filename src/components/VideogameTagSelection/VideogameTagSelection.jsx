import SwitchSelector from "react-switch-selector";
import "./VideogameTagSelection.scss";

function VideogameTagSelection({ data, handleToggle }) {
	return (
		<div className="tags">
			<h2 className="tags__header">How would you like to play?</h2>
			<div className="tags__selections">
				<div className="switch__wrapper">
					<SwitchSelector
						id="compSelector"
						initial={data.cooperative ? 0 : 1}
						onChange={(value) => handleToggle(value)}
						selectedBackgroundColor={"#bb8abf"}
						hasPadding
						border={"2px solid black"}
						fontSize={"1.5rem"}
						options={[
							{ label: "Co-operative", value: "true" },
							{ label: "Competitive", value: false },
						]}
					/>
				</div>
				<div className="tags__image__wrapper">
					<img
						src={
							data.cooperative ? "/icons/co-op-icon.png" : "/icons/pvp-icon.png"
						}
						alt="PVP icon"
					/>
				</div>
			</div>
		</div>
	);
}

export default VideogameTagSelection;
