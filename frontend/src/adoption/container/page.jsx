import React from "react";
import AllAdoptionPets from "../components/alladoptionpets";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { Link } from "react-router-dom";

const Adoption = ({ currentUser }) => {
	return (
		<Container>
			<br />
			{currentUser ? (
				<Nav className="justify-content-end">
					<Link
						to="/adoption/add"
					>
						<Button variant="outline-dark"> Add</Button>
					</Link>
				</Nav>
			) : null}
			<br />
			<AllAdoptionPets />
		</Container>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(Adoption);
