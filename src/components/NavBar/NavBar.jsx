import { Link, NavLink } from "react-router-dom";
import Hamburger from "../HamburgerMenu/Hamburger";
import "./NavBar.scss";
import { useState, useEffect, useRef } from "react";

const navListArr = [
	{ name: "Home", path: "/", id: 0 },
	{ name: "Popular", path: "/popular", id: 1 },
	{ name: "About", path: "/about", id: 2 },
];

function NavBar({ isLoggedIn }) {
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
			<Link
				className="nav__logo__link"
				to="/"
				onClick={() => setHamburgerOpen(false)}
			>
				<img
					className="nav__logo"
					src="/famtivitylogo.svg"
					alt="famtivity logo"
				/>
			</Link>
			<ul
				ref={menuRef}
				className={
					hamburgerOpen ? "nav-list ham-nav" : "nav-list nav-list--closed"
				}
			>
				{navListArr.map((item) => (
					<NavLink
						key={item.id}
						to={item.path}
						className={({ isActive }) =>
							isActive ? "nav-list__link--active" : "nav-list__link"
						}
						onClick={() => setHamburgerOpen(false)}
					>
						<li className="nav-list__item">{item.name}</li>
					</NavLink>
				))}
			</ul>
			<Link
				to="/profile"
				className="login"
				onClick={() => setHamburgerOpen(false)}
			>
				<img
					className="login__logo"
					src="/icons/user-account-red.svg"
					alt="user account logo"
				/>
				<p className="login__title">{isLoggedIn ? "Profile" : "Login"}</p>
			</Link>
		</nav>
	);
}

export default NavBar;
