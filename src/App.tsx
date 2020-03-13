import React from "react";
import Navigation from "./components/Navigation";
import { getLoginURL } from "./components/loginAuth";

const App = () => {
  const [url, token, expire] = getLoginURL();
  const expireTime = parseInt(expire) * 1000;

  React.useEffect(() => {
    if (!token) {
      return window.location.assign(url);
    } else {
      setTimeout(() => {
        window.location.assign(url);
      }, expireTime);
      localStorage.setItem("accessToken", token);
    }
  }, []);
  return <Navigation />;
};

export default App;
