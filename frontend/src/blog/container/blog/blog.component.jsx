import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import AllBlogs from "../../component/allblogs/allblogs.component";
import { Link } from "react-router-dom";

class Blog extends Component {
	render() {
		return (
			<Container>
				<Nav className="justify-content-end">
					<Link to="/add/blog">
						{" "}
						<Button variant="outline-primary">New Blog</Button>{" "}
					</Link>
				</Nav>
				<br />
				<AllBlogs />
			</Container>
		);
	}
}

export default Blog;
