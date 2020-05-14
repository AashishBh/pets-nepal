import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import AllBlogs from "../../component/allblogs/allblogs.component";

class Blog extends Component {
	render() {
		return (
			<Container>
				<AllBlogs/>
			</Container>
		);
	}
}

export default Blog;