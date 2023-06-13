import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../Redux/actions/actions";
import "./Form.css";

function validateForm(input) {
  const error = {};
  if (!input.name.length) error.name = <h3>Name is required</h3>;
  if (!input.difficulty.length)
    error.difficulty = <h3>Difficulty is required</h3>;
  if (!input.duration.length) error.duration = <h3>Duration is required</h3>;
  if (!input.season.length) error.season = <h3>Season is required</h3>;
  if (!input.countries.length > 0)
    error.countries = <h3>Country is required</h3>;

  return error;
}

export default function Form() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.backupCountries).sort(
    (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
  );
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const [error, setError] = useState({});

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectCountry(e) {
    if (!input.countries.includes(e.target.value)) {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });

      setError(
        validateForm({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      alert("Country in use");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.countries.length > 0 &&
      input.name &&
      input.difficulty &&
      input.duration &&
      input.season
    ) {
      dispatch(postActivity(input));
      alert("Activity created");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
    } else alert("Complete all fields");
  }

  function handleButtonDelete(countryDel) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== countryDel),
    });
  }

  const difficulty = [1, 2, 3, 4, 5];
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const season = ["Winter", "Spring", "Autumn", "Summer"];

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="inputs">
          <div>
            <button className="buttonForm">Name</button>
            <input
              className="select"
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleInputChange(e)}
              required
              placeholder="Activity..."
            ></input>

            <div className="error">
              {error.name && <span>{error.name}</span>}
            </div>
          </div>

          <div>
            <button className="buttonForm">Difficulty</button>
            <select
              className="select"
              name="difficulty"
              required
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Select difficulty</option>
              {difficulty.map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>

            <div className="error">
              {error.difficulty && <span>{error.difficulty}</span>}
            </div>
          </div>

          <div>
            <button className="buttonForm">Duration</button>
            <select
              name="duration"
              required
              onChange={(e) => handleInputChange(e)}
              className="select"
            >
              <option value="">Select duration</option>
              {duration.map((n) => (
                <option value={n} key={n}>
                  {n}hs
                </option>
              ))}
            </select>

            <div className="error">
              {error.duration && <span>{error.duration}</span>}
            </div>
          </div>

          <div>
            <button className="buttonForm">Season</button>
            <select
              name="season"
              required
              onChange={(e) => handleInputChange(e)}
              className="select"
            >
              <option value="">Select season</option>
              {season.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="error">
              {error.season && <span>{error.season}</span>}
            </div>
          </div>
        </div>

        <div className="buttonForm">
          <label>Country </label>
          <select
            className="select"
            name="countries"
            required
            onChange={(e) => handleSelectCountry(e)}
          >
            <option value="" hidden>
              Select country
            </option>
            {allCountries.map((c) => (
              <option value={c.name} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="error">
            {error.countries && <span>{error.countries}</span>}
          </div>
        </div>

        <section className="area">
          <div className="containerItems">
            {input.countries?.map((country) => (
              <div className="items" key={country}>
                <button
                  className="btn"
                  onClick={() => handleButtonDelete(country)}
                >
                  <svg
                    viewBox="0 0 15 17.5"
                    height="17.5"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                  >
                    <path
                      transform="translate(-2.5 -1.25)"
                      d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                      id="Fill"
                    ></path>
                  </svg>
                </button>

                <p>{country}</p>
              </div>
            ))}
          </div>
        </section>

        <div>
          <button className="submit" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
