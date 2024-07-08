import SwitchSelector from "react-switch-selector";
import "./VideogameTagSelection.scss";

function VideogameTagSelection() {
	return (
		<div className="tags">
			<h2 className="tags__header">How would you like to play?</h2>
			<div className="tags__selections">
				<div className="switch__wrapper">
					<SwitchSelector
						initial={0}
						onPress={(value) => this.setState({ gender: value })}
						selectedBackgroundColor={"#50c6e0"}
						hasPadding
						fontSize={"1.5rem"}
						options={[
							{ label: "Competitive", value: "f" },
							{ label: "Co-operative", value: "m" },
						]}
						testID="gender-switch-selector"
						accessibilityLabel="gender-switch-selector"
					/>
				</div>
			</div>
		</div>
	);
}

export default VideogameTagSelection;
