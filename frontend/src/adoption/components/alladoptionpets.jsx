import React, { Fragment, Component } from "react";
import Pet from "./pet";
import { withRouter } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

class AllPets extends Component {
	state = {
		petInfo: [],
	};

	componentDidMount = async () => {
		const ref = await firestore.collection("adoption");
		const snapshot = await ref.get().then(function (querySnapshot) {
			return querySnapshot.docs.map((doc) =>
				Object.assign(doc.data(), { id: doc.id })
			);
		});
		this.setState({ petInfo: snapshot });
	};

	render() {
		return (
			<Fragment>
				{this.state.petInfo.map((post) => (
					<Pet
						key={post.id}
						petName={post.petName}
						description={post.description}
						by={post.by}
						date={post.date}
						id={post.id}
						imageLink={post.imageLink}
						adopted={post.adopted}
					/>
				))}
			</Fragment>
		);
	}
}

export default withRouter(AllPets);
