import { Link } from "react-router-dom";
import Hamburger from "../HamburgerMenu/Hamburger";
import "./NavBar.scss";
import { useState, useEffect, useRef } from "react";

const navListArr = [
	"Browse Movies",
	"Browse Games",
	"Browse BoardGames",
	"About",
	"Contact",
];

function NavBar() {
	const [hamburgerOpen, setHamburgerOpen] = useState(false);
	const menuRef = useRef(null);
	const hamburgerRef = useRef(null);

	function toggleHamburger(event) {
		event.stopPropagation();
		setHamburgerOpen((prev) => !prev);
	}

	function handleClickOutside(event) {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target) &&
			hamburgerRef.current &&
			!hamburgerRef.current.contains(event.target)
		) {
			setHamburgerOpen(false);
		}
	}

	function handleScroll() {
		setHamburgerOpen(false);
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav>
			<div ref={hamburgerRef} className="hamburger" onClick={toggleHamburger}>
				<Hamburger />
			</div>
			<img
				className="nav__logo"
				src="/src/assets/Famtivity-logo.svg"
				alt="famtivity logo"
			/>
			<ul
				ref={menuRef}
				className={hamburgerOpen ? "nav-list ham-nav" : "nav-list"}
			>
				{navListArr.map((item, index) => (
					<li key={index} className="nav-list__item">
						{item}
					</li>
				))}
			</ul>
			<Link className="login">
				<img
					className="login__logo"
					src="/src/assets/icons/user-account-red.svg"
					alt="user account logo"
				/>
				<p className="login__title">Login / Sign Up</p>
			</Link>
		</nav>
	);
}

export default NavBar;
