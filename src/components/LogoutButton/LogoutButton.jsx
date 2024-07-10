import "./LogoutButton.scss";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const LogoutButton = ({ setIsLoggedIn }) => {
	const handleLogout = async () => {
		try {
			await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true });
			localStorage.removeItem("user_id");
			setIsLoggedIn(false);
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<button className="logout-button" onClick={handleLogout}>
			<img src="/src/assets/icons/logout.svg" alt="logout button" />
			<span className="logout-button__text">Logout</span>
		</button>
	);
};

export default LogoutButton;
