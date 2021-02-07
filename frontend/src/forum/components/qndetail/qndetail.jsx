import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { firestore } from "../../../firebase/firebase.utils";

class QuestionDetail extends Component {
	state = {
		post: {},
		comments: [],
		comment: "",
		submitted: false,
		id: "",
		confirmDelete: false,
		showModal: false,
	};

	componentDidMount = async () => {
		const { id } = this.props.match.params;
		console.log("ID", id);
		this.setState({ id: id });
		const docRef = await firestore.collection("questions").doc(id);
		const doc = await docRef.get();
		if (!doc.exists) {
			console.log("No such document!");
		} else {
			console.log("Document data:", doc.data());
		}
		this.setState({ post: doc.data() });
		this.setState({ comments: doc.data().comments });
	};

	deleteQn = async () => {
		await firestore.collection("questions").doc(this.state.id).delete();
	};

	handleClose = () => this.setState({ showModal: false });
	handleShow = () => this.setState({ showModal: true });

	handleSubmit = async (event) => {
		event.preventDefault();
		const data = {
			title: this.state.post.title,
			content: this.state.post.content,
			id: this.state.id,
			author: this.props.currentUser.displayName,
			date: this.state.post.date,
			comments: this.state.post.comments,
		};
		data.comments.push(this.state.comment);
		const docRef = await firestore.collection("questions").doc(data.id);
		await docRef.update({ comments: data.comments });
		this.setState({ comment: "" });
		window.location.reload();
	};

	handleChange = (event) => {
		this.setState({ comment: event.target.value });
	};

	render() {
		return (
			<Container>
			{this.props.currentUser === null ? null : (
					<div>
						{this.props.currentUser.displayName ===
						this.state.post.author ? (
							<Button onClick={this.handleShow}> Delete </Button>
						) : null}
					</div>
				)}
			<Modal show={this.state.showModal} onHide={this.handleClose}>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body>
						Are you sure you want to delete this blog?
					</Modal.Body>
					<Modal.Footer>
						<Link to="/forum">
							<Button variant="danger" onClick={this.deleteQn}>
								Yes
							</Button>
						</Link>
						<Button variant="primary" onClick={this.handleClose}>
							No
						</Button>
					</Modal.Footer>
				</Modal>
				<Card>
					<Card.Header>
						<h1>{this.state.post.title}</h1>
					</Card.Header>
					<Card.Body>
						<Card.Title style={{ fontSize: "0.8rem" }}>
							By: {this.state.post.author}
							<br /> On:{" "}
							{Date(this.state.post.date).toLocaleString("en-US")}
						</Card.Title>
					</Card.Body>
					<Card.Body>
						<Card.Text>{this.state.post.content}</Card.Text>
					</Card.Body>
				</Card>
				<br />
				<br />
				<Card>
					<Card.Text>
						<Form onSubmit={this.handleSubmit}>
							<Form.Label>
								<strong>REPLY</strong>
							</Form.Label>

							<Form.Control
								type="text"
								name="comment"
								placeholder="Enter comment"
								value={this.state.comment}
								onChange={this.handleChange}
							/>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Card.Text>
				</Card>
				<hr />
				<h4> Responses: </h4>
				{this.state.comments.map((i) => (
					<Alert variant="info">{i}</Alert>
				))}
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(QuestionDetail);
