import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import AllBlogs from "../../component/allblogs/allblogs.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { Link } from "react-router-dom";

class Blog extends Component {
	render() {
		return (
			<Container>
				<Nav className="justify-content-end">
					{this.props.currentUser ? (
						<Link to="/add/blog">
							{" "}
							<Button variant="outline-primary">
								New Blog
							</Button>{" "}
						</Link>
					) : null}
				</Nav>
				<br />
				<AllBlogs />
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(Blog);
