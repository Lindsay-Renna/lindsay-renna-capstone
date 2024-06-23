import "./ChildAgeSelector.scss";

function ChildAgeSelector({ data }) {
	const { numKids, childAges } = data;
	console.log(numKids);
	return (
		<div>
			<h3>How old are the kids?</h3>
		</div>
	);
}

export default ChildAgeSelector;
