import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.utils";
import Pets from "../../shop/component/pets";
import Container from "react-bootstrap/Container";

const GetPet = () => {
	const [cats, setCats] = useState();
	const [dogs, setDogs] = useState();

	useEffect(() => {
		if (localStorage.getItem("localBuyDogs")) {
			setDogs(JSON.parse(localStorage.getItem("localBuyDogs")));
			setCats(JSON.parse(localStorage.getItem("localBuyCats")));
		} else {
			async function fetchData() {
				const ref = firestore.collection("buycats");
				const snapshot = await ref.get().then(function (querySnapshot) {
					return querySnapshot.docs.map((doc) =>
						Object.assign(doc.data(), { id: doc.id })
					);
				});
				setCats(snapshot[0]);
				const dref = firestore.collection("buydogs");
				const dsnapshot = await dref
					.get()
					.then(function (querySnapshot) {
						return querySnapshot.docs.map((doc) =>
							Object.assign(doc.data(), { id: doc.id })
						);
					});
				setDogs(dsnapshot[0]);
				const localBuyCats = JSON.stringify(snapshot[0]);
				localStorage.setItem("localBuyCats", localBuyCats);
				const localBuyDogs = JSON.stringify(dsnapshot[0]);
				localStorage.setItem("localBuyDogs", localBuyDogs);
			}
			fetchData();
		}
	}, []);

	return (
		<Container>
			
			<div className="box">
				<div className="subcategories">
					{dogs &&
						dogs.items.map((i) => (
							<div
								style={{
									display: "inline-block",
									width: "17%",
									margin: "1.5%",
								}}
							>
								<Pets
									key={i.id}
									type="dogs"
									id={i.id}
									name={i.name}
									price={i.price}
									imageUrl={i.imageUrl}
								/>
							</div>
						))}
                </div>
                <div className="subcategories">
					{cats &&
						cats.items.map((i) => (
							<div
								style={{
									display: "inline-block",
									width: "17%",
									margin: "1.5%",
								}}
							>
								<Pets
									key={i.id}
									type="cats"
									id={i.id}
									name={i.name}
									price={i.price}
									imageUrl={i.imageUrl}
								/>
							</div>
						))}
				</div>
			</div>
			{/* <h1> CATS </h1>
			<div className="box">
				
			</div> */}
		</Container>
	);
};

export default GetPet;
