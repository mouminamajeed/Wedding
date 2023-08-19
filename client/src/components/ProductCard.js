import React from "react";

import classes from "../styles/product_card.module.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { product_details } = props;
  return (
    <div className={classes["card__container"]}>
      <img
        alt="product_image"
        src="https://weddingcardinvites.files.wordpress.com/2022/01/laser-cut-muslim-wedding-cards.jpg"
        className={classes["card__image"]}
      />

      <div className={classes["card__details"]}>
        <h2 className={classes["card__title"]}>{product_details.title}</h2>

        <p className={classes["card__description"]}>
          {product_details.description}
        </p>

        <h3 className={classes["card__price"]}>${product_details.price}</h3>

        <Link className={classes["card__details-link"]}>Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
