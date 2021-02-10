import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import renderHTML from "react-render-html";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { firestore } from "../../../firebase/firebase.utils";
import Modal from "react-bootstrap/Modal";

class BlogDetail extends Component {
	state = {
		post: {},
		content: null,
		id: "",
		confirmDelete: false,
		showModal: false,
	};

	componentDidMount = async () => {
		const { id } = this.props.match.params;
		this.setState({ id: id });
		const docRef = await firestore.collection("blogs").doc(id);
		const doc = await docRef.get();
		if (!doc.exists) {
			console.log("No such document!");
		} else {
			this.setState({ post: doc.data() });
		}
	};

	deleteBlog = async () => {
		await firestore.collection("blogs").doc(this.state.id).delete();
	};

	handleClose = () => this.setState({ showModal: false });
	handleShow = () => this.setState({ showModal: true });

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
						<Link to="/blog">
							<Button variant="danger" onClick={this.deleteBlog}>
								Yes
							</Button>
						</Link>
						<Button variant="primary" onClick={this.handleClose}>
							No
						</Button>
					</Modal.Footer>
				</Modal>
				{
					<Card>
						<Card.Header>
							<h1>{this.state.post.title}</h1>
						</Card.Header>
						<Card.Body>
							<Card.Title style={{ fontSize: "0.8rem" }}>
								By: {this.state.post.author}
								<br /> On:{" "}
								{Date(this.state.post.date).toLocaleString(
									"en-US"
								)}
							</Card.Title>
						</Card.Body>
						<Card.Body>
							<Card.Text>
								{renderHTML(String(this.state.post.content))}
							</Card.Text>
						</Card.Body>
					</Card>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(BlogDetail);
