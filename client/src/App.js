import "./App.css";
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import LandingPage from "./Components/LandingPage/LandingPage";
import CountryDetail from "./Components/Details/CountryDetail";
import NavBar from "./Components/NavBar/NavBar";
import Form from "./Components/Form/Form";
import ListActivities from "./Components/ListActivities/ListActivities";

function App() {
  const [countries, setCountries] = useState([]);

  const location = useLocation();

  function onSearch(name) {
    fetch(`/countries?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          setCountries((oldCountries) => [...oldCountries, data[0]]);
        } else {
          window.alert("No se encontraron resultados para el país ingresado.");
        }
      });
  }

  function onClose(id) {
    setCountries((oldCountries) =>
      oldCountries.filter((country) => country.id !== id)
    );
  }
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <div>
          <NavBar onSearch={onSearch} />
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/activities" element={<ListActivities />} />
        <Route
          path="/home"
          element={<Home countries={countries} onClose={onClose} />}
        />
        <Route path="/detail/:id" element={<CountryDetail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
