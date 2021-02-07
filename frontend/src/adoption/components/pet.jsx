import React from "react";
import renderHTML from "react-render-html";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Pet = (props) => {
	const text = String(props.description);
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img
				variant="top"
				height="250"
				width="250"
				src={props.imageLink}
			/>

			<Button> Adopt </Button>
			<Card.Body>
				<Card.Title>{props.petName}</Card.Title>
				<Card.Text>
					<small>{renderHTML(text)}</small>
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<small className="text-muted">
					by: {props.by}
					<br />
					on: {Date(props.date).toLocaleString("en-US")}
				</small>
			</Card.Footer>
		</Card>
	);
};

export default Pet;
