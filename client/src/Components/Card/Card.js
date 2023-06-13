import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ image, name, continent, id }) {
  return (
    <div className="card">
      <div className="card__content">
        <Link to={`/detail/${id}`} className="Link">
          <h3>{name}</h3>
        </Link>

        <img src={image} alt=" " className="img" />

        <h3>{continent}</h3>
      </div>
    </div>
  );
}
