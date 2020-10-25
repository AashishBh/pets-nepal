import React, { Component } from "react";
import ALL_PRODUCTS_DATA from "../data/all_products_data";
import Categories from "./categories";
import Container from "react-bootstrap/Container";

class Menu extends Component {
  state = {
    products: ALL_PRODUCTS_DATA,
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
