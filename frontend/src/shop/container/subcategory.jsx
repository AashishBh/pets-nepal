import React, { useState, useEffect } from "react";
import Products from "../component/products";
import { firestore } from "../../firebase/firebase.utils";

const Subcategory = ({ match }) => {
	const [items, setItems] = useState();

	useEffect(() => {
		async function fetchData() {
			const { routeName, routeUrl } = match.params;

			let docId = null;
			if (routeName === "litter" || routeName === "supplies") {
				docId = 1;
			} else if (routeName === "food" || routeName === "foodntreats") {
				docId = 0;
			} else if (
				routeName === "accessories" ||
				routeName === "livefish" ||
				routeName === "others"
			) {
				docId = 2;
			}
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
	}, [match.params]);

	return (
		<div className="title">
			<div>
				<p className="subTitle">
					{items &&
						match.params.routeUrl.toUpperCase() +
							" / " +
							items.title.toUpperCase()}
				</p>
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
	);
};

export default Subcategory;