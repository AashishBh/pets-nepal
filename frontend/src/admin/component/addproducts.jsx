import React, { useState } from "react";
import { firestore } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddProducts = ({ currentUser }) => {
	const [category, setCategory] = useState("");
	const [subcategory, setSubcategory] = useState("");
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productImageLink, setProductImageLink] = useState("");

	const catCategories = ["Food and Treats", "Litter", "Accessories"];
	const dogCategories = ["Food and Treats", "Supplies", "Accessories"];
	const fishCategories = ["Food", "Supplies", "Live Fish"];
	const othersCategories = ["Food", "Supplies", "Others"];

	let subcat = null;
	let options = null;

	if (category === "Cats") {
		subcat = catCategories;
	} else if (category === "Dogs") {
		subcat = dogCategories;
	} else if (category === "Fish") {
		subcat = fishCategories;
	} else if (category === "Others") {
		subcat = othersCategories;
	}

	if (subcat) {
		options = subcat.map((e) => <option key={e}>{e}</option>);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const countRef = firestore.collection("productCount").doc('0')
		const cRef = await countRef.get()
		let count = cRef.data().count

		let docId = null;
		if (subcategory === "Food and Treats" || subcategory === "Food") {
			docId = 0;
		} else if (subcategory === "Litter" || subcategory === "Supplies") {
			docId = 1;
		} else if (
			subcategory === "Accessories" ||
			subcategory === "Live Fish" ||
			subcategory === "Others"
		) {
			docId = 2;
		}

		const newProduct = {
			id: parseInt(count)+1,
			imageUrl: productImageLink,
			name: productName,
			price: productPrice,
		};

		const sfRef = firestore
			.collection(category.toLowerCase())
			.doc(docId.toString());
		const collections = await sfRef.get().then((i) => i.data());
		const snapshot = Object.values(collections.items);
		snapshot.push(newProduct);
		await sfRef.update({ items: snapshot }).then(alert("Product successfully added!"));
		await countRef.update({count: newProduct.id })
	};

	const changeSelectOptionHandler = (event) => {
		setCategory(event.target.value);
	};

	return (
		<Container>
				<div>
					<Jumbotron>
						<h2> ADD PRODUCT </h2>
					</Jumbotron>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="exampleForm.ControlSelect1">
							<Form.Label>Category</Form.Label>
							<Form.Control
								as="select"
								onChange={changeSelectOptionHandler}
							>
								<option>Cats</option>
								<option>Dogs</option>
								<option>Fish</option>
								<option>Others</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlSelect1">
							<Form.Label>Subcategory</Form.Label>
							<Form.Control
								as="select"
								onChange={(e) => {
									console.log(e.target.value);
									setSubcategory(e.target.value);
								}}
							>
								{options}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="formGroupText">
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								type="text"
								onChange={(e) => setProductName(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formGroupText">
							<Form.Label>Product Price</Form.Label>
							<Form.Control
								type="text"
								onChange={(e) =>
									setProductPrice(e.target.value)
								}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formGroupText">
							<Form.Label>Product Image Link</Form.Label>
							<Form.Control
								type="text"
								onChange={(e) =>
									setProductImageLink(e.target.value)
								}
								required
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			{/*) : (
				<Redirect to="/" />
			)}*/}
		</Container>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, null)(AddProducts);
