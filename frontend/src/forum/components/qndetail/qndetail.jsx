import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { firestore } from "../../../firebase/firebase.utils";
import { toDate } from "../../../utils/unixtodate";

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
		this.setState({ id: id });
		const docRef = await firestore.collection("questions").doc(id);
		const doc = await docRef.get();
		this.setState({ post: doc.data() });
		this.setState({ comments: doc.data().comments });
	};

	deleteQn = async () => {
		await firestore.collection("questions").doc(this.state.id).delete();
		localStorage.removeItem("localQuestions");
		window.location.reload();
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
		// console.log(this.state.post.date);
		return (
			<Container>
				<Col md={{ span: 8, offset: 2 }}>
					{this.state.post.comments ? (
						<div>
							{this.props.currentUser === null ? null : (
								<div>
									{this.props.currentUser.displayName ===
									this.state.post.author ? (
										<Button
											variant="danger"
											style={{
												marginLeft: "89%",
												marginBottom: "20px",
											}}
											onClick={this.handleShow}
										>
											{" "}
											Delete{" "}
										</Button>
									) : null}
								</div>
							)}
							<Modal
								show={this.state.showModal}
								onHide={this.handleClose}
							>
								<Modal.Header closeButton></Modal.Header>
								<Modal.Body>
									Are you sure you want to delete this blog?
								</Modal.Body>
								<Modal.Footer>
									<Link to="/forum">
										<Button
											variant="danger"
											onClick={this.deleteQn}
										>
											Yes
										</Button>
									</Link>
									<Button
										variant="dark"
										onClick={this.handleClose}
									>
										No
									</Button>
								</Modal.Footer>
							</Modal>
							<h3>{this.state.post.title}</h3>
							<Card.Text>{this.state.post.content}</Card.Text>

							<div style={{ fontSize: "0.8rem", color: "gray" }}>
								By: {this.state.post.author}
								<br /> On: {toDate(this.state.post.date)}
							</div>
							<br />
							<br />
							<Form onSubmit={this.handleSubmit}>
								<Form.Label>Reply:</Form.Label>

								<Form.Control
									type="text"
									name="comment"
									as="textarea"
									value={this.state.comment}
									onChange={this.handleChange}
									required
								/>
								<br />
								{this.props.currentUser ? (
									<Button variant="dark" type="submit">
										Submit
									</Button>
								) : (
									<em>
										{" "}
										Please sign in to join the discussion.{" "}
									</em>
								)}
							</Form>
							<hr />
							<p> {this.state.comments.length} Answers: </p>
							{this.state.comments.map((i) => (
								<Alert key={i} variant="primary">{i}</Alert>
							))}
						</div>
					) : (
						<Spinner
							style={{ marginLeft: "50%", marginTop: "30%" }}
							animation="border"
							variant="primary"
						/>
					)}
				</Col>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(QuestionDetail);
