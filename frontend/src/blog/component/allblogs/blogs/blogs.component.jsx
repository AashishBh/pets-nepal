import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { toDate } from "../../../../utils/unixtodate";

const blogs = (props) => {
	return (
		<Container>
			<Col md={{ span: 8, offset: 2 }}>
				<div onClick={props.clicked}>
					<h3 style={{ cursor: "pointer" }}>{props.title}</h3>
				</div>
				<small className="text-muted">Posted by {props.author}</small>
				<br/>
				<small className="text-muted">On: {toDate(props.date)}</small>
				<br />
				<hr />
			</Col>
		</Container>
	);
};

export default blogs;
