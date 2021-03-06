import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RichTextEditor from "react-rte";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { firestore } from "../../firebase/firebase.utils";

class AddPet extends Component {
	state = {
		petName: "",
		description: RichTextEditor.createEmptyValue(),
		submitted: false,
		imageLink: "",
		by: "",
		date: null,
		adopted: false,
	};

	formSubmitHandler = async (event) => {
		event.preventDefault();
		const data = {
			petName: this.state.petName,
			description: this.state.description.toString("html"),
			by: this.props.currentUser.displayName,
			imageLink: this.state.imageLink,
			date: Date.now(),
			adopted: this.state.adopted,
		};
		const ref = await firestore.collection("adoption");
		ref.add(data).then(this.setState({ submitted: true }));
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	onChange = (value) => {
		this.setState({ description: value });
		if (this.props.onChange) {
			// Send the changes up to the parent component as an HTML string.
			// This is here to demonstrate using `.toString()` but in a real app it
			// would be better to avoid generating a string on each change.
			this.props.onChange(value.toString("html"));
		}
		console.log(value.toString("html"));
	};

	render() {
		let redirect = null;
		if (this.state.submitted) {
			redirect = <Redirect to="/adoption" />;
		}
		if (this.props.currentUser === null) {
			redirect = <Redirect to="/adoption" />;
		}
		return (
			<Container>
				{redirect}
				<Jumbotron>
					<h1>Add Pet For Adoption</h1>
				</Jumbotron>
				<Form onSubmit={this.formSubmitHandler}>
					<Form.Group controlId="formGroupText">
						<Form.Label>Pet</Form.Label>
						<Form.Control
							type="text"
							name="petName"
							placeholder="Enter pet name, type."
							value={this.state.petName}
							onChange={this.handleChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formGroupText">
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="text"
							name="imageLink"
							placeholder="Enter pet image link."
							value={this.state.imageLink}
							onChange={this.handleChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formGroupText">
						<Form.Label>Description</Form.Label>
						<RichTextEditor
							value={this.state.description}
							onChange={this.onChange}
						/>
					</Form.Group>
					<Button variant="outline-dark" type="submit">
						Submit
					</Button>
				</Form>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(AddPet);
