import { useEffect, useState } from "react";
import React from "react";
import Modal from "../../components/Modal/Modal";

function TestPage() {
	const [modalOpen, setModalOpen] = useState(true);

	return (
		<div>
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
				<p>HELLO</p>
			</Modal>
			<button onClick={() => setModalOpen(true)}>OPEN</button>
		</div>
	);
}

export default TestPage;
