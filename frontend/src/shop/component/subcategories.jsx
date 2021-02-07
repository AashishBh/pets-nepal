import React from "react";
import Products from "./products";
import "./subCategories.css";

const subcategories = ({ title, items, val }) => {
  return (
    <div className="title">
      <div>
        <p className="subTitle">
          {title.toUpperCase()}
        </p>
      </div>
      <div className="subCategories">
        {items
          .filter((item, index) => index < val)
          .map((item) => (
            <Products key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default subcategories;
