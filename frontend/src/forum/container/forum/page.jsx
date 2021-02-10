import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import AllQns from "../../components/allqns/allqns";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { Link } from "react-router-dom";

class Forum extends Component {
	render() {
		return (
			<Container>
				<Nav className="justify-content-end">
					{this.props.currentUser ? (
						<Link to="/ask/question">
							{" "}
							<Button variant="outline-primary">
								Ask question!
							</Button>{" "}
						</Link>
					) : null}
				</Nav>
				<br />
				<AllQns />
				
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(Forum);
