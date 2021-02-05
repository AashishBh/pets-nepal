import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import uniqid from "uniqid";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

class AddBlog extends Component {
	state = {
		title: "",
		content: "",
		id: uniqid("blogId-"),
		submitted: false,
		author: "",
		date: null
	};

	formSubmitHandler = (event) => {
		event.preventDefault();
		const data = {
			title: this.state.title,
			content: this.state.content,
			id: this.state.id,
			author: this.props.currentUser.displayName,
			date: Date.now()
		};
		axios
			.post("https://minor-2b2f5.firebaseio.com/blogs.json", data)
			.then((response) => {
				// console.log(response);
				this.setState({ submitted: true });
			});
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		let redirect = null;
		if (this.state.submitted) {
			redirect = <Redirect to="/" />;
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
						/>
					</Form.Group>
					<Form.Group controlId="formGroupText">
						<Form.Label>CONTENT</Form.Label>
						<Form.Control
							type="text"
							name="content"
							placeholder="Enter content"
							value={this.state.content}
							onChange={this.handleChange}
						/>
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
