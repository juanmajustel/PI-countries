import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../Redux/actions/actions";
import "./SearchBar.css";

export default function SearchBar({ setPagin }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getByName(name));
    setPagin(1);
    setName("");
  }

  return (
    <div className="searchBar">
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Country..."
          value={name}
          onChange={(e) => handleInput(e)}
        />
        <label htmlFor="input-field" className="input-label"></label>
        <span className="input-highlight"></span>
      </div>
      <button
        className="buttonSearch"
        type="submit"
        onClick={(e) => handleClick(e)}
      >
        Search
      </button>
    </div>
  );
}
