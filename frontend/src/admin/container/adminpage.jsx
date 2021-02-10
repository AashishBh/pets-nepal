import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";

const AdminPage = () => {
	return (
		<Container>
			<Jumbotron><h2>Admin Page</h2></Jumbotron>
			<p>
				{" "}
				<Link to="/admin/addproducts">Add Products</Link><br/>
				<Link to="/admin/orders"> List Orders </Link>
			</p>
		</Container>
	);
};

export default AdminPage;
