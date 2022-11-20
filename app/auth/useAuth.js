import { useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";
import userinfoApi from "../api/userinfo";
import { string } from "yup";

export default useAuth = () => {
  const { setUser } = useContext(AuthContext);

  const logIn = async (authToken, email) => {
    const tuser = await jwtDecode(authToken);
    const UID = await userinfoApi.getUserID(email);
    const test = JSON.stringify(UID.data);
    const test2 = test.slice(8, -3);
    setUser(test2);
    // Stores the JWT token sent from the backend in AuthStorage from expo
    // This allows us to restore user everytime the app is closed and reloaded
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { setUser, logIn, logOut };
};
