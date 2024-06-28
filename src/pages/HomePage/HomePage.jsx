import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import ActivityChoiceBox from "../../components/ActivityChoiceBox/ActivityChoiceBox";

function HomePage() {
	return (
		<div id="home-page">
			<Hero />
			<main className="homepage-main">
				<ActivityChoiceBox />
			</main>
		</div>
	);
}

export default HomePage;
