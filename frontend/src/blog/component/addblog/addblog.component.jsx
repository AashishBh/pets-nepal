import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RichTextEditor from "react-rte";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { firestore } from "../../../firebase/firebase.utils";

class AddBlog extends Component {
	state = {
		title: "",
		content: RichTextEditor.createEmptyValue(),
		submitted: false,
		author: "",
		date: null,
	};

	formSubmitHandler = async (event) => {
		event.preventDefault();
		const data = {
			title: this.state.title,
			content: this.state.content.toString("html"),
			author: this.props.currentUser.displayName,
			date: Date.now(),
		};
		const ref = await firestore.collection("blogs");
		ref.add(data).then(this.setState({submitted: true}))
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	onChange = (value) => {
		this.setState({ content: value });
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
			redirect = <Redirect to="/blog" />;
		}
		if (this.props.currentUser === null){
			redirect = <Redirect to="/blog" />;
		}
		return (
			<Container>
				{redirect}
				<Jumbotron>
					<h1>Add Blog</h1>
				</Jumbotron>
				<Form onSubmit={this.formSubmitHandler}>
					<Form.Group controlId="formGroupText">
						<Form.Label>TITLE</Form.Label>
						<Form.Control
							type="text"
							name="title"
							placeholder="Enter title"
							value={this.state.title}
							onChange={this.handleChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formGroupText">
						<Form.Label>CONTENT</Form.Label>
						<RichTextEditor
							value={this.state.content}
							onChange={this.onChange}
							required
						/>

						{/**<Form.Control
													type="text"
													name="content"
													placeholder="Enter content"
													value={this.state.co	ntent}
													onChange={this.handleChange}
												/>**/}
					</Form.Group>
					<Button variant="primary" type="submit">
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

export default connect(mapStateToProps, null)(AddBlog);
