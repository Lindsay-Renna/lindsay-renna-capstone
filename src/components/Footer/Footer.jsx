import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
	return (
		<footer>
			<div className="footer__header">
				<h3>Lindsay Renna &copy; 2024</h3>
			</div>
			<div className="social">
				<Link to="https://www.linkedin.com/in/lindsay-renna/">
					<img
						src="src/assets/icons/socials/linkedin.png"
						alt="linked-in icon"
					/>
				</Link>
				<Link to="https://github.com/Lindsay-Renna">
					<img src="src/assets/icons/socials/github.png" alt="git-hub icon" />
				</Link>
				<Link to="mailto:lrenna.oct@gmail.com">
					<img src="/src/assets/icons/socials/email.png" alt="email icon" />
				</Link>
			</div>
		</footer>
	);
}

export default Footer;
