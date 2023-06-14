import React, { Component } from "react";
import style from "./footer.module.css";

class Footer extends Component {
  render() {
    return (
      <div className={style.footer}>
        <div className={style.infoLeft}>
          <h5>--VIDEOGAMES PI HENRY--</h5>
          <span>
            🙋‍♂️ - Juan Manuel Justel <br />
            📧 - JuanmaJustel@gmail.com
            <br />
          </span>
        </div>
        <div className={style.infoRight}>
          <a href="https://www.linkedin.com/in/juanmanueljustel/">
            LINKEDIN
            <img
              src="https://i.postimg.cc/xThMr2PB/logo-Linkedin.png"
              alt="github"
            />
          </a>
          <a href="https://github.com/juanmajustel">
            GITHUB
            <img
              src="https://i.postimg.cc/Vs9NRcSz/logo-Git-Hub.png"
              alt="github"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
