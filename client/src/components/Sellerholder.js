import React from "react";
import { Link } from "react-router-dom";

const Sellerholder = (props) => {
  return (
    <div className="category-holder">
      <Link to={`/sellers/${props.name}`}>
      <img src={props.image} alt={props.name} />
      <p>{props.name}</p>
      </Link>
    </div>
  );
};

export default Sellerholder;
