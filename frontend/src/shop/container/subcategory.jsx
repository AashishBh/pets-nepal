import React, { useState, useEffect } from "react";
import Products from "../component/products";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { firestore } from "../../firebase/firebase.utils";

const Subcategory = ({ match }) => {
	const [items, setItems] = useState();

	useEffect(() => {
		const { routeName, routeUrl } = match.params;
		let docId = null;
		if (routeName === "litter" || routeName === "supplies") {
			docId = 1;
		} else if (routeName === "food" || routeName === "foodntreats") {
			docId = 0;
		} else if (
			routeName === "accessories" ||
			routeName === "livefish" ||
			routeName === "others" ||
			routeName === "catsupplies"
		) {
			docId = 2;
		}
		if (localStorage.getItem(`local_${routeUrl}_data`)) {
			setItems(
				JSON.parse(localStorage.getItem(`local_${routeUrl}_data`))[
					docId
				]
			);
		} else {
			async function fetchData() {
				const ref = await firestore.collection(routeUrl);
				const snapshot = await ref.get().then(function (querySnapshot) {
					return querySnapshot.docs.map((doc) =>
						Object.assign(doc.data(), { id: doc.id })
					);
				});
				const data = snapshot[docId];
				setItems(data);
			}
			fetchData();
		}
	}, [match.params]);

	return (
		<Container>
			<div className="box">
				<br />
				<div>
					{items && (
						<Breadcrumb>
							<Breadcrumb.Item>
								<span
									style={{
										textDecoration: "none",
										color: "black",
									}}
								>
									<Link
										style={{
											textDecoration: "none",
											color: "black",
										}}
										to={`/shop/${match.params.routeUrl}`}
									>
										{match.params.routeUrl.toUpperCase()}
									</Link>
								</span>
							</Breadcrumb.Item>
							<Breadcrumb.Item
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<span
									style={{
										textDecoration: "none",
										color: "black",
									}}
								>
									{items.title.toUpperCase()}
								</span>
							</Breadcrumb.Item>
						</Breadcrumb>
					)}
				</div>
				{items && (
					<p>
						<div className="subCategories">
							{items.items.map((item) => (
								<Products
									key={item.id}
									routeName={match.params.routeName + "/"}
									routeUrl={match.params.routeUrl + "/"}
									item={item}
								/>
							))}
						</div>{" "}
					</p>
				)}
			</div>
		</Container>
	);
};

export default Subcategory;
