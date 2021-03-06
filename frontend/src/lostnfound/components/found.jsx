import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { firestore } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import Item from "./item";
import Add from "./add";

const Found = ({ currentUser }) => {
	const [foundData, setFoundData] = useState();

	useEffect(() => {
		async function fetchData() {
			const ref = await firestore.collection("found");
			const snapshot = await ref
				.where("found", "==", false)
				.get()
				.then(function (querySnapshot) {
					return querySnapshot.docs.map((doc) =>
						Object.assign(doc.data(), { id: doc.id })
					);
				});
			setFoundData(snapshot);
		}
		fetchData();
	}, []);

	return (
		<div>
			{currentUser && currentUser ? (
				<span>
					<Add found />
				</span>
			) : null}
			{foundData &&
				foundData.map(({ description, author, ...otherProps }) => (
					<div key={Math.random(200)} style={{ display: "inline-block" }}>
						<Item
							description={description}
							type={null}
							id={foundData.id}
							authorId={author.id}
							{...otherProps}
						/>
					</div>
				))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(Found);
