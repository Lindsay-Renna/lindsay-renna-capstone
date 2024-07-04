import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import "./ProfilePage.scss";

const ProfilePage = ({ profileData, isLoggedIn }) => {
	return (
		<section className="profile-page">
			{isLoggedIn ? (
				profileData && (
					<>
						<h2>Hello, {profileData.username}</h2>
						<img
							className="profile-page__avatar"
							src={profileData.avatar_url}
							alt={`${profileData.username} avatar`}
						/>
						<div className="profile-page__logout-wrapper">
							<LogoutButton />
						</div>
					</>
				)
			) : (
				<>
					<p>
						<strong>Please login to access your profile!</strong>
					</p>
					<LoginButton />
				</>
			)}
		</section>
	);
};

export default ProfilePage;
