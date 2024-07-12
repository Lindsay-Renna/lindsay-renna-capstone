import DynamicTable from "../../components/DynamicTable/DynamicTable";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useState, useEffect } from "react";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
import axios from "axios";
import "./ProfilePage.scss";

const ProfilePage = ({ isLoggedIn, setIsLoggedIn }) => {
	const [movies, setMovies] = useState([]);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [profileData, setProfileData] = useState(null);

	const authenticateUser = async () => {
		try {
			const res = await axios.get(`${SERVER_URL}/auth/profile`, {
				withCredentials: true,
			});
			console.log(res.data);
			setIsAuthenticating(false);
			setIsLoggedIn(true);
			setProfileData(res.data);
			localStorage.setItem("user_id", res.data.id);
			getWatchedList(res.data.id);
		} catch (err) {
			if (err.response && err.response.status == 401) {
				setIsAuthenticating(false);
				setIsLoggedIn(false);
			} else {
				console.log("Error authenticating", err);
			}
		}
	};

	const getWatchedList = async (id) => {
		try {
			const res = await axios.get(`${SERVER_URL}/user/${id}/watched-list`);
			const movies = res.data;
			console.log(movies);
			setMovies(movies);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	const handleRemoveMovie = (id) => {
		try {
			axios.delete(`${SERVER_URL}/user/${id}`);
		} catch (error) {
			console.log(err);
		}
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
							<LogoutButton setIsLoggedIn={setIsLoggedIn} />
						</div>
					</div>
				)
			) : (
				<div className="login-request">
					<div className="login-request__container">
						<h2 className="login-request__header">
							Please login to access your profile
						</h2>
						<LoginButton />
					</div>
				</div>
			)}
		</section>
	);
};

export default ProfilePage;
