import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { firestore } from "../../firebase/firebase.utils";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const OrdersList = ({ currentUser }) => {
	const [orders, setOrders] = useState("");

	useEffect(() => {
		async function fetchData() {
			const ref = await firestore.collection("orders");
			const snapshot = await ref.get().then(function (querySnapshot) {
				return querySnapshot.docs.map((doc) =>
					Object.assign(doc.data(), { id: doc.id })
				);
			});
			setOrders(snapshot);
		}
		fetchData();
	}, []);

	const delivered = async (id) => {
		await firestore
			.collection("orders")
			.doc(id)
			.update({ delivered: true });
		window.location.reload();
	};

	const notDelivered = async (id) => {
		await firestore
			.collection("orders")
			.doc(id)
			.update({ delivered: false });
		window.location.reload();
	};

	return (
		<Container>
			<div>
				<Jumbotron>
					<h2> OrdersList </h2>
				</Jumbotron>
				<br />
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
								<strong>
									Shipping Location  (Street, City, ZIP Code,
									Country)
								</strong>
							</td>
							<td>
								<strong>Delivered Status</strong>
							</td>
						</tr>
						{orders &&
							orders.map((i) => (
								<tr key={i.token.created}>
									<td>{i.currentUser.displayName} </td>
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
												Rs. {j.quantity * j.price}
											</p>
										))}
									</td>
									<td>
										{i.address.billing_address_line1},
										{i.address.billing_address_city},
										{i.address.billing_address_zip},
										{i.address.billing_address_country}
									</td>
									<td>
										{i.delivered ? (
											<p
												onClick={() =>
													notDelivered(i.id)
												}
												style={{ cursor: "pointer" }}
											>
												&#10004;
											</p>
										) : (
											<OverlayTrigger placement="right" overlay={<Tooltip>Not delivered.</Tooltip>}>
												<p
													onClick={() =>
														delivered(i.id)
													}
													style={{
														cursor: "pointer",
													}}
												>
													&#10008;
												</p>
											</OverlayTrigger>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(OrdersList);
