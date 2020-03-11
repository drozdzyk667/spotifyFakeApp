import React from "react";
import Navigation from "./components/Navigation";
import { getLoginURL } from "./components/loginAuth";

const App = () => {
  const [url, token] = getLoginURL();

  React.useEffect(() => {
    if (!token) {
      return window.location.assign(url);
    } else {
      localStorage.setItem("accessToken", token);
    }
  }, []);
  return <Navigation />;
};

export default App;
