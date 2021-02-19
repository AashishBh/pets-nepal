import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import CarouselComponent from "../component/carousel";
import Card from "react-bootstrap/Card";
import CategoryMenu from "../component/categorymenu";
import HotItems from "../component/hotitems";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

const HomePage = () => {
	const [rndmBlog, setRndmBlog] = useState("");

	useEffect(() => {
		async function fetchData() {
			const ref = await firestore.collection("blogs");
			const snapshot = await ref.get().then(function (querySnapshot) {
				return querySnapshot.docs.map((doc) =>
					Object.assign(doc.data(), { id: doc.id })
				);
			});
			setRndmBlog(snapshot[Math.floor(Math.random() * 1)]);
		}
		fetchData();
	}, []);

	return (
		<Container>
			<CarouselComponent />
			<br />
			<h3>Categories: </h3>
			<CategoryMenu />
			<br />
			<h3> Hot Deals: </h3>
			<HotItems />
			<br />
			<Link to="/shop">
				{" "}
				<p>View More</p>{" "}
			</Link>
			<br />
			<h3> Read this blog: </h3>
			<Card border="info">
				<Card.Body>
					<Card.Title>
						<Link to={`blog/${rndmBlog.id}`}>{rndmBlog.title}</Link>
					</Card.Title>
					<Card.Text>
						{rndmBlog.content && rndmBlog.content.replace(/(<([^>]+)>)/gi, "").slice(0,65)+"..."}
					</Card.Text>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default HomePage;
