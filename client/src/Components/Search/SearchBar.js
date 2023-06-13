import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, setSearchTerm } from "../../Redux/actions/actions";
import "./SearchBar.css";

export default function SearchBar({ setPagin }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  const handleInput = (e) => {
    const value = e.target.value;
    setName(value);
    dispatch(setSearchTerm(value)); // Actualiza searchTerm en el store
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getByName(name));
    dispatch(setSearchTerm(name)); // Actualiza searchTerm en el store
    setPagin(1);
    setName("");
  };

  const [name, setName] = useState("");

  return (
    <div className="searchBar">
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Country..."
          value={searchTerm} // Usa el valor de searchTerm desde el store
          onChange={handleInput}
        />
        <label htmlFor="input-field" className="input-label"></label>
        <span className="input-highlight"></span>
      </div>
      <button className="buttonSearch" type="submit" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}

// Importamos la acción setSearchTerm desde las acciones.
// Utilizamos el hook useSelector para obtener el estado searchTerm del store.
// Modificamos la función handleInput para actualizar el estado name y despachar la acción setSearchTerm con el valor del input.
// Actualizamos el valor del input con searchTerm en lugar de name.
// Al hacer clic en el botón de búsqueda, despachamos la acción setSearchTerm con el valor actual de name.
