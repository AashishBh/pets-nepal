import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

const ErrorPage = () => (
	<Jumbotron>
		<h2> 404 NOT FOUND </h2>
		<p>
			{" "}
			Uh oh! Looks like you got lost.
			<br />
			This page does not exist.
			<br />
			Go to <a href="/"> home </a>
		</p>
	</Jumbotron>
);

export default ErrorPage;
