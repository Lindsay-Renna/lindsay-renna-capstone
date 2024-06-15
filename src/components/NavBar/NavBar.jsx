import Hamburger from "../HamburgerMenu/Hamburger";
import "./NavBar.scss";
import React, { useState, useEffect, useRef } from "react";

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

	function toggleHamburger() {
		setHamburgerOpen(!hamburgerOpen);
	}

	function handleClickOutside(event) {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
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
			<div className="hamburger" onClick={toggleHamburger}>
				<Hamburger />
			</div>
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
		</nav>
	);
}

export default NavBar;
