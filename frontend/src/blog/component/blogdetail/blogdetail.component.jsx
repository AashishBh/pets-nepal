import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import renderHTML from 'react-render-html';
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

class BlogDetail extends Component {
	state = {
		post: {},
		content: null
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		console.log("ID", id);
		axios
			.get("https://minor-2b2f5.firebaseio.com/blogs.json")
			.then((response) => {
				const arr = Object.keys(response.data).map((key) => {
					return response.data[key];
				});
				const arrx = arr.filter((key) => key.id === id);
				this.setState({ post: arrx[0] });
				// console.log(arrx[0].content._cache.html)
				this.setState({ content: arrx[0].content._cache.html})
			});
	};

	render() {
		// console.log(this.state.content)
		return (
			<Container>
				<Card>
					<Card.Header>
						<h1>{this.state.post.title}</h1>
					</Card.Header>
					<Card.Body>
						<Card.Title style={{ fontSize: "0.8rem" }}>
							By: {this.state.post.author }
							<br /> On: {Date(this.state.post.date).toLocaleString("en-US")}
						</Card.Title>
						</Card.Body>
						<Card.Body>
						<Card.Text>{renderHTML(String(this.state.content))}</Card.Text>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(BlogDetail);

