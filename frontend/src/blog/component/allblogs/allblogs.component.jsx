import React, { Fragment, Component } from "react";
import Blogs from "./blogs/blogs.component";
import { withRouter } from "react-router-dom";
import { firestore } from "../../../firebase/firebase.utils";

class AllBlogs extends Component {
	state = {
		posts: [],
	};

	componentDidMount = async () => {
		const ref = await firestore.collection("blogs");
		const snapshot = await ref.get().then(function (querySnapshot) {
			return querySnapshot.docs.map((doc) =>
				Object.assign(doc.data(), { id: doc.id })
			);
		});
		this.setState({ posts: snapshot });
	};

	blogSelectHandler = (id) => {
		this.props.history.push("/blog/" + id);
	};

	render() {
		return (
			<Fragment>
				{this.state.posts.map((post) => (
					<Blogs
						key={post.id}
						title={post.title}
						body={post.content}
						author={post.author}
						id={post.id}
						clicked={() => this.blogSelectHandler(post.id)}
					/>
				))}
			</Fragment>
		);
	}
}

export default withRouter(AllBlogs);
