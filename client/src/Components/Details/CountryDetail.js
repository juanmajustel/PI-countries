import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getByID, getByName } from "../../Redux/actions/actions";
import ActivitiesDetail from "./ActivitiesDetail";
import "./Details.css";

export default function CountryDetail() {
  const details = useSelector((state) => state.detail);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getByID(id));

    // Obtener el término de búsqueda de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get("name");

    // Realizar la búsqueda nuevamente si hay un término de búsqueda
    if (searchTerm) {
      dispatch(getByName(searchTerm));
    }
  }, [dispatch, id]);

  return (
    <div>
      <div className="detail">
        <div className="imgDetail">
          <img src={details.image} alt="" />
        </div>

        <div className="info">
          <h3>
            <u>Code:</u> {details.id}
          </h3>
          <h3>
            <u>Country:</u> {details.name}
          </h3>
          <h3>
            <u>Continent:</u> {details.continent}
          </h3>
          <h3>
            <u>Capital:</u> {details.capital}
          </h3>
          <h3>
            <u>Area:</u>: {details.area} km²
          </h3>
          <h3>
            <u>Population:</u>: {details.population} Dwellers
          </h3>
        </div>
      </div>

      <div className="activ">
        <ActivitiesDetail
          actsDetail={details.activities}
          country={details.name}
        />
      </div>

      <Link to="/home">
        <button className="buttonHome">Go to Home</button>
      </Link>
    </div>
  );
}
