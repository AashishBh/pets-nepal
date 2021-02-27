import React, { useState } from "react";
import { Card, ListGroup, Image, Modal } from "react-bootstrap";
import renderHTML from "react-render-html";
import { firestore } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { connect } from "react-redux";
import { toDate } from "../../utils/unixtodate";

const Item = ({
	name,
	imageUrl,
	type,
	found,
	description,
	authorId,
	currentUser,
	id,
	date,
	reward,
}) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const foundIt = async () => {
		if (currentUser && currentUser.id === authorId) {
			const collection = name ? "lost" : "found";
			await firestore
				.collection(collection)
				.doc(id)
				.update({ found: true });
			window.location.reload();
		} else {
			return null;
		}
	};

	return (
		<Card style={{ width: "14rem", margin: "20px" }}>
			<ListGroup variant="flush">
				<ListGroup.Item>
					<Image
						src={imageUrl}
						style={{
							height: "200px",
							width: "200px",
						}}
					/>
				</ListGroup.Item>
				{name ? <ListGroup.Item>Name: {name}</ListGroup.Item> : null}
				{type ? <ListGroup.Item>Type: {type}</ListGroup.Item> : null}
				<ListGroup.Item>On: {toDate(date)}</ListGroup.Item>
				{currentUser && currentUser.id === authorId ? (
					<ListGroup.Item>
						<span onClick={foundIt} style={{ cursor: "pointer" }}>
							{name ? (
								<span> Found? </span>
							) : (
								<span>Returned? </span>
							)}
						</span>
					</ListGroup.Item>
				) : null}
				{parseInt(reward) !== 0 ? (
					<ListGroup.Item>Reward: Rs.{reward}</ListGroup.Item>
				) : null}
				<ListGroup.Item>
					{renderHTML(String(description).slice(0, 80))}
					<p onClick={handleShow}> View More </p>
				</ListGroup.Item>
			</ListGroup>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton><h4>Description</h4></Modal.Header>
				<Modal.Body>{renderHTML(String(description))}</Modal.Body>
			</Modal>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(Item);
