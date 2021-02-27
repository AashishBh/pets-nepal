import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RichTextEditor from "react-rte";
import { firestore } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { connect } from "react-redux";

const Add = (props) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState();
	const [description, setDescription] = useState(
		RichTextEditor.createEmptyValue()
	);
	const [type, setType] = useState();
	const [reward, setReward] = useState('0');
	const [imageUrl, setImageUrl] = useState();

	const formSubmitHandler = async (event) => {
		event.preventDefault();
		const lostData = {
			name: name,
			description: description.toString("html"),
			imageUrl: imageUrl,
			reward: reward,
			type: type,
			found: false,
			author: props.currentUser,
			date: Date.now(),
		};
		const foundData  = {
			description: description.toString("html"),
			imageUrl: imageUrl,
			type: type,
			found: false,
			author: props.currentUser,
			date: Date.now(),
		};
		const data = props.lost ? lostData : foundData
		const collectionName = props.lost ? "lost" : "found";
		const ref = await firestore.collection(collectionName);
		ref.add(data);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onChange = (value) => {
		setDescription(value);
		if (props.onChange) {
			// Send the changes up to the parent component as an HTML string.
			// This is here to demonstrate using `.toString()` but in a real app it
			// would be better to avoid generating a string on each change.
			props.onChange(value.toString("html"));
		}
	};

	return (
		<div>
			<Button variant="outline-dark" style={{ marginTop:"-78px", marginLeft:"87%"}} onClick={handleShow}>
				Add
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					{props.lost ? (
						<Modal.Title>Pet Lost</Modal.Title>
					) : (
						<Modal.Title>Pet Found</Modal.Title>
					)}
				</Modal.Header>
				<Form onSubmit={formSubmitHandler}>
					<Modal.Body>
						{props.lost ? (
							<Form.Group controlId="formGroupText">
								<Form.Control
									type="text"
									name="name"
									placeholder="Pet Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</Form.Group>
						) : null}

						<Form.Group controlId="formGroupText">
							<Form.Control
								type="text"
								name="type"
								placeholder="type"
								value={type}
								onChange={(e) => setType(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="formGroupText">
							<Form.Control
								type="text"
								name="imageUrl"
								placeholder="imageUrl"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formGroupText">
							<RichTextEditor
								value={description}
								onChange={onChange}
								required
							/>
						</Form.Group>
						{props.lost ? (
							<Form.Group controlId="formGroupText">
							<Form.Label> Reward </Form.Label>
								<Form.Control
									type="text"
									name="reward"
									placeholder="reward"
									value={reward}
									onChange={(e) => setReward(e.target.value)}
								/>
							</Form.Group>
						) : null}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="dark"
							type="submit"
							onClick={handleClose}
						>
							Save
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(Add);
