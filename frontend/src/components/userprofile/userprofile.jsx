import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const userProfile = ({ currentUser }) => {
	return (
		<Container>
			<Card>
				<Card.Img
					variant="top"
					src="https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg"
					roundedCircle
					style={{ width: "150px" }}
				/>
				<hr />
				<Card.Body>
					<p>
						{" "}
						Display Name:{" "}
						<Card.Title>{currentUser.displayName}</Card.Title>
					</p>
					<Card.Text>
						Email:
						<br /> {currentUser.email}
					</Card.Text>
				</Card.Body>
				{currentUser.isAdmin ? (
						<Card.Footer>
							<small className="text-muted">
								You are an admin. Go to <Link to="/admin"> Admin Page </Link>
							</small>
						</Card.Footer>
				) : null}
			</Card>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(userProfile);
