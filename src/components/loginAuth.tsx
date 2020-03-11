export const getLoginURL = () => {
  const CLIENT_ID = "136b2ccf7edd4a6b9fe04e9641e18405";
  const REDIRECT_URI = "http://localhost:3000/categories";

  const url =
    "https://accounts.spotify.com/authorize?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI) +
    "&scope=" +
    encodeURIComponent(["user-top-read"].join(" ")) +
    "&response_type=token";
  const token = window.location.hash
    .substr(1)
    .split("&")[0]
    .split("=")[1];

  return [url, token];
};
