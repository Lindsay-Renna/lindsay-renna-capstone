import "./DynamicTable.scss";
import Accordion from "react-bootstrap/Accordion";

function DynamicTable({ movies, handleRemoveMovie }) {
	return (
		<div className="dynamic-table">
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Your Watched List</Accordion.Header>
					<Accordion.Body>
						{movies.length > 0 ? (
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
											<td>{movie.movie_name}</td>
											<td>{movie.movie_year}</td>
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
						) : (
							<p>You have no watched movies.</p>
						)}
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}

export default DynamicTable;
