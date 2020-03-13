import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Routes from "./Routes";
import Search from "./Search";
import ScrollToTop from "./ScrollTop";
import spotifyLogo from "../images/spotify_logo.png";

const style = {
  topBar: {
    position: "sticky",
    top: 0,
    left: 0,
    height: "30px",
    padding: "1em",
    backgroundColor: "#0f0f0f"
  } as React.CSSProperties,
  content: {
    padding: "2em",
    margin: "0 0 100px 250px"
  },
  sideBar: {
    zIndex: 1,
    width: "250px",
    position: "fixed",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontSize: "1.2em",
    backgroundColor: "black"
  } as React.CSSProperties,
  linkText: {
    color: "white",
    padding: "0.5em"
  },
  link: {
    textDecoration: "none"
  },
  activeRoute: {
    backgroundColor: "#414344"
  },
  align: {
    padding: "1em",
    paddingBottom: "2em"
  }
};

const Navigation = () => {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <div style={style.sideBar}>
          <img
            style={style.align}
            width={150}
            height={45}
            src={spotifyLogo}
            alt="spotify_logo"
          />
          <NavLink
            style={style.link}
            activeStyle={style.activeRoute}
            to="/categories"
          >
            <div style={style.linkText}>{"Categories"}</div>
          </NavLink>
          <NavLink
            style={style.link}
            activeStyle={style.activeRoute}
            to="/new-releases"
          >
            <div style={style.linkText}>{"New Releases"}</div>
          </NavLink>
        </div>
        <div>
          <div style={style.topBar}>
            <Search />
          </div>
          <main style={style.content}>
            <Routes />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;
