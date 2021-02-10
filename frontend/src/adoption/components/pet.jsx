import React, { useState } from "react";
import renderHTML from "react-render-html";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

const Pet = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const adopt = async () => {
		const docRef = await firestore.collection("adoption").doc(props.id);
		await docRef.update({ adopted: true });
		setShow(false);
		window.location.reload();
	};

	const text = String(props.description);
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img
				variant="top"
				height="250"
				width="250"
				src={props.imageLink}
			/>
			{!props.adopted ? (
				<div>
					<Button onClick={handleShow}> Adopt </Button>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton></Modal.Header>
						<Modal.Body>
							Are you sure you want to adopt this pet?
						</Modal.Body>
						<Modal.Footer>
							<Link to="/adoption">
								<Button variant="success" onClick={adopt}>
									Yes
								</Button>
							</Link>
							<Button variant="info" onClick={handleClose}>
								No
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			) : (
				<Button disabled variant="success">
					{" "}
					ADOPTED{" "}
				</Button>
			)}
			<Card.Body>
				<Card.Title>{props.petName}</Card.Title>
				<Card.Text>
					<small>{renderHTML(text)}</small>
				</Card.Text>
			</Card.Body>
			{/**<Card.Footer>
							<small className="text-muted">
								by: {props.by}
								<br />
								on: {Date(props.date).toLocaleString("en-US")}
							</small>
						</Card.Footer>**/}
		</Card>
	);
};

export default Pet;
