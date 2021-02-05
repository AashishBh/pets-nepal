import React, { Fragment, Component } from "react";
import axios from "axios";
import Blogs from "./blogs/blogs.component";
import { withRouter } from "react-router-dom";

class AllBlogs extends Component {
	state = {
		posts: [],
	};

	componentDidMount = () => {
		axios
			.get("https://minor-2b2f5.firebaseio.com/blogs.json")
			.then((response) => {
				const arr = Object.keys(response.data).map((key) => {
					return response.data[key];
				});
				this.setState({ posts: arr });
				console.log(this.state.posts);
			});
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
