import "./FamilyProfiles.scss";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Modal from "../../components/Modal/Modal.jsx";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

function FamilyProfiles({ family, getFamilyProfiles }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState({});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const user_id = localStorage.getItem("user_id");
		const newProfile = {
			user_id: user_id,
			name: event.target.name.value,
			age: event.target.age.value,
			gender: event.target.profile.value,
		};

		try {
			const res = await axios.post(`${SERVER_URL}/user/family/add`, newProfile);
			console.log("Profile added:", res.data);
		} catch (error) {
			console.log(error);
		}
		setModalOpen(false);
		getFamilyProfiles(user_id);
	};

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`${SERVER_URL}/user/family/${id}`);
			console.log("Profile deleted:", res.data);
			getFamilyProfiles(localStorage.getItem("user_id"));
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = (id) => {
		const selectedProfile = family.find((profile) => profile.id === id);
		setSelectedProfile(selectedProfile);
		setEditModalOpen(true);
	};

	const handleEditSubmit = async (event) => {
		event.preventDefault();
		const user_id = localStorage.getItem("user_id");
		const updatedProfile = {
			user_id: user_id,
			name: event.target.name.value,
			age: event.target.age.value,
			gender: event.target.profile.value,
		};

		try {
			const res = await axios.put(
				`${SERVER_URL}/user/family/${selectedProfile.id}`,
				updatedProfile
			);
			console.log("Profile updated:", res.data);
			getFamilyProfiles(user_id);
		} catch (error) {
			console.log(error);
		}
		setEditModalOpen(false);
	};

	const avatars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

	return (
		<div className="dynamic-table">
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Your Family Profile</Accordion.Header>
					<Accordion.Body>
						{family.length > 0 ? (
							<div className="family-members">
								{family.map((person) => (
									<div key={person.id} className="family-member">
										<img
											src={`/images/icon${person.gender}.png`}
											alt="profile avatar"
										/>
										<div className="family-member__info">
											<p>Name: {person.name}</p>
											<p>Age: {person.age}</p>
										</div>
										<div className="family-member__edit">
											<img
												src="/icons/pencil.png"
												alt="edit icon"
												onClick={() => handleEdit(person.id)}
											/>
											<img
												src="/icons/delete.svg"
												alt="delete icon"
												onClick={() => handleDelete(person.id)}
											/>
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
				<form className="new-profile" onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="name..."
						required
					></input>
					<label htmlFor="name">Age:</label>
					<select required defaultValue="" name="age">
						<option value="" disabled>
							- select -
						</option>
						{Array.from({ length: 13 }).map((_, i) => (
							<option key={i} value={i + 1}>
								&nbsp;&nbsp;{i + 1}
							</option>
						))}
					</select>
					<p>Avatar:</p>
					<div className="radio-buttons__wrapper">
						{avatars.map((avatar, index) => {
							return (
								<div key={avatar} className="radio-button">
									<input
										type="radio"
										id={avatar}
										name="profile"
										value={avatar}
										defaultChecked={index === 0}
									/>
									<label htmlFor={avatar}>
										<img
											className="new-profile__image"
											src={`/images/icon${avatar}.png`}
											alt="monster icon"
										/>
									</label>
								</div>
							);
						})}
					</div>
					<button className="new-profile__button" type="submit">
						ADD
					</button>
				</form>
			</Modal>
			<Modal
				modalOpen={editModalOpen}
				setModalOpen={setEditModalOpen}
				className="edit-modal"
			>
				<h2>Edit Family Member</h2>
				<form className="new-profile" onSubmit={(e) => handleEditSubmit(e)}>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						defaultValue={selectedProfile.name}
						required
					></input>
					<label htmlFor="name">Age:</label>
					<select required defaultValue={selectedProfile.age} name="age">
						<option value="" disabled>
							- select -
						</option>
						{Array.from({ length: 13 }).map((_, i) => (
							<option key={i} value={i + 1}>
								&nbsp;&nbsp;{i + 1}
							</option>
						))}
					</select>
					<p>Avatar:</p>
					<div className="radio-buttons__wrapper">
						{avatars.map((avatar) => {
							return (
								<div key={avatar} className="radio-button">
									<input
										type="radio"
										id={avatar}
										name="profile"
										value={avatar}
										defaultChecked={selectedProfile.gender === avatar}
									/>
									<label htmlFor={avatar}>
										<img
											className="new-profile__image"
											src={`/images/icon${avatar}.png`}
											alt="monster icon"
										/>
									</label>
								</div>
							);
						})}
					</div>
					<button className="new-profile__button" type="submit">
						ADD
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default FamilyProfiles;
