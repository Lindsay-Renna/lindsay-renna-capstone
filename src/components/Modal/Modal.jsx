import "./Modal.scss";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";

ReactModal.setAppElement("#root");

function Modal({ modalOpen, setModalOpen, id, handleDelete, children }) {
	const [scrollTop, setScrollTop] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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
			<div
				className="react-modal__closer"
				onClick={() => {
					setModalOpen(false);
				}}
			>
				<img src="/src/assets/icons/close-circle.svg" alt="close x" />
			</div>
			<div className="react-modal__children">{children}</div>
		</ReactModal>
	);
}

export default Modal;
