import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, setSearchTerm } from "../../Redux/actions/actions";
import "./SearchBar.css";

export default function SearchBar({ setPagin }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  const [name, setName] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setName(value);
    dispatch(setSearchTerm(value)); // Actualiza searchTerm en el store
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getByName(name));
    setPagin(1);
  };

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
// Definimos la función SearchBar como un componente de función que acepta la prop setPagin.
// Dentro del componente SearchBar, inicializamos el hook useDispatch y useSelector para acceder al store y despachar acciones.
// Utilizamos useSelector para obtener el valor del estado searchTerm desde el store. searchTerm representa el término de búsqueda actual.
// Utilizamos el hook useState para inicializar el estado local name, que almacenará el valor actual del input.
// Definimos la función handleInput, que se ejecuta cuando se produce un cambio en el input de búsqueda. Esta función actualiza el estado name con el valor del input y despacha la acción setSearchTerm para actualizar el estado searchTerm en el store.
// Definimos la función handleClick, que se ejecuta cuando se hace clic en el botón de búsqueda. Esta función despacha la acción getByName con el valor actual de name y también llama a setPagin(1) para restablecer la paginación a la primera página.
// Renderizamos el contenido del componente SearchBar, que consta de un contenedor principal con una clase "searchBar".
// Dentro del contenedor, hay un contenedor secundario con una clase "input-container" que envuelve el campo de entrada.
// El campo de entrada es un elemento input con una clase "input-field". Se le asigna el valor de searchTerm para reflejar el valor actual del estado searchTerm en el store. Además, se asigna el evento onChange a la función handleInput para capturar los cambios en el campo de entrada.
// También hay una etiqueta label y un span para el efecto de resaltado del campo de entrada.
// Finalmente, hay un botón de búsqueda con una clase "buttonSearch". Al hacer clic en el botón, se ejecuta la función handleClick.
// En resumen, el componente SearchBar muestra un campo de entrada de búsqueda que refleja el estado searchTerm del store. Cuando se introduce texto en el campo de entrada y se hace clic en el botón de búsqueda, se despacha la acción getByName para buscar países por nombre, y el estado searchTerm se actualiza en el store.
