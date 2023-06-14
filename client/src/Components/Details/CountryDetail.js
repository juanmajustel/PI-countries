import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getByID, getByName } from "../../Redux/actions/actions";
import { filterAct, filterContinent } from "../../Redux/actions/filters";
import ActivitiesDetail from "./ActivitiesDetail";
import "./Details.css";

export default function CountryDetail() {
  const details = useSelector((state) => state.detail);
  const currentFilter = useSelector((state) => state.currentFilter);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getByID(id));

    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get("name");

    if (searchTerm) {
      dispatch(getByName(searchTerm));
    }
  }, [dispatch, id]);

  const handleGoBack = () => {
    if (currentFilter) {
      const { type, payload } = currentFilter;
      if (type === "FILTER_ACT") {
        dispatch(filterAct(payload));
      } else if (type === "FILTER_CONTINENT") {
        dispatch(filterContinent(payload));
      }
    }
    navigate(-1);
  };

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

      <button className="buttonHome" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}
