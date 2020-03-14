import React from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const Zoom = require('react-reveal/Zoom');

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  } as React.CSSProperties,
  title: {
    color: 'white',
    paddingLeft: '1em',
    fontSize: '1.5em',
  },
  singleContainer: {
    width: '275px',
    height: '275px',
    margin: '0.5em',
    cursor: 'pointer',
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '30%',
  } as React.CSSProperties,
};

interface Error {
  [key: string]: string;
}

const Categories = () => {
  const history = useHistory();
  const [error, setError] = React.useState<Error>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [resCategories, setResCategories] = React.useState<any[]>();
  const CATEGORIES_URI = 'https://api.spotify.com/v1/browse/categories';

  const getCategoryPlaylist = async categoryID => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryID}/playlists`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        history.push({
          pathname: `/categories/${categoryID}`,
          state: {
            id: categoryID,
            playlists: data.playlists.items,
          },
        });
      })
      .catch(error => console.warn(error));
  };

  const getCategories = async () => {
    setIsLoading(true);
    await fetch(CATEGORIES_URI, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
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
    return (
      <div style={style.loader}>
        <Loader type="Audio" color="black" height={100} width={100} />
        <p> {'Loading categories...'}</p>
      </div>
    );
  }

  return (
    <div data-testid="categories-container">
      {resCategories && (
        <div style={style.container}>
          {resCategories.map(category => (
            <Zoom key={category.id}>
              <div
                onClick={() => getCategoryPlaylist(category.id)}
                style={{
                  backgroundImage: `url(${category.icons[0].url})`,
                  ...style.singleContainer,
                }}
              >
                <h3 style={style.title}>{category.name}</h3>
              </div>
            </Zoom>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
