import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../../redux/user/user-selectors";

const qn = (props) => {
	console.log(props)
	return (
	<Card>
		<Row>
			<Col sm={2}>
				<Card.Img
					variant="top"
					className="rounded float-left"
					src="https://placedog.net/200/200/sepia/"
					style={{
						width: "200px",
						margin: "left",
					}}
				/>
			</Col>
			<Col sm={10}>
				<Card.Body>
					<Card.Title onClick={props.clicked}>
						<h3>{props.title}</h3>
					</Card.Title>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">By: {props.author}</small>
				</Card.Footer>
			</Col>
		</Row>
	</Card>
)
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(qn);
