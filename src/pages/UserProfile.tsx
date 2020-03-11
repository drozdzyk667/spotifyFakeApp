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

const UserProfile = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [capturedData, setCapturedData] = React.useState();
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
        console.log(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  if (error) {
    return <p> {error?.message}</p>;
  }

  if (isLoading) {
    return <p> {"Loading User data..."}</p>;
  }

  return (
    <div style={style.container}>
      <div>
        <img
          style={{ borderRadius: "50%" }}
          src={capturedData?.images[0].url}
          alt="user_photo"
        />
      </div>
      <div style={style.spacer}>
        <h2>{capturedData?.display_name.slice(0, 5)}</h2>
        <h4>{capturedData?.email}</h4>
      </div>
    </div>
  );
};

export default UserProfile;
