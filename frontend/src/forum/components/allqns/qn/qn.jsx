import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { toDate } from "../../../../utils/unixtodate";

const qn = (props) => {
	return (
		<Container>
			<Col md={{ span: 8, offset: 2 }}>
				<div onClick={props.clicked}>
					<h4>{props.title}</h4>
				</div>
				<small className="text-muted">Posted by: {props.author}</small>
				<br />
				<small className="text-muted">On: {toDate(props.date)}</small>
				<br />
				<hr />
			</Col>
		</Container>
	);
};

export default qn;
