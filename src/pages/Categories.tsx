import React from "react";
import { useHistory } from "react-router-dom";

const style = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  } as React.CSSProperties,
  title: {
    color: "white",
    paddingLeft: "1em",
    fontSize: "1.5em"
  },
  singleContainer: {
    width: "275px",
    height: "275px",
    margin: "0.5em",
    cursor: "pointer"
  }
};

const Categories = () => {
  const history = useHistory();
  const categoriesURL = "https://api.spotify.com/v1/browse/categories";
  const [resCategories, setResCategories] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const getCategoryPlaylist = async categoryID => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryID}/playlists`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        history.push({
          pathname: `/categories/${categoryID}`,
          state: {
            id: categoryID,
            playlists: data.playlists.items
          }
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const getCategories = async () => {
    setIsLoading(true);
    await fetch(categoriesURL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
      }
    })
      .then(res => {
        return res.ok ? res.json() : null;
      })
      .then(data => {
        setResCategories(data.categories.items);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  if (error) {
    return <p> {error.message}</p>;
  }

  if (isLoading) {
    return <p> {"Loading categories..."}</p>;
  }

  return (
    <div>
      {resCategories && (
        <div style={style.container}>
          {resCategories.map(category => (
            <div
              key={category.id}
              onClick={() => getCategoryPlaylist(category.id)}
              style={{
                backgroundImage: `url(${category.icons[0].url})`,
                ...style.singleContainer
              }}
            >
              <h3 style={style.title}>{category.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
