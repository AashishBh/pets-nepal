import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.utils";
import Container from "react-bootstrap/Container";
import "../../shop/component/products.css";
import { withRouter } from "react-router-dom";

const HotItems = ({ history }) => {
	const [hotItems, setHotItems] = useState("");

	useEffect(() => {
		async function fetchData() {
			const ref = await firestore.collection("hotitems");
			const snapshot = await ref.get().then(function (querySnapshot) {
				return querySnapshot.docs.map((doc) =>
					Object.assign(doc.data(), { id: doc.id })
				);
			});
			setHotItems(snapshot[0]);
		}
		fetchData();
	}, []);

	return (
		<Container>
			{hotItems &&
				hotItems.items.map((i) => (
					<div style={{"display":"inline-block", "width": "25%"}}>
						<div
							className="products"
							onClick={() =>
								history.push(
									`/product/${i.routeUrl}${i.routeName}${i.id}`
								)
							}
						>
							<div
								className="image"
								style={{
									backgroundImage: `url(${i.imageUrl})`,
								}}
							/>
							<div className="product-detail">
								<span className="name">
									{i.name.toUpperCase()}
								</span>
								<br />
								<span className="price">Rs. {i.price}</span>
							</div>
						</div>
					</div>
				))}<br/>
		</Container>
	);
};

export default withRouter(HotItems);
