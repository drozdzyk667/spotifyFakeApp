import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>ERROR 404</h1>
      <p>SOMETHING WENT WRONG</p>

      <Link to="/categories">
        <button>{"BACK"}</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
