import React from "react";
import Products from "./products";
import {withRouter} from "react-router-dom";
import "./subCategories.css";

const subcategories = ({ title, items, val, routeName, routeUrl, history }) => {
  console.log(routeUrl)
  return (
    <div className="title">
      <div>
        <p className="subTitle" onClick={() => history.push(`/shop/${routeUrl}${routeName}`)}>
          {title.toUpperCase()}
        </p>
      </div>
      <div className="subCategories">
        {items
          .filter((item, index) => index < val)
          .map((item) => (
            <Products key={item.id} routeName={routeName} routeUrl={routeUrl} item={item} />
          ))}
      </div>
    </div>
  );
};

export default  withRouter(subcategories);
