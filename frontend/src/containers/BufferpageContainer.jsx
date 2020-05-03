import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useGlobalState } from "../hooks/GlobalState/GlobalStateProvider";
import { getSpotifyToken } from "../services/spotifyService";
import keys from "../hooks/GlobalState/keys";

const BufferpageContainer = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { putGlobalState } = useGlobalState();

  const getAuthenticationToken = async (code) => {
    const resp = await getSpotifyToken(code);
    // console.log(resp);
    return resp.access_token;
  };

  // Adapted from: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript?page=1&tab=votes#tab-top
  // This extracts the params from the URL.
  const getParameterByName = (name) => {
    const url = window.location.href;
    const newName = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp(`[?&]${newName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    const authCode = decodeURIComponent(results[2].replace(/\+/g, " "));
    return authCode;
  };

  useEffect(() => {
    async function getAuthToken() {
      const spotifyCode = getParameterByName("code");
      const spotifyToken = await getAuthenticationToken(spotifyCode);
      console.log(spotifyToken);

      putGlobalState({
        key: keys.SPOTIFY_AUTH_TOKEN,
        value: { spotifyAuthToken: spotifyToken },
      });
      setRedirect(true);
    }
    getAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLoading = () => {
    setIsLoading(!isLoading);
  };

  const newProps = { isLoading, setLoading };

  return (
    <>
      {redirect && <Redirect to="/media" />}
      {React.cloneElement(children, { ...newProps })}
    </>
  );
};

BufferpageContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
export default BufferpageContainer;