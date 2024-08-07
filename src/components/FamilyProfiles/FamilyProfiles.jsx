import "./FamilyProfiles.scss";
import Accordion from "react-bootstrap/Accordion";

function FamilyProfiles({ family }) {
	return (
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
						</div>
					) : (
						<p>You haven't added any family members yet.</p>
					)}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export default FamilyProfiles;
