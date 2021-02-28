import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import CarouselComponent from "../component/carousel";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import HotItems from "../component/hotitems";
import GetPet from "../component/getpet"
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";

const HomePage = () => {
	const [rndmBlog, setRndmBlog] = useState("");

	useEffect(() => {
		if (localStorage.getItem("localBlogs")) {
			const localBlogs = JSON.parse(localStorage.getItem("localBlogs"));
			const rndm = Math.floor(Math.random() * localBlogs.length);
			setRndmBlog(localBlogs[rndm]);
		} else {
			async function fetchData() {
				const ref = await firestore.collection("blogs");
				const snapshot = await ref.get().then(function (querySnapshot) {
					return querySnapshot.docs.map((doc) =>
						Object.assign(doc.data(), { id: doc.id })
					);
				});
				const rndm = Math.floor(Math.random() * snapshot.length);
				setRndmBlog(snapshot[rndm]);
			}
			fetchData();
		}
	}, []);

	return (
		<div>
			<CarouselComponent />
			<Container>
				<h3> LATEST PRODUCTS: </h3>
				<HotItems />
				<br />
				<GetPet/>
				<br />

				{rndmBlog.content && rndmBlog.content ? (
					<div>
						<h3> {"Also Read".toUpperCase()}: </h3>
						<Card variant="dark">
							<Card.Body>
								<Card.Title>
									<Link
										style={{ color: "black" }}
										to={`blog/${rndmBlog.id}`}
									>
										{rndmBlog.title}
									</Link>
								</Card.Title>
								<Card.Text>
									{rndmBlog.content &&
										rndmBlog.content
											.replace(/(<([^>]+)>)/gi, "")
											.slice(0, 65) + "..."}
								</Card.Text>
							</Card.Body>
								<Card.Body>
								<Card.Title>
									<Link
										style={{ color: "black" }}
										to={`blog/${rndmBlog.id}`}
									>
										{rndmBlog.title}
									</Link>
								</Card.Title>
								<Card.Text>
									{rndmBlog.content &&
										rndmBlog.content
											.replace(/(<([^>]+)>)/gi, "")
											.slice(0, 65) + "..."}
								</Card.Text>
							</Card.Body>
								<Card.Body>
								<Card.Title>
									<Link
										style={{ color: "black" }}
										to={`blog/${rndmBlog.id}`}
									>
										{rndmBlog.title}
									</Link>
								</Card.Title>
								<Card.Text>
									{rndmBlog.content &&
										rndmBlog.content
											.replace(/(<([^>]+)>)/gi, "")
											.slice(0, 65) + "..."}
								</Card.Text>
							</Card.Body>
						</Card>
					</div>
				) : (
					<Spinner
						style={{ marginLeft: "50%", marginTop: "20%" }}
						animation="border"
						variant="primary"
					/>
				)}
				<br />
				<br />
				<br />
			</Container>
		</div>
	);
};

export default HomePage;
