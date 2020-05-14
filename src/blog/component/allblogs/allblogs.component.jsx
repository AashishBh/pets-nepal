import React, { Fragment, Component } from "react";
import axios from "axios";
import Blogs from "./blogs/blogs.component";
import {withRouter} from "react-router-dom";

class AllBlogs extends Component {
	state = {
		posts: [],
	};

	componentDidMount = () => {
		axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
			this.setState({ posts: response.data });
		});
	};

	blogSelectHandler = (id) => {
		console.log(this.props);
		this.props.history.push('/blog/' + id );
	};

	render() {
		return (
			<Fragment>
				{this.state.posts.map((post) => (
					<Blogs
						key={post.id}
						title={post.title}
						body={post.body}
						id={post.id}
						clicked = {() => this.blogSelectHandler(post.id)}
					/>
				))}
			</Fragment>
		);
	}
}

export default withRouter(AllBlogs);