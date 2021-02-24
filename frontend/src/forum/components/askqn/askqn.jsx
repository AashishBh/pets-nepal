import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { firestore } from "../../../firebase/firebase.utils";

class AskQn extends Component {
	state = {
		title: "",
		content: "",
		submitted: false,
		author: "",
		date: null,
		comments: [],
	};

	formSubmitHandler = async (event) => {
		// data uploaded to firebase cloud firestore, not realtime database
		event.preventDefault();
		const data = {
			title: this.state.title,
			content: this.state.content,
			author: this.props.currentUser.displayName,
			date: Date.now(),
			comments: this.state.comments,
		};
		const ref = await firestore.collection("questions");
		localStorage.removeItem("localQuestions");
		ref.add(data).then(this.setState({ submitted: true }));
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		let redirect = null;
		if (this.state.submitted) {
			redirect = <Redirect to="/forum" />;
		}
		if (this.props.currentUser === null) {
			redirect = <Redirect to="/forum" />;
		}
		return (
			<Container>
				{redirect}
				<Jumbotron>
					<h1>Ask Question</h1>
				</Jumbotron>
				<Form onSubmit={this.formSubmitHandler}>
					<Form.Group controlId="formGroupText">
						<Form.Label>Question</Form.Label>
						<Form.Control
							type="text"
							name="title"
							placeholder="Enter question"
							value={this.state.title}
							onChange={this.handleChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formGroupText">
						<Form.Label>Explanation</Form.Label>

						<Form.Control
							type="text"
							name="content"
							placeholder="Explanation"
							value={this.state.content}
							onChange={this.handleChange}
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

export default connect(mapStateToProps, null)(AskQn);
