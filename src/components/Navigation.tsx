import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "./Routes";
import Search from "./Search";

const style = {
  root: {
    display: "flex",
    flexDirection: "column"
  } as React.CSSProperties,
  topBar: {
    height: "30px",
    padding: "1em",
    backgroundColor: "darkgreen"
  },
  contentAndSidebarContainer: {
    display: "flex",
    flexDirection: "row"
  } as React.CSSProperties,
  content: {
    margin: "2em"
  },
  sideBar: {
    minWidth: "150px",
    borderRight: "2px solid black",
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    fontSize: "1.5em"
  } as React.CSSProperties,
  link: {
    textDecoration: "none",
    color: "black"
  }
};

const Navigation: React.FC<{}> = () => {
  return (
    <Router>
      <div style={style.root}>
        <div style={style.topBar}>
          <Search />
        </div>
        <div style={style.contentAndSidebarContainer}>
          <menu style={style.sideBar}>
            <Link style={style.link} to="/categories">
              {"Categories"}
            </Link>
            <Link style={style.link} to="/new-releases">
              {"New Relases"}
            </Link>
          </menu>
          <main style={style.content}>
            <Routes />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;
