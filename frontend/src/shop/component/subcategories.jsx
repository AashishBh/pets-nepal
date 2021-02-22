import React from "react";
import Products from "./products";
import { Link } from "react-router-dom";
import "./subCategories.css";

const subcategories = ({ title, items, val, routeName, routeUrl }) => {
  return (
    <div className="box">
      <div className="title">
        <Link style={{ color: "black" }} to={`/shop/${routeUrl}${routeName}`}>
          {title.toUpperCase()}
        </Link>
      </div>
      <div className="subCategories">
        {items
          .filter((item, index) => index < val)
          .map((item) => (
            <Products
              key={item.id}
              routeName={routeName}
              routeUrl={routeUrl}
              item={item}
            />
          ))}
      </div>
    </div>
  );
};

export default subcategories;
