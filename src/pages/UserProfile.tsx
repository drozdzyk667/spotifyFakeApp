import React from "react";

const style = {
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "2em",
    margin: "2em"
  } as React.CSSProperties,
  spacer: {
    margin: "2em"
  }
};

interface FetchData {
  email: string;
  display_name: string;
  images: [{ [key: string]: string }];
  external_urls: { spotify: string };
  type: string;
}

interface Error {
  [key: string]: string;
}

const UserProfile = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [capturedData, setCapturedData] = React.useState<FetchData>();
  const USER_URL = "https://api.spotify.com/v1/me";

  const getUserInfo = async () => {
    setIsLoading(true);
    await fetch(USER_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
      }
    })
      .then(res => {
        return res.ok ? res.json() : null;
      })
      .then(data => {
        setCapturedData(data);
        setIsLoading(false);
      })
      .catch(error => setError(error));
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  if (error) {
    return <p> {error.message}</p>;
  }

  if (isLoading) {
    return <p> {"Loading User data..."}</p>;
  }

  return (
    <div style={style.container}>
      {capturedData?.images[0]?.url ? (
        <img
          style={{ borderRadius: "50%" }}
          src={capturedData.images[0].url}
          alt="user_photo"
        />
      ) : null}
      <div style={style.spacer}>
        <h1>{`Hey ${capturedData?.display_name}, you have ${capturedData?.type} rights !`}</h1>
        <h4>
          {`User email: ${capturedData?.email ??
            "You haven't provided any :("}`}
        </h4>
        <div style={{ paddingTop: "20px" }}>
          <a
            style={{
              textDecoration: "none",
              padding: "0.5em",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white"
            }}
            href={capturedData?.external_urls.spotify}
            rel="noopener noreferrer"
            target="_blank"
          >{`Visit Your Spotify Profile`}</a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
