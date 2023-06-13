import React, { useEffect, useRef } from "react";
import styles from "./Landing.module.css";
import { NavLink } from "react-router-dom";
import ClipVid from "../../Assets/ClipVid.mp4";

const Landing = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <div className={styles.landingContainer}>
      <video
        className={styles.backgroundVideo}
        src={ClipVid}
        autoPlay
        loop
        muted
        ref={videoRef}
      />
      <div className={styles.content}>
        <h1 className={styles.title}> Welcome to App Countries</h1>
        <NavLink className={styles.NavLink} to="/home">
          <button className={styles.button}>Get Started</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
