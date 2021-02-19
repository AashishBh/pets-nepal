import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";

const userProfile = () => {
	return (
		<Container>
			<Jumbotron>
				<h3>User profile</h3>
			</Jumbotron>
			<p>
				You're not logged in. <Link to="/signin">Sign in</Link> to view
				your profile. Or <Link to="/signup">Sign up</Link> to create
				your account.{" "}
			</p>
		</Container>
	);
};

export default userProfile;
