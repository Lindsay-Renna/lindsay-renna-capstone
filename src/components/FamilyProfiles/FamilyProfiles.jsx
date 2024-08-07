import "./FamilyProfiles.scss";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Modal from "../../components/Modal/Modal.jsx";

function FamilyProfiles({ family }) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Your Family Profile</Accordion.Header>
					<Accordion.Body>
						{family.length > 0 ? (
							<div className="family-members">
								{family.map((person) => (
									<div key={person.id} className="family-member">
										<img
											src={
												person.gender === 0
													? "/icons/female.png"
													: "/icons/male.png"
											}
											alt="gender icon"
										/>
										<div className="family-member__info">
											<p>Name: {person.name}</p>
											<p>Age: {person.age}</p>
										</div>
										<div className="family-member__edit">
											<img src="/icons/pencil.png" alt="" />
											<img src="/icons/delete.svg" alt="delete icon" />
										</div>
									</div>
								))}
								<button
									className="family-member__add"
									onClick={() => setModalOpen(true)}
								>
									Add a family member
								</button>
							</div>
						) : (
							<p>You haven't added any family members yet.</p>
						)}
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Modal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				className="family-modal"
			>
				<h2>Add a Family Member</h2>
				<form className="new-profile">
					<label>Name: </label>
					<input type="text" id="name" name="name"></input>
					<label>Age: </label>
					<input></input>
					<input type="radio"></input>
					<button>ADD</button>
				</form>
			</Modal>
		</>
	);
}

export default FamilyProfiles;
