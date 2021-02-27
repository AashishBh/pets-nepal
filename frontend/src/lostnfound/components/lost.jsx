import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { firestore } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import Item from "./item";
import Add from "./add";

const Lost = ({ currentUser }) => {
	const [lostData, setLostData] = useState();

	useEffect(() => {
		async function fetchData() {
			const ref = await firestore.collection("lost");
			const snapshot = await ref.where("found","==",false).get().then(function (querySnapshot) {
				return querySnapshot.docs.map((doc) =>
					Object.assign(doc.data(), { id: doc.id })
				);
			});
			setLostData(snapshot);
		}
		fetchData();
	}, []);

	return (
		<div>
			{currentUser && currentUser ? (
				<span>
					<Add lost />
				</span>
			) : null}
			{lostData &&
				lostData.map(({ description, author, ...otherProps }) => (
					<div style={{ display: "inline-block" }}>
						<Item key={lostData.id} description={description} authorId={author.id} {...otherProps} />
					</div>
				))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(Lost);
