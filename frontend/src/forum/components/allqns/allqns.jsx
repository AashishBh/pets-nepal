import React, { Fragment, Component } from "react";
import Qn from "./qn/qn";
import { withRouter } from "react-router-dom";
import { firestore } from "../../../firebase/firebase.utils";

class AllQns extends Component {
	state = {
		posts: [],
	};

	componentDidMount = async () => {
		if (sessionStorage.getItem("localQuestions")) {
			this.setState({
				posts: JSON.parse(sessionStorage.getItem("localQuestions")),
			});
		} else {
			const ref = await firestore.collection("questions");
			const snapshot = await ref.get().then(function (querySnapshot) {
				return querySnapshot.docs.map((doc) =>
					Object.assign(doc.data(), { id: doc.id })
				);
			});
			const localQuestions = JSON.stringify(snapshot);
			sessionStorage.setItem("localQuestions", localQuestions);
			this.setState({ posts: snapshot });
		}
	};

	blogSelectHandler = (id) => {
		this.props.history.push("/forum/" + id);
	};

	render() {
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
