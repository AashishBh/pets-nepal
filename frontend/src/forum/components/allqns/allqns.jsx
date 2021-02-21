import React, { Fragment, Component } from "react";
import Qn from "./qn/qn";
import { withRouter } from "react-router-dom";
import { firestore } from "../../../firebase/firebase.utils";

class AllQns extends Component {
	state = {
		posts: [],
	};

	componentDidMount = async () => {
		const ref = await firestore.collection("questions");
		const snapshot = await ref.get().then(function (querySnapshot) {
			return querySnapshot.docs.map((doc) =>
				Object.assign(doc.data(), { id: doc.id })
			);
		});
		this.setState({ posts: snapshot });
	};

	blogSelectHandler = (id) => {
		console.log(id);
		this.props.history.push("/forum/" + id);
	};

	render() {
		console.log(this.state.posts);
		return (
			<Fragment>
				{this.state.posts.map((post) => (
					<Qn
						key={post.id}
						title={post.title}
						body={post.content}
						author={post.author}
						id={post.id}
						date={post.date}
						clicked={() => this.blogSelectHandler(post.id)}
					/>
				))}
			</Fragment>
		);
	}
}

export default withRouter(AllQns);
