import DynamicTable from "../../components/DynamicTable/DynamicTable";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useState, useEffect } from "react";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
import axios from "axios";
import "./ProfilePage.scss";
import FamilyProfiles from "../../components/FamilyProfiles/FamilyProfiles";

const ProfilePage = ({ isLoggedIn, setIsLoggedIn }) => {
	const [movies, setMovies] = useState([]);
	const [familyProfiles, setFamilyProfiles] = useState([]);
	const [isAuthenticating, setIsAuthenticating] = useState(true);

	useEffect(() => {
		authenticateUser();
	}, []);

	const [profileData, setProfileData] = useState(null);

	const authenticateUser = async () => {
		try {
			const res = await axios.get(`${SERVER_URL}/auth/profile`, {
				withCredentials: true,
			});
			setIsAuthenticating(false);
			setIsLoggedIn(true);
			console.log(res.data);
			setProfileData(res.data);
			localStorage.setItem("user_id", res.data.id);
			getWatchedList(res.data.id);
			getFamilyProfiles(res.data.id);
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
			const movies = res.data.sort((a, b) =>
				a.movie_name.localeCompare(b.movie_name)
			);
			setMovies(movies);
		} catch (err) {
			console.log(err);
		}
	};

	const handleRemoveMovie = (id) => {
		try {
			axios.delete(`${SERVER_URL}/user/${id}`);
		} catch (error) {
			console.log(error);
		}
		setMovies(movies.filter((movie) => movie.id !== id));
	};

	const getFamilyProfiles = async (id) => {
		try {
			const { data } = await axios.get(`${SERVER_URL}/user/${id}/family`);
			setFamilyProfiles(data);
		} catch (error) {
			console.log(error);
		}
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
						<div className="profile-page__family-profiles">
							<FamilyProfiles family={familyProfiles} />
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
