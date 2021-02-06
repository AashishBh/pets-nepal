import React, { Fragment, Component } from "react";
import axios from "axios";
import Pet from "./pet";
import { withRouter } from "react-router-dom";

class AllPets extends Component {
	state = {
		petInfo: [],
	};

	componentDidMount = () => {
		axios
			.get("https://minor-2b2f5.firebaseio.com/adoption.json")
			.then((response) => {
				const arr = Object.keys(response.data).map((key) => {
					return response.data[key];
				});
				this.setState({ petInfo: arr });
				console.log(this.state.petInfo);
			});
	};

	render() {
		return (
			<Fragment>
				{this.state.petInfo.map((post) => (
					<Pet
						key={post.id}
						petName={post.petName}
						description={post.description._cache.html}
						by={post.by}
						id={post.id}
						date={post.date}
						imageLink={post.imageLink}
					/>
				))}
			</Fragment>
		);
	}
}

export default withRouter(AllPets);
