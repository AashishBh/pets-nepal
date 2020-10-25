import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";

class BlogDetail extends Component {
	state = {
		post: {},
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
			});
	};

	render() {
		return (
			<Container>
				<Card>
					<Card.Header>
						<h1>{this.state.post.title}</h1>
					</Card.Header>
					<Card.Body>
						<Card.Title style={{ fontSize: "0.8rem" }}>
							By: AUTHOR
							<br /> On: Today's date{" "}
						</Card.Title>
						<Card.Text>{this.state.post.content}</Card.Text>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

export default BlogDetail;
