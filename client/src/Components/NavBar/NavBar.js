import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import Img from "../../Assets/Img/logo.png";
import SearchBar from "../Search/SearchBar";

const NavBar = () => {
  const location = useLocation();
  // eslint-disable-next-line
  const [pagination, setPagination] = useState(1);

  const handleSetPagin = (page) => {
    setPagination(page);
  };

  return (
    <div className={styles.NavBar}>
      <img className={styles.Logo} src={Img} alt="logo" />
      {location.pathname === "/home" && <SearchBar setPagin={handleSetPagin} />}
      {location.pathname !== "/" && (
        <>
          <Link to="/home" className="Link">
            <h3 className="h3">Home</h3>
          </Link>

          <Link to="/form" className="Link">
            <h3 className="h3">New Activity</h3>
          </Link>

          <Link to="/activities" className="Link">
            <h3 className="h3">List Of Activities</h3>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
