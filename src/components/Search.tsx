import React from "react";
import { useHistory, Link } from "react-router-dom";
import Avatar from "../images/user_avatar.png";

const style = {
  avatar: {
    position: "absolute",
    right: "1%",
    top: "1%"
  } as React.CSSProperties
};

const Search = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const history = useHistory();
  const pushSearchData = async () => {
    await fetch(
      `https://api.spotify.com/v1/search?q=${searchValue}&type=artist`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      }
    )
      .then(res => {
        return res.ok ? res.json() : null;
      })
      .then(data => {
        history.push({
          pathname: `/search/${searchValue}`,
          state: { details: data ? data.artists.items : [] }
        });
      })
      .catch(error => {
        console.warn(error);
      });
    setSearchValue("");
  };

  const disableAppCrash = event => {
    if (event.which === 13) {
      event.preventDefault();
    }
  };

  return (
    <form>
      <input
        type="text"
        onKeyPress={disableAppCrash}
        value={searchValue}
        onChange={handleSearch}
      />
      <button
        onClick={pushSearchData}
        style={{ cursor: "pointer" }}
        type="button"
      >
        Search
      </button>
      <Link style={{ cursor: "pointer" }} to="/user">
        <img style={style.avatar} src={Avatar} width={50} alt="UserAvatar" />
      </Link>
    </form>
  );
};

export default Search;
