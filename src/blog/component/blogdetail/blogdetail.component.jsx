import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";

class BlogDetail extends Component {
	state = {
		post: { body: null, title: null },
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		axios
			.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((response) => {
				this.setState({ post: response.data });
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
						<Card.Text>{this.state.post.body}</Card.Text>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

export default BlogDetail;
