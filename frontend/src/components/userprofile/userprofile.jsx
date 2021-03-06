import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Card, Col, Alert, ListGroup, Container } from "react-bootstrap";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const UserProfile = ({ currentUser }) => {
	const [orders, setOrders] = useState("");
	const [show, setShow] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const ref = await firestore.collection("orders");
			const snapshot = await ref.get().then(function (querySnapshot) {
				return querySnapshot.docs.map((doc) =>
					Object.assign(doc.data(), { id: doc.id })
				);
			});
			const userOrders = snapshot.filter(
				(i) => i.currentUser.email === currentUser.email
			);
			setOrders(userOrders);
		}
		fetchData();
	}, [currentUser.email]);

	const toggle = () => setShow(true);

	return (
		<Container>
			<Col md={{ span: 5, offset: 3 }}>
				<Card border="dark">
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Card.Img
								variant="top"
								src="https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg"
								roundedCircle
								style={{ width: "150px", marginLeft:"100px" }}
							/>
						</ListGroup.Item>
						<ListGroup.Item>
							Display Name: <strong>{currentUser.displayName}</strong>
						</ListGroup.Item>
						<ListGroup.Item>
							Email: <strong>{currentUser.email}</strong>
						</ListGroup.Item>
						{currentUser.isAdmin ? (
							<ListGroup.Item>
								<small className="text-muted">
									You are an admin. Go to{" "}
									<Link to="/admin"> Admin Page </Link>
								</small>
							</ListGroup.Item>
						) : null}
					</ListGroup>
				</Card>
			</Col>
			<br /> <br />
			<u onClick={toggle} style={{ cursor: "pointer" }}>
				{" "}
				View Order History:
			</u>
			{show ? (
				<div>
					{orders && orders.length === 0 ? (
						<Alert variant="danger">
							{" "}
							You have not ordered anything.
						</Alert>
					) : (
						<Table bordered hover width="800">
							<tbody>
								<tr>
									<td>
										<strong>User</strong>
									</td>
									<td>
										<strong>Product Description</strong>
									</td>
									<td>
										<strong>Product Price</strong>
									</td>
									<td>
										<strong>Shipping Location</strong>
									</td>
									<td>
										<strong>Delivered</strong>
									</td>
								</tr>
								{orders &&
									orders.map((i) => (
										<tr key={i.token.created}>
											<td>
												{i.currentUser.displayName}{" "}
											</td>
											<td>
												{i.cartItems.map((j) => (
													<p key={j.id}>
														{j.name}, {j.quantity}
													</p>
												))}
											</td>
											<td>
												{i.cartItems.map((j) => (
													<p key={j.id}>
														{" "}
														Rs.{" "}
														{j.quantity * j.price}
													</p>
												))}
											</td>
											<td>
												{
													i.address
														.billing_address_line1
												}
												,
												{i.address.billing_address_city}
												{
													i.address
														.billing_address_country
												}
											</td>
											<td>
												{i.delivered ? (
													<p> &#10004; </p>
												) : (
													<p>&#10008;</p>
												)}
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					)}
				</div>
			) : null}
		</Container>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(UserProfile);
