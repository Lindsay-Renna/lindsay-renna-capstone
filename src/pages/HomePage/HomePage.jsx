import "./HomePage.scss";
import Hero from "../../components/Hero/Hero";
import ActivityChoiceBox from "../../components/ActivityChoiceBox/ActivityChoiceBox";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const element = document.getElementById(hash.replace("#", ""));
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [hash]);

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
