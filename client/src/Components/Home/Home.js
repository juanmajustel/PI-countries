import React, { useState, useEffect } from "react";
import ContainerCards from "../CardsCointainer/ContainerCards";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getCountries } from "../../Redux/actions/actions";
import Paginated from "../Paginated/Paginated";
import { orderBy } from "../../Redux/actions/orderBy";
import { filterAct, filterContinent } from "../../Redux/actions/filters";
import "./Home.css";
import setError from "../../Redux/actions/setError";
import Footer from "../footer/footer";

export default function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.allCountries);
  const allActivities = useSelector((state) => state.activities);
  const searchTerm = useSelector((state) => state.searchTerm);

  const [currPage, setCurrPage] = useState(1);
  const [countriesPage, setCountriesPage] = useState(10);
  const lastCountry =
    currPage === 1 ? currPage * countriesPage : currPage * countriesPage - 1;
  const firstCountry = lastCountry - countriesPage;

  const filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currCountries = filteredCountries.slice(firstCountry, lastCountry);

  function paginatedNum(pageNum) {
    setCurrPage(pageNum);
    if (pageNum === 1) {
      setCountriesPage(9);
    } else {
      setCountriesPage(10);
    }
  }

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrPage(1);
  }

  function handleFilterAct(e) {
    e.preventDefault();
    dispatch(filterAct(e.target.value));
    setCurrPage(1);
  }

  function handleFilterCont(e) {
    e.preventDefault();
    dispatch(filterContinent(e.target.value));
    setCurrPage(1);
  }

  function onClickRestore() {
    dispatch(getCountries());
    setCountriesPage(10);
    setCurrPage(1);
  }

  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error !== "") alert(error);
    dispatch(setError(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // function handleSearchTermChange(e) {
  //   dispatch(setSearchTerm(e.target.value));
  // }

  return (
    <div className="divsHome">
      <div className="containerFilters">
        <select className="filter" onChange={(e) => handleFilterAct(e)}>
          <option value="All">Filter By Activities</option>
          {allActivities?.map((act) => {
            return (
              <option key={allActivities.indexOf(act)} value={act.name}>
                {act.name}
              </option>
            );
          })}
        </select>

        <select className="filter" onChange={(e) => handleFilterCont(e)}>
          <option value="All" key="All">
            Filter By Continents
          </option>
          <option value="Africa" key="Africa">
            Africa
          </option>
          <option value="Antarctica" key="Antarctica">
            Antarctica
          </option>
          <option value="Asia" key="Asia">
            Asia
          </option>
          <option value="Europe" key="Europe">
            Europe
          </option>
          <option value="North America" key="NorthAmerica">
            North America
          </option>
          <option value="Oceania" key="Oceania">
            Oceania
          </option>
          <option value="South America" key="SouthAmerica">
            South America
          </option>
        </select>

        <select className="filter" onChange={(e) => handleOrder(e)}>
          <option value="All"> Order By </option>
          <option value="A-Z">Order A-Z</option>
          <option value="Z-A">Order Z-A</option>
          <option value="maxPop">Order Max. Pop. ▼</option>
          <option value="minPop">Order Min. Pop. ▲</option>
        </select>

        <button className="button" onClick={() => onClickRestore()}>
          REFRESH
        </button>
      </div>

      <div>
        <ContainerCards countries={currCountries} />
      </div>
      <div>
        <Paginated
          allCountries={filteredCountries}
          countriesPage={countriesPage}
          paginatedNum={paginatedNum}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
      </div>
      <Footer />
    </div>
  );
}
