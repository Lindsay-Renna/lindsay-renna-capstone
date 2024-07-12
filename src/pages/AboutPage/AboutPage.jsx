import Footer from "../../components/Footer/Footer";
import "./AboutPage.scss";

function AboutPage() {
	return (
		<>
			<div className="about">
				<article>
					<h2 className="about__intro">About FamTivity</h2>
					<p>
						Welcome to FamTivity, your ultimate destination for planning
						unforgettable family nights! We understand that in today’s busy
						world, finding the time and ideas for engaging family activities can
						be challenging. That’s why we created FamTivity – to make it easier
						for families to come together and create cherished memories.
					</p>
				</article>
				<article>
					<h2 className="about__story">Why FamTivity Was Created</h2>
					<p>
						The idea for FamTivity was born out of a desire to help families
						connect and spend quality time together. We recognized the need for
						a platform that could offer personalized activity suggestions
						tailored to the unique dynamics of each family. Whether you have
						toddlers or teenagers, our goal is to provide a diverse range of
						activities that cater to different interests and age groups, making
						every family night special.
					</p>
				</article>
				<article>
					<h2 className="about__attribution">Attibution</h2>
					<p>
						FamTivity is made possible with thanks to the following sources and
						contributors:
					</p>
					<ul>
						<li>
							Movie information is provided by the{" "}
							<a href="https://www.themoviedb.org/">TMDB API</a>
						</li>
						<li>
							video game data is sourced from{" "}
							<a href="https://rawg.io">RAWG API</a>
						</li>
						<li>
							Board game information is scraped from
							<a href="https://boardgamegeek.com/">Board Game Geek</a> via their
							API and graciously provided to us by Markus Shepherd at{" "}
							<a href="https://recommend.games/#/about">Recommend.Games</a>
						</li>
						<li>
							All icons used on FamTivity are by Freepik and utilized under
							their free license.{" "}
						</li>
					</ul>
					<p>
						We appreciate the contributions of these platforms and individuals,
						whose resources help us create a richer, more enjoyable experience
						for our users. Thank you for being a part of the FamTivity
						community!
					</p>
				</article>
			</div>
			<Footer />
		</>
	);
}

export default AboutPage;
