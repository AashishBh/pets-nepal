import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { firestore } from "../../firebase/firebase.utils";

const ContactUs = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [enquiry, setEnquiry] = useState("");

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const data = {
			name: name,
			email: email,
			enquiry: enquiry,
		};
		const ref = await firestore.collection("feedbacks");
		ref.add(data).then(alert("Your enquiry has been recieved."));
	};

	return (
		<Col
			md={{ span: 8, offset: 2 }}
			style={{
				align: "center",
				backgroundColor: "whitesmoke",
				padding: "50px",
			}}
		>
			<h3> CONTACT US :</h3>
			<ListGroup variant="flush">
				<Form onSubmit={onSubmitHandler}>
					<ListGroup.Item>
						{" "}
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Your Full Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="John Doe"
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
					</ListGroup.Item>
					<ListGroup.Item>
						{" "}
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="johndoe123@example.com"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
					</ListGroup.Item>
					<ListGroup.Item>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Enquiry</Form.Label>
							<Form.Control
								type="text"
								as="textarea"
								placeholder="Tell us about your inquiry, feedback or issues"
								onChange={(e) => setEnquiry(e.target.value)}
							/>
						</Form.Group>
					</ListGroup.Item>
					<ListGroup.Item>
						<Button type="submit" variant="outline-dark">
							{" "}
							SUBMIT{" "}
						</Button>
					</ListGroup.Item>
				</Form>
			</ListGroup>
		</Col>
	);
};

export default ContactUs;
