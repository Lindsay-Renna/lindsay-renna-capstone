import "./DynamicTable.scss";
import Accordion from "react-bootstrap/Accordion";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import AccordionButton from "react-bootstrap/AccordionButton";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";

function DynamicTable({ movies, handleRemoveMovie }) {
	return (
		<div className="dynamic-table">
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Your Watched List</Accordion.Header>
					<Accordion.Body>
						<table>
							<thead>
								<tr>
									<th>Movie Name</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{movies.map((movie) => (
									<tr key={movie.id}>
										<td>{movie.name}</td>
										<td>
											<img
												className="delete-icon"
												src="/src/assets/icons/delete.svg"
												onClick={() => handleRemoveMovie(movie.id)}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}

export default DynamicTable;
