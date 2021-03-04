import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.utils";
import Container from "react-bootstrap/Container";
import "../../shop/component/products.css";
import { withRouter } from "react-router-dom";

const HotItems = ({ history }) => {
	const [hotItems, setHotItems] = useState("");

	useEffect(() => {
		if (localStorage.getItem("localHotItems")) {
			setHotItems(JSON.parse(localStorage.getItem("localHotItems")));
		} else {
			async function fetchData() {
				const ref = await firestore.collection("hotitems");
				const snapshot = await ref.get().then(function (querySnapshot) {
					return querySnapshot.docs.map((doc) =>
						Object.assign(doc.data(), { id: doc.id })
					);
				});
				const localHotItems = JSON.stringify(snapshot[0]);
				localStorage.setItem("localHotItems", localHotItems);
				setHotItems(snapshot[0]);
			}
			fetchData();
		}
	}, []);

	return (
		<Container>
			<div className="box">
				<div className="subcategories">
					{hotItems &&
						hotItems.items.map((i) => (
							<div
								key={i.id}
								style={{
									display: "inline-block",
									width: "17%",
									margin: "1.5%",
								}}
							>
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
										<span className="price">
											Rs. {i.price}
										</span>
									</div>
								</div>
							</div>
						))}
					<br />
				</div>
			</div>
		</Container>
	);
};

export default withRouter(HotItems);
