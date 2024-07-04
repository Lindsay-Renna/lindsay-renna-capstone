import DynamicTable from "../../components/DynamicTable/DynamicTable";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useState } from "react";
import "./ProfilePage.scss";

const initialMovies = [
	{ id: 22, name: "The Godfather" },
	{ id: 33, name: "Jurassic Park" },
	{ id: 1, name: "Inception" },
	{ id: 2, name: "The Dark Knight" },
	{ id: 3, name: "Pulp Fiction" },
	{ id: 4, name: "The Shawshank Redemption" },
	{ id: 5, name: "The Matrix" },
	{ id: 6, name: "Forrest Gump" },
	{ id: 7, name: "Fight Club" },
];

const ProfilePage = ({ profileData, isLoggedIn }) => {
	const [movies, setMovies] = useState(initialMovies);

	const handleRemoveMovie = (id) => {
		setMovies(movies.filter((movie) => movie.id !== id));
	};

	return (
		<section className="profile-page">
			{isLoggedIn ? (
				profileData && (
					<div className="profile-page__profile">
						<h2 className="profile-page__header">
							Hello, {profileData.username}
						</h2>
						<div className="profile-page__info">
							<img
								className="profile-page__avatar"
								src={profileData.avatar_url}
								alt={`${profileData.username} avatar`}
							/>
						</div>
						<div className="profile-page__watch-list">
							<DynamicTable
								movies={movies}
								handleRemoveMovie={handleRemoveMovie}
							/>
						</div>
						<div className="profile-page__logout-wrapper">
							<LogoutButton />
						</div>
					</div>
				)
			) : (
				<>
					<h2 className="login-request">
						<strong>Please login to access your profile!</strong>
					</h2>
					<LoginButton />
				</>
			)}
		</section>
	);
};

export default ProfilePage;
