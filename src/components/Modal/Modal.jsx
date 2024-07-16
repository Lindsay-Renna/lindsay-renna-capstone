import "./Modal.scss";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";

ReactModal.setAppElement("#root");

function Modal({ modalOpen, setModalOpen, isLoggedIn, children }) {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const body = document.body;
		if (modalOpen) {
			const currentScrollPosition = window.scrollY;
			setScrollPosition(currentScrollPosition);
			body.style.position = "fixed";
			body.style.top = `-${currentScrollPosition}px`;
			body.style.width = "100%";
		} else {
			body.style.position = "";
			body.style.top = `-${scrollPosition}px`;
			window.scrollTo(0, scrollPosition);
		}
	}, [modalOpen]);

	if (!modalOpen) return null;

	return (
		<ReactModal
			className="react-modal"
			overlayClassName="react-modalOverlay"
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(false)}
			contentLabel="Delete Confirmation"
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
		>
			<img
				className="react-modal__closer"
				onClick={() => {
					setModalOpen(false);
				}}
				src="/icons/close-circle.svg"
				alt="close x"
			/>
			<div className="react-modal__children">{children}</div>
		</ReactModal>
	);
}

export default Modal;
