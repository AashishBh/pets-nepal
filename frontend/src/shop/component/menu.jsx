import React, { Component } from "react";
import Categories from "./categories";
import Container from "react-bootstrap/Container";
import { firestore } from "../../firebase/firebase.utils";

class Menu extends Component {
  state = {
    products: [],
  };

  componentDidMount = async () => {
    if (localStorage.getItem("localFeaturedItems")) {
      this.setState({
        products: JSON.parse(localStorage.getItem("localFeaturedItems")),
      });
    } else {
      const ref = await firestore.collection("featuredproducts");
      const snapshot = await ref.get().then(function (querySnapshot) {
        return querySnapshot.docs.map((doc) =>
          Object.assign(doc.data(), { id: doc.id })
        );
      });
      const localFeaturedItems = JSON.stringify(snapshot);
      localStorage.setItem("localFeaturedItems", localFeaturedItems);
      this.setState({ products: snapshot });
    }
  };

  render() {
    return (
      <Container className="menu">
        {this.state.products.map(({ id, ...otherProps }) => (
          <Categories key={id} {...otherProps} />
        ))}
      </Container>
    );
  }
}
export default Menu;
