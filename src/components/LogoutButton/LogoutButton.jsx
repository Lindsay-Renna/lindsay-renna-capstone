import "./LogoutButton.scss";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const LogoutButton = () => {
	return (
		<a className="logout-button" href={`${SERVER_URL}/auth/logout`}>
			<img src="/icons/logout.svg" alt="logout button" />
			<span className="logout-button__text">Logout</span>
		</a>
	);
};

export default LogoutButton;
